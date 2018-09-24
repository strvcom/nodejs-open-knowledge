'use strict'

const Router = require('koa-router')
const dogs = require('./dogs')

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
  dogs.push(ctx.request.body)

  ctx.body = dogs
})

module.exports = router.routes()
