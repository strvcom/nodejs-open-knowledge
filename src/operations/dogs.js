'use strict'

const dogApi = require('../services/dogapi')
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

async function createDog(input) {
  if (!input.photo) {
    input.photo = await dogApi.getRandomBreedImage(input.breed)
  }
  // For the sake of simplicity, we are not checking if photo is still null at this point.
  return dogRepository.create(input)
}

module.exports = {
  getAll,
  getById,
  createDog,
}
