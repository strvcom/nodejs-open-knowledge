'use strict'

const AbstractOperation = require('./../AbstractOperation')
const dogRepository = require('./../../repositories/dogs')

module.exports = class GetAllDogs extends AbstractOperation {
  run() {
    return dogRepository.findAll()
  }
}
