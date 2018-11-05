'use strict'

const { User } = require('../database/models')

/**
 * Returns all records
 * @return {Promise<Array>}
 */
function findAll() {
  return User.query()
}

/**
 * Find user by id
 * @param {Number} id User id
 * @return {Promise<User>}
 */
function findById(id) {
  return User.query()
    .findById(id)
}

/**
 * Find user by email
 * @param {String} email User email
 * @return {Promise<User>}
 */
function findByEmail(email) {
  return User.query()
    .where('email', email)
    .first()
}

function patchById(id, data) {
  return User.query().patch(data).where({ id })
}

/**
 * Create a user
 * @param {Object} attributes User attributes
 * @param {String} attributes.email User email
 * @param {String} attributes.name User name
 * @param {String} attributes.password User password
 * @param {boolean} attributes.disabled User disabled flag
 * @return {Promise<User>}
 */
async function create(attributes) {
  const user = await User.query()
    .insertAndFetch(attributes)

  return user
}

module.exports = {
  patchById,
  findAll,
  findById,
  findByEmail,
  create,
}
