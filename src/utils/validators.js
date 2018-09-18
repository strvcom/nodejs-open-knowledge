'use strict'

const jsonschema = require('jsonschema')

function validate(inputData, schema) {
  const validator = new jsonschema.Validator()
  return validator.validate(inputData, schema)
}

module.exports = {
  validate,
}
