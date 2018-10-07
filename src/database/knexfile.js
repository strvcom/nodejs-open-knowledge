'use strict'

const R = require('ramda')
const config = require('../config')

const staticDatabaseConfig = {
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
}

const databaseConfig = R.mergeDeepLeft(config.database, staticDatabaseConfig)

module.exports = {
  [config.env]: databaseConfig,
}
