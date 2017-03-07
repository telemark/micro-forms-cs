'use strict'

const { parse } = require('url')
const readFileSync = require('fs').readFileSync
const tmpl = require('hogan.js')
const config = require('../config')
const getSession = require('../lib/get-session')

module.exports = async (request, response) => {
  const { query } = await parse(request.url, true)
  if (!query.jwt) {
    const url = `${config.SSO_URL}?origin=${config.ORIGIN_URL}`
    response.writeHead(302, { Location: url })
    response.end()
  } else {
    const data = await getSession(query.jwt)
    const html = await readFileSync('./static/html/form.html', 'utf-8')
    const template = tmpl.compile(html)
    const output = template.render(data)
    response.setHeader('Content-Type', 'text/html')
    return output
  }
}
