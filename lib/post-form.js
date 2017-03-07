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
  axios.defaults.headers.common['Authorization'] = token
  const ticket = createTicket(data)
  try {
    const result = await axios.post(config.URL, ticket)
    return result.data
  } catch (error) {
    throw error
  }
}
