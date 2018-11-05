'use strict'

module.exports = {
  hostname: 'http://localhost:3000',
  logger: {
    enabled: false,
    stdout: true,
    minLevel: 'error',
  },
  database: {
    connection: 'postgres://postgres@localhost:5432/nodejs-nights-test',
  },
}
