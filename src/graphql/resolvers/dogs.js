'use strict'

const operations = require('../../operations/dogs')
// const userOperations = require('../../operations/users')

module.exports = {
  Query: {
    dog: (root, args, ctx) => {
      ctx.requireAuth()
      return operations.getById({ id: args.id })
    },
    dogs: (root, args, ctx) => {
      ctx.requireAuth()
      return operations.getAll()
    },
  },
  Dog: {
    // Computed field
    age: dog => dog.age || new Date().getFullYear() - dog.birthYear,

    // Issue: N+1 query
    // user: dog => dog.userId ? userOperations.getById(dog.userId) : null,

    // Issue: solution
    user: (dog, args, ctx) => dog.userId
      ? ctx.loaders.users.load(dog.userId)
      : null,

  },
}
