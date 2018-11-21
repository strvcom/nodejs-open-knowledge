'use strict'

const Bull = require('bull')
const config = require('../config')
const log = require('../utils/logger')

const queue = new Bull('dog verification', { redis: config.jobs.redisUrl })

const execute = () => {
  log.info('Verification job started')

  queue.process(job => {
    log.info({ job })
  })
}

const add = url => {
  queue.add({ url })
}

module.exports = {
  execute,
  add,
}
