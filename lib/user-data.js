'use strict'

const fixManager = require('./fix-manager')

module.exports = user => {
  const data = {
    bestiller: user.displayName || user.cn || '',
    userId: user.sAMAccountName || user.uid || '',
    employeeNumber: user.employeeNumber || '',
    leder: fixManager(user.manager),
    company: user.company || '',
    department: user.department || ''
  }
  return data
}
