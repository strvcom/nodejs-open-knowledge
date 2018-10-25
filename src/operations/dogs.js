'use strict'

const dogRepository = require('./../repositories/dogs')

function getAll() {
  return dogRepository.findAll()
}

function getById(input) {
  return dogRepository.findById(input.id)
}

function createDog(input) {
  return dogRepository.create(input)
}

module.exports = {
  getAll,
  getById,
  createDog,
}
