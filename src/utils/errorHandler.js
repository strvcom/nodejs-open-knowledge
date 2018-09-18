'use strict'

const config = require('../config')
const appErrors = require('../utils/errors')
const logger = require('../utils/logger')

async function handleErrors(ctx, next) {
  try {
    return await next()
  } catch (err) {
    let responseError = err
    if (!(err instanceof appErrors.AppError)) {
      // This should never happen, log appropriately
      logger.error(err)
      responseError = new appErrors.InternalServerError()
    }
    // Prepare error response
    const isDevelopment = ['local', 'test', 'development'].includes(config.env)
    ctx.status = responseError.status
    ctx.body = {
      type: responseError.type,
      message: responseError.message,
      stack: isDevelopment && responseError.stack, // eslint-disable-line no-undefined, max-len
    }
    return true
  }
}

module.exports = {
  handleErrors,
}
