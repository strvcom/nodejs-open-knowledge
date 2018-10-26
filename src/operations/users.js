'use strict'

const log = require('../utils/logger')
const userRepository = require('../repositories/users')
const errors = require('../utils/errors')
const crypto = require('../utils/crypto')

async function signUp(input) {
  log.info({ input }, 'signUp')
  const user = {
    name: input.name,
    email: input.email.toLowerCase(),
    password: await crypto.hashPassword(input.password),
    disabled: false,
  }
  const alreadyExists = await userRepository.findByEmail(user.email)
  if (alreadyExists) {
    throw new errors.ConflictError('User already exists.')
  }
  const newUser = await userRepository.create(user)
  newUser.accessToken = await crypto.generateAccessToken(newUser.id)
  log.info('signUp successful')
  return newUser
}

async function verifyTokenPayload(input) {
  log.info({ input }, 'verifyTokenPayload')
  const jwtPayload = await crypto.verifyAccessToken(input.jwtToken)
  const now = Date.now()
  if (!jwtPayload || !jwtPayload.exp || now >= jwtPayload.exp * 1000) {
    throw new errors.UnauthorizedError()
  }

  const userId = parseInt(jwtPayload.userId)
  const user = userRepository.findById(userId)
  if (!user || user.disabled) {
    throw new errors.UnauthorizedError()
  }
  log.info('verifyTokenPayload')
  return {
    user,
    loginTimeout: jwtPayload.exp * 1000,
  }
}

module.exports = {
  signUp,
  verifyTokenPayload,
}
