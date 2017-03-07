'use strict'

const { send, sendError } = require('micro')
const { parse } = require('url')
const config = require('./config')
const readFileSync = require('fs').readFileSync
const tmpl = require('hogan.js')
const getSession = require('./lib/get-session')

async function postHandler (request) {

}

async function getHandler (request, response) {
  const { query } = await parse(request.url, true)
  if (!query.jwt) {
    const url = `${config.SSO_URL}?origin=${config.ORIGIN_URL}`
    response.writeHead(302, { Location: url })
    response.end()
  } else {
    const data = await getSession(query.jwt)
    const html = await readFileSync('./static/html/form.html', 'utf-8')
    let template = tmpl.compile(html)
    const output = template.render(data)
    response.setHeader('Content-Type', 'text/html')
    return output
  }
}

async function methodHandler (request, response) {
  try {
    switch (request.method) {
      case 'POST':
        return await postHandler(request)
      case 'GET':
        return await getHandler(request, response)
      default:
        send(response, 405, 'Invalid method')
        break
    }
  } catch (error) {
    throw error
  }
}

module.exports = async (request, response) => {
  try {
    send(response, 200, await methodHandler(request, response))
  } catch (error) {
    sendError(request, response, error)
  }
}
