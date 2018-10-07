'use strict'

const database = require('../database')

class Base extends database.Model {
  $beforeInsert() {
    this.updatedAt = this.createdAt = this.createdAt || new Date()
  }

  $beforeUpdate() {
    this.updatedAt = new Date()
  }
}

module.exports = Base
