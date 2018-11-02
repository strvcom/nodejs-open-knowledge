'use strict'

const { validate } = require('../validations')
const operations = require('../operations/users')
const schema = require('../validations/schemas/users')

async function login(ctx) {
  const input = {
    email: ctx.request.body.username,
    password: ctx.request.body.password,
  }
  validate(schema.login, input)
  ctx.body = await operations.login(input)
}

async function signUp(ctx) {
  const input = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  validate(schema.signUp, input)
  const user = await operations.signUp(input)
  ctx.status = 201
  ctx.body = user
}

module.exports = {
  login,
  signUp,
}
