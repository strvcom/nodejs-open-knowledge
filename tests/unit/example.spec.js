'use strict'

const assert = require('assert')


function multiplyBy4(num) {
  return num * 4
}

describe('example', () => {
  it('multiplyBy4', () => {
    const result = multiplyBy4(2)
    const expected = 8
    assert.strictEqual(result, expected)
  })
})
