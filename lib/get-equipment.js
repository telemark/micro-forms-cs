'use strict'

const axios = require('axios')
const generateToken = require('./generate-jws')
const config = require('../config')

const payload = {
  name: 'Flying Spaghetti Monster',
  description: 'rAmen'
}

module.exports = async filter => {
  const token = generateToken({key: config.JWT_SECRET, payload: payload})
  axios.defaults.headers.common['Authorization'] = token
  try {
    const result = await axios.get(`${config.URL}/getEquipment`)
    const filtered = result.data.id.filter(f => f.type === filter && f.expired === false)
    return filtered
  } catch (error) {
    throw error
  }
}
