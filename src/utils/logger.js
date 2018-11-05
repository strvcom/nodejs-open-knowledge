'use strict'

const pino = require('pino')
const app = require('../../package.json')
const config = require('../config')

module.exports = pino({
  name: app.name,
  level: config.logger.minLevel,
  enabled: config.logger.enabled,
})
