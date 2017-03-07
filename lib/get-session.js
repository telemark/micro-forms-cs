'use strict'

const config = require('../config')
const axios = require('axios')
const encryptor = require('simple-encryptor')(config.ENCRYPTOR_SECRET)
const jws = require('jws')
const fixManager = require('../utils/fix-manager')

module.exports = receivedToken => {
  return new Promise((resolve, reject) => {
    const decoded = jws.decode(receivedToken)
    const verified = jws.verify(receivedToken, 'HS256', config.JWT_SECRET)
    if (verified) {
      const jwtData = encryptor.decrypt(decoded.payload.data)
      const sessionUrl = `${config.SESSION_STORAGE_URL}/${jwtData.session}`

      axios.get(sessionUrl)
        .then(result => {
          const user = encryptor.decrypt(result.data.value)
          const data = {
            bestiller: user.displayName || user.cn || '',
            userId: user.sAMAccountName || user.uid || '',
            employeeNumber: user.employeeNumber || '',
            leder: fixManager(user.manager),
            company: user.company || '',
            department: user.department || ''
          }
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    } else {
      reject(new Error('Invalid token'))
    }
  })
}
