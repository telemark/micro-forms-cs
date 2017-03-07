'use strict'

module.exports = (str) => {
  let manager = ''

  if (str) {
    const tmp = str.split(',')[0]
    if (tmp) {
      manager = tmp.replace('CN=', '')
    }
  }

  return manager
}
