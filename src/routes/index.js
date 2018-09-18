'use strict'

const Router = require('koa-router')
const errors = require('../utils/errors')
const errorHandler = require('../utils/errorHandler')
const dogs = require('../controllers/dogs')

const router = new Router()
router.use(errorHandler.handleErrors)

router.get('/dogs', dogs.getAll)
router.get('/dogs/:id', dogs.getById)
router.post('/dogs', dogs.addDog)

router.use(() => {
  throw new errors.NotFoundError()
})

module.exports = router.routes()
