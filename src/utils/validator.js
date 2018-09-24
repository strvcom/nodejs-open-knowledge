'use strict'

const jsonschema = require('jsonschema')

const validator = new jsonschema.Validator()

module.exports = {
  validate: (inputData, schema) => validator.validate(inputData, schema),
}
