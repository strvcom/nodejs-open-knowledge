'use strict'

const shortId = require('shortid')
const traverse = require('traverse')
const _ = require('lodash')
const errors = require('../utils/errors')
const logger = require('../utils/logger')
const validators = require('../utils/validators')

const sensitiveAttributes = ['password']

module.exports = class AbstractOperation {
  constructor() {
    // Each operation has distinct id so we can group
    // all its logs together even when they interleave.
    this.uuid = shortId.generate()
  }

  async execute(inputData) {
    try {
      // We save the start time, so we can log out operation run time.
      this.startTime = Date.now()
      // We log the operation parameters, so we can reproduce how it ran later if needed.
      // Sensitive parameters like password are omitted, because these should never be logged.
      const payload = JSON.stringify(removeSensitiveAttributes(inputData, sensitiveAttributes))
      this.log('info', `START EXECUTING... with payload: ${payload}`)
      // We trim the input data parameters just to be sure.
      inputData = prepareInput(inputData)
      // If there is data input schema present, we check that the input data matches the schema
      if (this.schema && typeof this.schema === 'function') {
        const schema = this.schema()
        if (typeof schema === 'object') {
          schema.additionalProperties = false
          const validationErrors = validators.validate(inputData, schema).errors
          if (validationErrors.length > 0) {
            logger.info(validationErrors)
            throw new errors.ValidationError()
          }
          this.data = inputData
        } else {
          return new Error('Method \'schema\' does not return an object')
        }
      }
      // We execute the run method or throw an error if one is missing
      if (!this.run || typeof this.run !== 'function') {
        return new Error('Method \'run\' is not implemented')
      }
      const result = await this.run()
      // We log the operation finished execution
      await this.done()
      // And return its result
      return result
    } catch (err) {
      // Log all operation level errors
      this.log('error', `CATCH ERROR ${err.type ? err.type : 'UnknownError'}`)
      // And pass them upwards
      throw err
    }
  }

  // Enhanced operation logging
  //  - binds logs from one operation instance by the same uid (usefull when multiple operation executions overleave)
  //  - logs operation running time (so performance can be easily addressed when needed)
  log(type, text) {
    logger[type](`${this.uuid}(${this.constructor.name}) - ${text} (${Date.now() - this.startTime} ms)`) // eslint-disable-line max-len
  }

  done() {
    this.log('info', 'DONE')
  }
}

// Input preparation
// To be sure with the input, we trim all properties passed to the operation.
// We use traverse to easily access both first level and nested properties of
// the object passed.
function prepareInput(inputData) {
  traverse(inputData)
    .forEach(function trim(value) {
      if (typeof value === 'string') {
        const trimed = value.trim()
        this.update(trimed || null)
      }
    })
  return inputData
}

// Removing sensitive attributes
// We want to log the attributes with which operation was called every time, so we can
// reproduce errors if they happen in production. But some attributes shouldn't appear in logs.
// These include users password (which would be passed on login), social security number
// and the like information. To get rid of these in logs we deep clone the input data,
// delete such properties and then log out the input data.
function removeSensitiveAttributes(inputData, excludes) {
  if (!inputData || !excludes || excludes.length <= 0) {
    return inputData
  }
  const clonedData = _.cloneDeep(inputData)
  traverse(clonedData)
    .forEach(function exclude() {
      if (excludes.find(item => item === this.key)) {
        this.remove()
      }
    })
  return clonedData
}
