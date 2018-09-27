'use strict'

const _ = require('lodash')
const errors = require('../utils/errors')
const users = require('./../database/users.json')
const accessTokens = require('./../database/accessTokens.json')

function findAll() {
  return users
}

function findById(id) {
  const user = _.find(users, { id })
  if (!user) {
    throw new errors.NotFoundError()
  }
  return user
}

function findByEmail(email) {
  return _.find(users, { email })
}

function findByIdAndAccessToken(id, token) {
  if (!id || !token) {
    throw new Error('Missing userId or token in findByIdAndAccessToken')
  }
  const user = _.find(users, { id })
  if (!user) {
    return null
  }
  user.accessToken = _.find(accessTokens, { userId: id, token })
  return user
}

function create(user) {
  user.id = users.length + 1
  users.push(user)
  return user
}

function createAccessToken(accessToken) {
  accessToken.id = accessTokens.length + 1
  accessTokens.push(accessToken)
  return accessToken
}

function updateAccessToken(id, data) {
  const accessToken = _.find(accessTokens, { id })
  if (accessToken) {
    const index = _.indexOf(accessTokens, { id })
    accessTokens.splice(index, 1, _.assign(accessToken, data))
  }
  return accessToken
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  findByIdAndAccessToken,
  create,
  createAccessToken,
  updateAccessToken,
}
