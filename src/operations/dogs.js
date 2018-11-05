'use strict'

const errors = require('../utils/errors')
const dogRepository = require('./../repositories/dogs')

function getAll() {
  return dogRepository.findAll()
}

async function getById(input) {
  const dog = await dogRepository.findById(input.id)
  if (!dog) {
    throw new errors.NotFoundError()
  }
  return dog
}

function createDog(input) {
  return dogRepository.create(input)
}

module.exports = {
  getAll,
  getById,
  createDog,
}
