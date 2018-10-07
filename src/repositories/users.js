'use strict'

const errors = require('../utils/errors')
const { User } = require('../models')

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
async function findById(id) {
  const user = await User.query()
    .findById(id)

  if (!user) {
    throw new errors.NotFoundError()
  }
  return user
}

/**
 * Find user by email
 * @param {String} email User email
 * @return {Promise<User>}
 */
async function findByEmail(email) {
  const user = await User.query()
    .where('email', email)
    .first

  if (!user) {
    throw new errors.NotFoundError()
  }
  return user
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
    .insertGraphAndFetch(attributes)

  return user
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  create,
}
