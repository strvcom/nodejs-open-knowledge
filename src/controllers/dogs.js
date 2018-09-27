'use strict'

const { validate } = require('./../validators')
const operations = require('./../operations/dogs')
const schemas = require('./../validators/schemas/dogs')

async function getAll(ctx) {
  ctx.body = await operations.getAll()
}

async function getById(ctx) {
  const input = {
    id: parseInt(ctx.params.id),
  }
  validate(schemas.dogId, input)
  ctx.body = await operations.getById(input)
}

async function addDog(ctx) {
  const input = {
    name: ctx.params.name,
    breed: ctx.params.breed,
    birthYear: parseInt(ctx.params.birthYear),
    photo: ctx.params.photo,
  }
  validate(schemas.dog, input)
  ctx.body = await operations.addDog(input)
}

module.exports = {
  getAll,
  getById,
  addDog,
}
