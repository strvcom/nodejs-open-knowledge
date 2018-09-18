'use strict'

const _ = require('lodash')
const errors = require('../utils/errors')
const dogs = require('./../database/dogs.json')

function findAll() {
  return dogs
}

function findById(id) {
  const dog = _.find(dogs, { id })
  if (!dog) {
    throw new errors.NotFoundError()
  }
  return dog
}

module.exports = {
  findAll,
  findById,
}
