'use strict'

const Router = require('koa-router')
const dogs = require('./dogs')
const { validate } = require('./utils/validator')

const router = new Router()

router.get('/', ctx => {
  ctx.body = 'Hello World'
})

router.get('/dogs', ctx => {
  ctx.body = dogs
})

router.get('/dogs/:id', ctx => {
  const dog = dogs.find(item => item.id === Number(ctx.params.id))

  if (!dog) {
    ctx.status = 404
    return
  }

  ctx.body = dog
})

router.post('/dogs', ctx => {
  const schema = {
    type: 'Object',
    required: true,
    properties: {
      id: {
        type: 'integer',
        required: true,
      },
      name: {
        type: 'string',
        required: true,
      },
      breed: {
        type: 'string',
        required: true,
      },
      birthYear: {
        type: 'number',
      },
      photo: {
        type: 'string',
        format: 'url',
      },
    },
  }

  const validation = validate(ctx.request.body, schema)

  if (!validation.valid) {
    ctx.status = 400
    ctx.body = {
      errors: validation.errors,
    }

    return
  }

  dogs.push(ctx.request.body)

  ctx.body = dogs
})

module.exports = router.routes()
