'use strict'

module.exports = {
  up: knex => knex.schema.createTable('dogs', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('breed').notNullable()
    table.date('birth_year').notNullable()
    table.text('photo')
    table.integer('user_id')
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.timestamps()
  }),

  down: knex => knex.schema.dropTableIfExists('dogs'),
}

