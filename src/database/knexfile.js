'use strict'

const _ = require('lodash')
const config = require('../config')

const staticDatabaseConfig = {
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
}

const databaseConfig = _.merge(config.database, staticDatabaseConfig)

module.exports = {
  [config.env]: databaseConfig,
}
