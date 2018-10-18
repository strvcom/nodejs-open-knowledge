// 'use strict'

const obj = {
  firstName: 'John'
}

Object.freeze(obj)
obj.firstName = 'Mark'

console.log(obj.firstName)
