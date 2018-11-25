'use strict'

const path = require('path')
const { fileLoader, mergeResolvers, mergeTypes } = require('merge-graphql-schemas')

// Load type definitions
// all:true = merge types with the same name
const typeDefsFiles = path.join(__dirname, './types/*.gql')
const typeDefs = mergeTypes(fileLoader(typeDefsFiles), { all: true })

// Load resolvers
const resolverFiles = path.join(__dirname, './resolvers/*.js')
const resolvers = mergeResolvers(fileLoader(resolverFiles))

module.exports = {
  typeDefs,
  resolvers,
}
