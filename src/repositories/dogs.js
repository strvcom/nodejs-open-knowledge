'use strict'

const R = require('ramda')
const errors = require('../utils/errors')
const dogs = require('./../database/dogs.json')

function findAll() {
  return dogs
}

function findById(id) {
  const dog = R.find(R.propEq('id', id), dogs)
  if (!dog) {
    throw new errors.NotFoundError()
  }
  return dog
}

function create(dog) {
  dog.id = dogs.length + 1
  dogs.push(dog)
  return dog
}

module.exports = {
  findAll,
  findById,
  create,
}
