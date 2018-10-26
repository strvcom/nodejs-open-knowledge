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

  async verifyAccessToken(accessToken) {
    try {
      // Don't return directly for catch block to work properly
      const data = await jwtVerify(accessToken, config.auth.secret, config.auth.verifyOptions)
      return data
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError || err instanceof SyntaxError) {
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
