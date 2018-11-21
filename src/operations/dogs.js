'use strict'

const dogApi = require('../services/dogapi')
const errors = require('../utils/errors')
const rekognition = require('../services/rekognition')
const verificationJob = require('../jobs/verification')
const dogRepository = require('./../repositories/dogs')

async function needDog(id) {
  const dog = await dogRepository.findById(id)
  if (!dog) {
    throw new errors.NotFoundError()
  }

  return dog
}

function getAll() {
  return dogRepository.findAll()
}

function getById(input) {
  return needDog(input.id)
}

async function createDog(input) {
  if (!input.photo) {
    input.photo = await dogApi.getRandomBreedImage(input.breed)
  }

  verificationJob.add(input.photo)

  // For the sake of simplicity, we are not checking if photo is still null at this point.
  return dogRepository.create({
    ...input,
    photoVerified: await rekognition.isDogRecognized(input.photo),
  })
}

async function updateDog(id, input) {
  const dog = await needDog(id)

  return dogRepository.patchById(dog.id, input)
}

module.exports = {
  getAll,
  getById,
  createDog,
  updateDog,
}
