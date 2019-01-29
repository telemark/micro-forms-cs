'use strict'

const axios = require('axios')
const generateToken = require('./generate-jws')
const config = require('../config')

const payload = {
  name: 'Flying Spaghetti Monster',
  description: 'rAmen'
}

module.exports = async ticket => {
  const token = generateToken({ key: config.JWT_SECRET, payload: payload })
  axios.defaults.headers.common['Authorization'] = token
  try {
    const result = await axios.post(`${config.URL}/createTicket`, ticket)
    return result.data
  } catch (error) {
    throw error
  }
}
