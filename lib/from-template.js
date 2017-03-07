'use strict'

const tmpl = require('hogan.js')
const readFileSync = require('fs').readFileSync

module.exports = async (file, data) => {
  const html = await readFileSync(file, 'utf-8')
  const template = tmpl.compile(html)
  const output = template.render(data)
  return output
}
