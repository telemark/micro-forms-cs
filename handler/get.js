'use strict'

const { parse } = require('url')
const config = require('../config')
const fromTemplate = require('../lib/from-template')
const getSession = require('../lib/get-session')

module.exports = async (request, response) => {
  const { pathname, query } = await parse(request.url, true)
  const sessionData = request.session.get('data') || false

  if (!query.jwt && !sessionData) {
    const url = `${config.SSO_URL}?origin=${config.ORIGIN_URL}`
    response.writeHead(302, { Location: url })
    response.end()
  } else if (!sessionData) {
    const data = await getSession(query.jwt)
    request.session.put('data', data)
    response.writeHead(302, { Location: '/' })
    response.end()
  } else {
    const output = await fromTemplate('./static/html/form.html', sessionData)
    return output
  }
}
