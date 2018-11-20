'use strict'

module.exports = {
  up: knex => knex.schema.alterTable('dogs', table => {
    table.boolean('photo_verified').notNull().default(false)
  }),

  down: knex => knex.schema.alterTable('dogs', table => {
    table.dropColumn('photo_verified')
  }),
}

