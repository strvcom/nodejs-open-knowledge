'use strict'

const Koa = require('koa')
const koaBody = require('koa-body')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')
const router = require('./router')
const config = require('./config')
const log = require('./logger')

const services = {
  server: null,
}

const app = new Koa()

app.use(koaCompress())
app.use(koaCors())
app.use(koaBody())

app.use(router)

// Define start method
app.start = async () => {
  log.info('Starting app…')

  // Start any services here:
  // e.g. database connection.

  services.server = await new Promise((resolve, reject) => {
    const listen = app.listen(config.port, err => err ? reject(err) : resolve(listen))
  })
}

// Define app shutdown
app.stop = () => {
  log.info('Stopping app…')

  // Stop everything now.
  // e.g. close database connection

  services.server.close()
}

// Start app
if (require.main === module) {
  app.start()
    .then(() => log.info('App is running'))
    .catch(err => log.error(err))
}

process.once('SIGINT', () => app.stop())
process.once('SIGTERM', () => app.stop())

module.exports = app
