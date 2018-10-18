'use strict'

// Try with `nc localhost 3000`

const net = require('net')

const port = 3000

/* eslint-disable no-console */
const log = {
  info: console.log,
}
/* eslint-enable no-console */

const server = net.createServer()

server.on('connection', socket => {
  log.info('Client connected.')
  socket.write('Hello client.\n')

  socket.on('data', data => {
    log.info('Incoming data:', data)
    log.info('Incoming string:', data.toString('utf8').replace(/\n$/u, ''))

    socket.write('Logged: ')
    socket.write(data)
  })

  socket.on('end', () => {
    log.info('Client disconnected.')
    server.close(() => {
      log.info('Server closed.')
    })
  })

  // socket.setEncoding('utf8')
})

server.listen(port, () => {
  const address = server.address()
  log.info(`Server listening at ${address.address}:${address.port}`)
})
