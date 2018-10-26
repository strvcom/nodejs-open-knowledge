'use strict'

const util = require('util')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

const jwtSign = util.promisify(jwt.sign)
const jwtVerify = util.promisify(jwt.verify)

module.exports = {
  generateAccessToken(userId) {
    const payload = { userId }
    return jwtSign(payload, config.auth.secret, config.auth.createOptions)
  },

  verifyAccessToken(accessToken) {
    try {
      return jwtVerify(accessToken, config.auth.secret, config.auth.verifyOptions)
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        return null
      }
      throw err
    }
  },

  hashPassword(password) {
    return bcrypt.hash(peperify(password), config.auth.saltRounds)
  },

  comparePasswords(plaintext, ciphertext) {
    return bcrypt.compare(peperify(plaintext), ciphertext)
  },
}

function peperify(password) {
  return crypto.createHmac('sha1', config.auth.secret)
    .update(password)
    .digest('hex')
}
