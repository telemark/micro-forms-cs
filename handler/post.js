'use strict'

const bodyParser = require('urlencoded-body-parser')
const createTicket = require('../lib/create-ticket')
const postForm = require('../lib/post-form')

module.exports = async request => {
  const data = await bodyParser(request)
  const ticket = createTicket(data)
  const result = await postForm(ticket)
  return result
}
