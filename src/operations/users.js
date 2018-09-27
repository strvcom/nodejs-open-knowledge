'use strict'

const configIdleTimeoutSec = require('./../config').auth.jwt.idleTimeoutSec
const errors = require('./../utils/errors')
const logger = require('./../utils/logger')
const crypto = require('./../utils/crypto')
const userRepository = require('./../repositories/users')

const CONFIG_IDLE_TIMEOUT_MS = configIdleTimeoutSec * 1000

async function verifyTokenPayload(input) {
  logger.info(`verifyTokenPayload start: ${JSON.stringify(input)}`)
  const jwtPayload = crypto.verifyAccessToken(input.jwtToken)
  const now = Date.now()
  if (!jwtPayload || !jwtPayload.exp || now >= jwtPayload.exp * 1000) {
    throw new errors.UnauthorizedError()
  }

  const userId = Number(jwtPayload.userId)
  const user = await userRepository.findByIdAndAccessToken(userId, input.jwtToken)
  if (!user || !user.accessToken) {
    throw new errors.UnauthorizedError()
  }

  if (
    user.accessToken.lastActivityAt
    && ((new Date(user.accessToken.lastActivityAt).getTime() + CONFIG_IDLE_TIMEOUT_MS) < now)
  ) {
    throw new errors.IdleTimeoutError()
  }

  if (user.accessToken) {
    userRepository.updateAccessToken(
      user.accessToken.id,
      { lastActivityAt: new Date().toISOString() },
    )
  }

  const accessToken = user.accessToken
  delete user.accessToken
  logger.info('verifyTokenPayload end')
  return {
    user,
    loginTimeout: accessToken && new Date(accessToken.expiresAt).getTime(),
    loginIdleTimeout: accessToken
      && (new Date(accessToken.lastActivityAt).getTime() + CONFIG_IDLE_TIMEOUT_MS),
  }
}

async function login(input) {
  logger.info(`login start: ${JSON.stringify(input)}`)
  const user = await userRepository.findByEmail(input.email.toLowerCase())
  if (!user) {
    throw new errors.UnauthorizedError()
  }
  const verified = await crypto.comparePasswords(input.password, user.password)
  if (!verified || user.disabled) {
    throw new errors.UnauthorizedError()
  }
  const accessToken = crypto.generateAccessToken(user.id)
  logger.info('login end')
  return {
    id: user.id,
    email: user.email,
    accessToken,
  }
}

async function signUp(input) {
  logger.info(`signUp start: ${JSON.stringify(input)}`)
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
  const createdUser = await userRepository.create(user)
  const accessToken = {
    userId: createdUser.id,
    token: crypto.generateAccessToken(createdUser.id),
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(new Date().getTime() + CONFIG_IDLE_TIMEOUT_MS).toISOString(),
    lastActivityAt: new Date().toISOString(),
  }
  await userRepository.createAccessToken(accessToken)
  createdUser.accessToken = accessToken.token
  logger.info('signUp end')
  return createdUser
}

module.exports = {
  verifyTokenPayload,
  login,
  signUp,
}
