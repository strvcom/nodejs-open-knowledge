'use strict'

const { Dog } = require('../database/models')

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
function findById(id) {
  return Dog.query()
    .findById(id)
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
    .insertAndFetch(attributes)

  return dog
}

/**
 * Create record
 * @param {Number} id Dog id
 * @param {Object} attributes Dog object
 * @param {String} attributes.name Dog name
 * @param {String} attributes.breed Dog breed
 * @param {Date} attributes.birthYear Dog birth year
 * @param {String} attributes.photo Dog photo
 * @param {Number} attributes.userId Dog owner id
 * @param {Boolean} attributes.photoVerified Dog photo contains dog
 *
 * @return {Promise<Dog>}
 */
function patchById(id, attributes) {
  return Dog.query()
    .patchAndFetchById(id, attributes)
}

module.exports = {
  findAll,
  findById,
  create,
  patchById,
}
