'use strict'

const { send, sendError } = require('micro')
const postHandler = require('./handler/post')
const getHandler = require('./handler/get')
const { parse } = require('url')

async function methodHandler (request, response) {
  try {
    switch (request.method) {
      case 'POST':
        return await postHandler(request)
      case 'GET':
        return await getHandler(request, response)
      default:
        send(response, 405, 'Invalid method')
    }
  } catch (error) {
    throw error
  }
}

module.exports = async (request, response) => {
  const { pathname } = await parse(request.url, true)
  if (pathname === '/favicon.ico') {
    send(response, 404)
  } else {
    try {
      response.setHeader('Content-Type', 'text/html')
      send(response, 200, await methodHandler(request, response))
    } catch (error) {
      sendError(request, response, error)
    }
  }
}
