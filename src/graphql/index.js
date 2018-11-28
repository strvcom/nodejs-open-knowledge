'use strict'

const { ApolloServer } = require('apollo-server-koa')
const config = require('../config')
const { typeDefs, resolvers } = require('./schema')

const defaultPlaygroundConfig = {
  settings: {
    'editor.theme': 'light',
    'editor.cursorShape': 'line',
    'editor.fontSize': 16,
  },
}

function addGraphQL(app) {
  const enableIntrospection = config.env !== 'production'

  // Create Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: enableIntrospection,
    introspection: enableIntrospection,
    playground: enableIntrospection ? defaultPlaygroundConfig : false,
    // context: makeContext,
    // engineConfig,
  })

  // Apply Apollo middleware
  server.applyMiddleware({
    app,
    path: '/graphql',
  })
}

module.exports = {
  addGraphQL,
}
