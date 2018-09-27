'use strict'

const { validate } = require('../validators')
const operations = require('../operations/users')
const schemas = require('../validators/schemas/users')

async function authenticate(ctx, next) {
  if (!ctx) {
    throw new Error('Context is missing in authenticateToken function!')
  }
  const parsedAuthHeader = parseAuthHeader(ctx.header.authorization)
  if (!parsedAuthHeader || !parsedAuthHeader.value
    || !parsedAuthHeader.scheme || parsedAuthHeader.scheme.toLowerCase() !== 'jwt') {
    return null
  }
  const input = { jwtToken: parsedAuthHeader.value }
  validate(schemas.jwtToken, input)
  const data = await operations.verifyTokenPayload(input)
  if (ctx.response && data.loginTimeout && data.loginIdleTimeout) {
    ctx.set('Login-timeout', data.loginTimeout)
    ctx.set('Login-idle-timeout', data.loginIdleTimeout)
  }
  ctx.state.user = data.user
  return next()
}

function parseAuthHeader(hdrValue) {
  const re = /(\S+)\s+(\S+)/u
  if (!hdrValue || typeof hdrValue !== 'string') {
    return null
  }
  const matches = hdrValue.match(re)
  return matches && { scheme: matches[1], value: matches[2] }
}

module.exports = {
  authenticate,
}
