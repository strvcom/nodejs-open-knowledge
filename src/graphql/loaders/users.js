'use strict'

const DataLoader = require('dataloader')
const R = require('ramda')
const operations = require('../../operations/users')

class UserDataLoader extends DataLoader {
  constructor() {
    super(async userIds => {
      const users = await operations.getByIds(userIds)
      const userIndex = R.indexBy(user => user.id, users)
      return userIds.map(userId => userIndex[userId])
    })
  }
}

module.exports = UserDataLoader
