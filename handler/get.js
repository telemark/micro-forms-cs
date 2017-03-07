'use strict'

const { parse } = require('url')
const config = require('../config')
const fromTemplate = require('../lib/from-template')
const getSession = require('../lib/get-session')

module.exports = async (request, response) => {
  const { query } = await parse(request.url, true)
  if (!query.jwt) {
    const url = `${config.SSO_URL}?origin=${config.ORIGIN_URL}`
    response.writeHead(302, { Location: url })
    response.end()
  } else {
    const data = await getSession(query.jwt)
    const output = await fromTemplate('./static/html/form.html', data)
    return output
  }
}
