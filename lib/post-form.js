'use strict'

const axios = require('axios')
const generateToken = require('./generate-jws')
const createTicket = require('./create-ticket')
const config = require('../config')

const payload = {
  name: 'Flying Spaghetti Monster',
  description: 'rAmen'
}

module.exports = async data => {
  const token = generateToken({key: config.JWT_SECRET, payload: payload})
  const ticket = createTicket(data)

  let instance = axios.create(
    {
      baseURL: config.url,
      timeout: 1000,
      headers: {
        Authorization: token
      }
    }
  )

  try {
    const result = await instance.post(config.path, ticket)
    return result.data
  } catch (error) {
    throw error
  }
}
