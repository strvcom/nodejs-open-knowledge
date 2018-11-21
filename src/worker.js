'use strict'

const log = require('./utils/logger')
const verificationJob = require('./jobs/verification')

const worker = {}

// Define start method
worker.start = () => {
  log.info('Starting worker…')

  // Start jobs here:
  verificationJob.execute()
}

// Define worker shutdown
worker.stop = () => {
  log.info('Stopping worker…')
}

// Start worker
if (require.main === module) {
  worker.start()
}

process.once('SIGINT', () => worker.stop())
process.once('SIGTERM', () => worker.stop())

module.exports = worker
