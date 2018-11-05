'use strict'

const { knex } = require('../src/database')

const query = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public';"

const ignoreTableNames = [
  'knex_migrations',
  'knex_migrations_lock',
]

module.exports = {
  resetDb: async () => {
    const tableNames = (await knex.raw(query))
      .rows
      .map(table => table[Object.keys(table)[0]])
      .filter(tableName => !ignoreTableNames.includes(tableName))
      .map(tableName => `"${tableName}"`)

    return knex.raw(`TRUNCATE ${tableNames.join()} RESTART IDENTITY CASCADE`)
  },
}
