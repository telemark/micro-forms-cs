'use strict'

const bodyParser = require('urlencoded-body-parser')
const createTicket = require('../lib/create-ticket')
const postForm = require('../lib/post-form')
const fromTemplate = require('../lib/from-template')

module.exports = async request => {
  const data = await bodyParser(request)
  const ticket = createTicket(data)
  const result = await postForm(ticket)
  const mottattOpts = Object.assign({ saksnr: result.id }, ticket)
  const output = await fromTemplate('./static/html/mottatt.html', mottattOpts)
  return output
}
