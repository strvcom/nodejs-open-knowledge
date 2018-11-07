'use strict'

const { expect } = require('chai')
const crypto = require('../../src/utils/crypto')

describe('generateAccessToken', () => {
  it('generateAccessToken should generate a valid token', async () => {
    const userId = 2
    const token = await crypto.generateAccessToken(userId)

    const decodedPayload = await crypto.verifyAccessToken(token)
    expect(decodedPayload).to.deep.include({ userId })
  })
})
