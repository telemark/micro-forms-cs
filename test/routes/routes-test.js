'use strict'

const test = require('ava')
const listen = require('test-listen')
const axios = require('axios')
const micro = require('micro')
const srv = require('../../index')

const getUrl = fn => {
  const srv = micro(fn)
  return listen(srv)
}

test('it returns pong from /ping', async t => {
  const url = await getUrl(srv)
  const result = await axios.get(`${url}/ping`)
  t.deepEqual(result.data, {ping: 'pong'}, 'ping ok')
})