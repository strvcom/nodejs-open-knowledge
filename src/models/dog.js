'use strict'

const Base = require('./base')

class Dog extends Base {
  static get tableName() {
    return 'dogs'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name',
        'breed',
        'birthYear',
      ],

      properties: {
        id: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
        breed: {
          type: 'string',
        },
        birthYear: {
          type: 'date',
        },
        photo: {
          type: 'string',
        },
        userId: {
          type: 'integer',
        },
      },
    }
  }
}

module.exports = Dog
