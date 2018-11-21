'use strict'

const Bull = require('bull')
const config = require('../config')
const log = require('../utils/logger')
const rekognition = require('../services/rekognition')

const queue = new Bull('dog verification', { redis: config.jobs.redisUrl })

const execute = () => {
  log.info('Verification job started')

  queue.process(async job => {
    const { url } = job.data

    const photoVerified = await rekognition.isDogRecognized(url)

    log.info({ photoVerified, url })
  })
}

const add = url => {
  queue.add({ url })
}

module.exports = {
  execute,
  add,
}
