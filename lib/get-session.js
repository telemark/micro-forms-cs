'use strict'

const config = require('../config')
const axios = require('axios')
const encryptor = require('simple-encryptor')(config.ENCRYPTOR_SECRET)
const jws = require('jws')
const userData = require('./user-data')

module.exports = async receivedToken => {
  const decoded = jws.decode(receivedToken)
  const verified = jws.verify(receivedToken, 'HS256', config.JWT_SECRET)
  if (verified) {
    const jwtData = encryptor.decrypt(decoded.payload.data)
    const sessionUrl = `${config.SESSION_STORAGE_URL}/${jwtData.session}`

    try {
      const result = await axios.get(sessionUrl)
      const user = encryptor.decrypt(result.data.value)
      const data = userData(user)
      return data
    } catch (error) {
      throw error
    }
  } else {
    throw Error('Invalid token')
  }
}
