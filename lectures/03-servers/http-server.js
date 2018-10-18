'use strict'

// Try with `curl localhost:3000`

const http = require('http')

const port = 3000

/* eslint-disable no-console */
const log = {
  info: console.log,
}
/* eslint-enable no-console */

const server = http.createServer()

server.on('request', (req, res) => {
  log.info('Incoming request', {
    headers: req.headers,
    url: req.url,
  })

  res.writeHead(200, { 'Content-Type': 'text/plain' })

  res.write('Hello from HTTP server.\n')
  res.write('First\n')
  setTimeout(() => res.write('Second\n'), 1000)
  setTimeout(() => res.write('Third\n'), 2000)
  setTimeout(() => res.end('Bye.\n'), 3000)
})

server.listen(port, () => {
  log.info(`Server up and running on port ${port}.`)
})
