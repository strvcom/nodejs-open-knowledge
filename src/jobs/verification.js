'use strict'

const Bull = require('bull')
const config = require('../config')
const log = require('../utils/logger')
const rekognition = require('../services/rekognition')
const operations = require('../operations/dogs')

const queue = new Bull('dog verification', { redis: config.jobs.redisUrl })

const execute = () => {
  log.info('Verification job started')

  queue.process(async job => {
    const { id, url } = job.data

    const dog = await operations.updateDog(id, {
      photoVerified: await rekognition.isDogRecognized(url),
    })

    log.info({ dog })
  })
}

const add = (id, url) => {
  queue.add({ id, url })
}

module.exports = {
  execute,
  add,
}
