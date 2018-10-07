'use strict'

const errors = require('../utils/errors')
const { Dog } = require('../models')

/**
 * Returns all records
 * @returns {Promisse<Array>}
 */
function findAll() {
  return Dog.query()
}

/**
 * Return record by id
 * @param {Number} id record id
 * @return {Promise<Dog>}
 */
async function findById(id) {
  const dog = await Dog.query()
    .findById(id)

  if (!dog) {
    throw new errors.NotFoundError()
  }
  return dog
}

/**
 * Create record
 * @param {Object} attributes Dog object
 * @param {String} attributes.name Dog name
 * @param {String} attributes.breed Dog breed
 * @param {Date} attributes.birthYear Dog birth year
 * @param {String} attributes.photo Dog photo
 * @param {Number} attributes.userId Dog owner id
 * @return {Promise<Dog>}
 */
async function create(attributes) {
  const dog = await Dog.query()
    .insertGraphAndFetch(attributes)

  return dog
}

module.exports = {
  findAll,
  findById,
  create,
}
