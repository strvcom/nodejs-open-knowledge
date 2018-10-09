'use strict'

module.exports = {
  up: knex => knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('email').unique().notNullable()
    table.string('name').notNullable()
    table.string('password').notNullable()
    table.boolean('disabled')
    table.timestamps()
  }),

  down: knex => knex.schema.dropTableIfExists('users'),
}

