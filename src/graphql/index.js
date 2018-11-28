'use strict'

const { ApolloServer } = require('apollo-server-koa')
const config = require('../config')
const { getAuthPayload } = require('../middleware/authentication')
const errors = require('../utils/errors')
const logger = require('../utils/logger')
const { typeDefs, resolvers } = require('./schema')

const defaultPlaygroundConfig = {
  settings: {
    'editor.theme': 'light',
    'editor.cursorShape': 'line',
    'editor.fontSize': 16,
  },
}

function formatError(err) {
  const isDevelopment = ['local', 'test', 'development'].includes(config.env)

  logger.error(err)
  return {
    name: err.name,
    stacktrace: isDevelopment && err.extensions.exception.stacktrace,
  }
}

async function makeContext(app) {
  // Load authorized user from the authorization header
  const data = await getAuthPayload(app.ctx.header.authorization)

  // Create context - can be used in resolvers
  return {
    user: data && data.user,
    requireAuth: () => {
      if (!data) {
        throw new errors.UnauthorizedError()
      }
    },
  }
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
    context: makeContext,
    formatError,
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
