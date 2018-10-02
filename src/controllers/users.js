'use strict'

const { validate } = require('./../validations')
const operations = require('./../operations/users')
const schemas = require('./../validations/schemas/users')

async function login(ctx) {
  const input = {
    email: ctx.request.body.username,
    password: ctx.request.body.password,
  }
  validate(schemas.login, input)
  ctx.body = await operations.login(input)
}

async function signUp(ctx) {
  const input = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  validate(schemas.signUp, input)
  ctx.body = await operations.signUp(input)
}

module.exports = {
  login,
  signUp,
}
