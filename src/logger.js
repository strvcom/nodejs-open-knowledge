'use strict'

const pino = require('pino')
const app = require('../package')

module.exports = pino({ name: app.name })
