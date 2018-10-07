'use strict'

module.exports = {
  up: knex => knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('email').unique()
    table.string('name')
    table.string('password')
    table.boolean('disabled')
    table.timestamps()
  }),

  down: knex => knex.schema.dropTableIfExists('users'),
}

