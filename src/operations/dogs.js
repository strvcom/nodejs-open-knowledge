'use strict'

const dogRepository = require('./../repositories/dogs')

function getAll() {
  return dogRepository.findAll()
}

function getById(input) {
  return dogRepository.findById(input.id)
}

function addDog(input) {
  return dogRepository.create(input)
}

module.exports = {
  getAll,
  getById,
  addDog,
}
