'use strict'

const operations = require('../operations/users')
const { validate } = require('../validations')
const schemas = require('../validations/schemas/users')

async function authenticate(ctx, next) {
  if (!ctx) {
    throw new Error('Context has to be defined')
  }
  const parsedHeader = parseHeader(ctx.header.authorization)
  if (!parsedHeader || !parsedHeader.value
    || !parsedHeader.scheme || parsedHeader.scheme.toLowerCase() !== 'jwt'
  ) {
    return null
  }
  const input = { jwtToken: parsedHeader.value }
  validate(schemas.jwtToken, input)
  const data = await operations.verifyTokenPayload(input)
  if (ctx.response && data.loginTimeout) {
    ctx.set('Login-timeout', data.loginTimeout)
  }
  ctx.state.user = data.user
  return next()
}

function parseHeader(hdrValue) {
  if (!hdrValue || typeof hdrValue !== 'string') {
    return null
  }
  const matches = hdrValue.match(/(\S+)\s+(\S+)/u)
  return matches && {
    scheme: matches[1],
    value: matches[2],
  }
}

module.exports = {
  authenticate,
}
