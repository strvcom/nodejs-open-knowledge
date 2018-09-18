'use strict'

const AbstractOperation = require('./../AbstractOperation')
const dogRepository = require('./../../repositories/dogs')

module.exports = class GetDogById extends AbstractOperation {
  schema() {
    return {
      type: 'Object',
      required: true,
      properties: {
        id: { type: 'integer', required: true, min: 1, max: 100000 },
      },
    }
  }

  run() {
    return dogRepository.findById(this.data.id)
  }
}
