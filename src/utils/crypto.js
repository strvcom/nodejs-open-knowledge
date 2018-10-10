'use strict'

const util = require('util')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('./../config')

const jwtSign = util.promisify(jwt.sign)
const jwtVerify = util.promisify(jwt.verify)

module.exports = {
  generateAccessToken(userId) {
    const payload = { userId }
    return jwtSign(payload, config.auth.secret, config.auth.createOptions)
  },

  verifyAccessToken(authToken) {
    try {
      return jwtVerify(authToken, config.auth.secret, config.auth.verifyOptions)
    } catch (err) {
      if (
        err instanceof jwt.JsonWebTokenError
        || err instanceof SyntaxError
      ) {
        return null
      }
      throw err
    }
  },

  hashPassword(password) {
    return bcrypt.hash(pepperify(password), config.auth.saltRounds)
  },

  comparePasswords(plaintext, ciphertext) {
    return bcrypt.compare(pepperify(plaintext), ciphertext)
  },
}

/**
 * Apply system-configured pepper to any given string
 *
 * @param {String} string The string to pepperify
 * @return {String} SHA-1 hash of the input string with pepper applied
 */
function pepperify(string) {
  return crypto
    .createHmac('sha1', config.auth.secret)
    .update(string)
    .digest('hex')
}
