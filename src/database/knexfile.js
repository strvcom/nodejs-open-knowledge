'use strict'

const development = {
  client: 'pg',
  connection: 'postgres://postgres@localhost:5432/nodejs-nights-local',
  pool: {
    min: 0,
    max: 5,
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
}

module.exports = {
  development,
}
