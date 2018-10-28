'use strict'

const objection = require('objection')
// -- Knex/PG issue: https://github.com/tgriesser/knex/issues/927
const pg = require('pg')

pg.types.setTypeParser(20, 'text', parseInt)
pg.types.setTypeParser(1700, 'text', parseFloat)
// -- end --
const knexLib = require('knex')
const R = require('ramda')
const config = require('../config')
const knexEnvConfig = require('./knexfile')[config.env]

const knexConfig = R.mergeDeepWith({}, knexEnvConfig, objection.knexSnakeCaseMappers())
const knex = knexLib(knexConfig)

const Model = objection.Model
Model.knex(knex)
const transaction = objection.transaction

function connect() {
  // Knex does not have an explicit `.connect()` method so we issue a query and consider the
  // connection to be open once we get the response back.
  return knex.raw('select 1 + 1')
}

function close() {
  return knex.destroy()
}

module.exports = {
  Model,
  knex,
  transaction,
  connect,
  close,
}
