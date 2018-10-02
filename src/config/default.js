/* eslint-disable no-process-env */
'use strict'

const pkg = require('../../package')

module.exports = env => ({
  env,
  appName: pkg.name,
  version: pkg.version,
  server: {
    port: process.env.PORT || 3001,
    bodyParser: {
      patchKoa: true,
      urlencoded: true,
      text: false,
      json: true,
      multipart: false,
    },
    cors: {
      origin: '*',
      exposeHeaders: [
        'Authorization',
        'Content-Language',
        'Content-Length',
        'Content-Type',
        'Date',
        'ETag',
      ],
      maxAge: 3600,
    },
  },
  auth: {
    secret: process.env.AUTH_SECRET
      || 'nc475yb9cb*)&n4fy0bt9vwcfnhuwhbv8hf9docgaewu348y983fsdhfelhf',
    saltRounds: 10,
    createOptions: {
      // 1 hour
      expiresIn: 60 * 60,
      algorithm: 'HS256',
      issuer: `com.strv.nodejs-nights.${env}`,
    },
    verifyOptions: {
      algorithm: 'HS256',
      issuer: `com.strv.nodejs-nights.${env}`,
    },
  },
  logger: {
    stdout: true,
    minLevel: 'debug',
  },
})
