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
    secret: process.env.AUTH_SECRET || 'htfq4o3bcyriq4wyvtcbyrwqv3fy53bprogc',
    saltRounds: 10,
    createOptions: {
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
    enabled: true,
    stdout: true,
    minLevel: 'debug',
  },
  database: {
    client: 'pg',
    connection: process.env.DATABASE_URL
      || 'postgres://postgres@localhost:5432/nodejs-nights-local',
    pool: {
      min: process.env.DATABASE_POOL_MIN || 0,
      max: process.env.DATABASE_POOL_MAX || 5,
    },
  },
  aws: {
    s3: {
      bucketName: process.env.AWS_S3_BUCKET_NAME,
    },
    rekognition: {
      minConfidence: 90,
    },
  },
})
