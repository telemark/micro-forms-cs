'use strict'

const { send, sendError } = require('micro')
const { parse } = require('url')
const config = require('./config')
const readFileSync = require('fs').readFileSync
const tmpl = require('hogan.js')
const getSession = require('./lib/get-session')

async function postHandler (request) {

}

async function getHandler (request, data) {
  try {
    const html = await readFileSync('./static/html/form.html', 'utf-8')
    let template = tmpl.compile(html)
    const output = template.render(data)
    return output
  } catch (error) {
    throw error
  }
}

async function methodHandler (request, response, data) {
  try {
    switch (request.method) {
      case 'POST':
        return await postHandler(request)
      case 'GET':
        response.setHeader('Content-Type', 'text/html')
        return await getHandler(request, data)
      default:
        send(response, 405, 'Invalid method')
        break
    }
  } catch (error) {
    throw error
  }
}

module.exports = async (request, response) => {
  const { query } = await parse(request.url, true)
  if (!query.jwt) {
    const url = `${config.SSO_URL}?origin=${config.ORIGIN_URL}`
    response.writeHead(302, { Location: url })
    response.end()
  } else {
    const data = await getSession(query.jwt)
    try {
      send(response, 200, await methodHandler(request, response, data))
    } catch (error) {
      sendError(request, response, error)
    }
  }
}
