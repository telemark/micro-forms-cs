'use strict'

// Local debug
process.env.ORIGIN_URL = 'http://localhost:3000'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

module.exports = {
  SSO_URL: process.env.SSO_URL || 'https://sso.router.t-fk.win',
  ORIGIN_URL: process.env.ORIGIN_URL || 'https://cs.next.t-fk.no',
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  ENCRYPTOR_SECRET: process.env.ENCRYPTOR_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  SESSION_STORAGE_URL: process.env.SESSION_STORAGE_URL || 'https://tmp.storage.service.t-fk.no',
  URL: process.env.CS_URL || 'https://cs-service.t-fk.no/createTicket'
}
