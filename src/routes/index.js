'use strict'

const Router = require('koa-router')
const { handleErrors, handleNotFound } = require('../middleware/errors')
const dogs = require('../controllers/dogs')

const router = new Router()
router.use(handleErrors)

router.get('/dogs', dogs.getAll)
router.get('/dogs/:id', dogs.getById)
router.post('/dogs', dogs.createDog)

router.use(handleNotFound)

module.exports = router.routes()
