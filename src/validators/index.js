'use strict'

const jsonschema = require('jsonschema')
const errors = require('../utils/errors')
const logger = require('../utils/logger')

function validate(schema, inputData) {
  const validator = new jsonschema.Validator()
  schema.additionalProperties = false
  const validationErrors = validator.validate(inputData, schema).errors
  if (validationErrors.length > 0) {
    logger.info(validationErrors)
    throw new errors.ValidationError()
  }
}

module.exports = {
  validate,
}
