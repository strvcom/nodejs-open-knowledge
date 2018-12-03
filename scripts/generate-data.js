/* eslint-disable no-console, no-process-exit */

'use strict'

const R = require('ramda')
const Chance = require('chance')
const userOperations = require('../src/operations/users')
const dogOperations = require('../src/operations/dogs')

const chance = new Chance()

const USER_COUNT = 3
const DOGS_PER_USER_MIN = 3
const DOGS_PER_USER_MAX = 5

const generateUser = () => {
  const userData = {
    name: chance.name(),
    email: chance.email({ domain: 'example.com' }),
    password: chance.word({ length: 8 }),
  }
  return userOperations.signUp(userData)
}

const generateDog = userId => {
  const dogData = {
    name: chance.first(),
    breed: chance.pickone(['husky', 'bulldog', 'terrier', 'beagle']),
    birthYear: parseInt(chance.year({ min: 2000, max: 2017 })),
    userId,
  }
  return dogOperations.createDog(dogData)
}

const generate = async () => {
  const results = await Promise.all(R.times(async () => {
    const numOfDogs = chance.integer({ min: DOGS_PER_USER_MIN, max: DOGS_PER_USER_MAX })
    const user = await generateUser()
    const dogs = await Promise.all(R.times(() => generateDog(user.id), numOfDogs))
    return { user, dogs }
  }, USER_COUNT))
  return results
}

generate()
  .then(results => {
    console.log(results)
    process.exit(0)
  })
  .catch(console.error)
