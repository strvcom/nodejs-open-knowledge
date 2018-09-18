'use strict'

const GetAllDogs = require('./../operations/dogs/GetAll')
const GetDogById = require('./../operations/dogs/GetById')

async function getAll(ctx) {
  ctx.body = await new GetAllDogs().execute({})
}

async function getById(ctx) {
  ctx.body = await new GetDogById().execute({
    id: parseInt(ctx.params.id),
  })
}

async function addDog(ctx) {
  const schema = {
    type: 'Object',
    required: true,
    properties: {
      id: {
        type: 'integer',
        required: true,
      },
      name: {
        type: 'string',
        required: true,
      },
      breed: {
        type: 'string',
        required: true,
      },
      birthYear: {
        type: 'number',
      },
      photo: {
        type: 'string',
        format: 'url',
      },
    },
  }

  // const validation = validate(ctx.request.body, schema)

  // dogs.push(ctx.request.body)

  // ctx.body = dogs
}

module.exports = {
  getAll,
  getById,
  addDog,
}
