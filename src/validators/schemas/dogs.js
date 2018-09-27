'use strict'

const dogId = {
  type: 'Object',
  required: true,
  properties: {
    id: { type: 'integer', required: true, min: 1, max: 100000 },
  },
}

const dog = {
  type: 'Object',
  required: true,
  properties: {
    name: { type: 'string', required: true },
    breed: { type: 'string', required: true },
    birthYear: { type: 'number' },
    photo: { type: 'string', format: 'url' },
  },
}

module.exports = {
  dogId,
  dog,
}
