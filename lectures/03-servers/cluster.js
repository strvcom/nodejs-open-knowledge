'use strict'

const cluster = require('cluster')
const http = require('http')
const os = require('os')

const port = 3000
const numCPUs = os.cpus().length

/* eslint-disable no-console */
const log = {
  info: console.log,
}
/* eslint-enable no-console */

if (cluster.isMaster) {
  log.info(`Master ${process.pid} is running`)

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    log.info(`worker ${worker.process.pid} died`)
  })
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200)

    setTimeout(() => res.end(`Hello world from worker #${process.pid}\n`), 500)
  }).listen(port)

  log.info(`Worker ${process.pid} started`)
}
