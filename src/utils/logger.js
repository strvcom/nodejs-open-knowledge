'use strict'

const pino = require('pino')
const app = require('../../package.json')

module.exports = pino({ name: app.name })
