/* eslint-disable max-classes-per-file */

'use strict'

const logger = require('./logger')

class AppError extends Error {
  constructor(type, message, status) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.type = type
    this.message = message
    this.status = status
    const stack = this.stack ? this.stack.split('\n') : this.stack
    logger.error({
      error: {
        name: this.name,
        message: this.message,
        type,
        stack: stack && stack.length > 2 ? `${stack[0]}  ${stack[1]}` : stack,
      },
    })
  }
}

class ValidationError extends AppError {
  constructor(message, errors) {
    super(message || 'Invalid or missing request data.', 'BAD_REQUEST', 400)
    this.errors = errors
  }
}

class NotFoundError extends AppError {
  constructor(message) {
    super(
      message || 'Resource not found.',
      'NOT_FOUND',
      404,
    )
  }
}

/**
 * @apiDefine InternalServerError
 * @apiError (Error 5xx) InternalServerError Something went wrong.
 * @apiErrorExample {json} InternalServerError
 *    HTTP/1.1 500 InternalServerError
 *    {
 *      "type": "INTERNAL_SERVER",
 *      "message": "Something went wrong. Please try again later or contact support."
 *    }
 */
class InternalServerError extends AppError {
  constructor(message) {
    super(
      message || 'Something went wrong. Please try again later or contact support.',
      'INTERNAL_SERVER',
      500,
    )
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  InternalServerError,
}
