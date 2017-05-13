'use strict'

const jws = require('jws')

module.exports = options => {
  if (!options) {
    throw Error('Missing required input: options object')
  }
  if (!options.key) {
    throw Error('Missing required input: options.key')
  }
  if (!options.payload) {
    throw Error('Missing required input: options.payload')
  }
  const signature = jws.sign({
    header: { alg: 'HS256' },
    payload: options.payload,
    secret: options.key
  })
  return signature
}
