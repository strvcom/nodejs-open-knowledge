'use strict'

const url = require('url')
const AWS = require('aws-sdk')
const Bluebird = require('bluebird')
const R = require('ramda')
const awsConfig = require('../config').aws

const rekognition = new AWS.Rekognition()
const detectLabels = Bluebird.promisify(rekognition.detectLabels, { context: rekognition })

const pathFromUrl = photoUrl => url.parse(photoUrl).pathname
const getS3KeyFromPathname = pathName => pathName.replace(/^\/|\/$/gu, '')

const PROP_NAME = 'Name'
const PROP_VALUE = 'Dog'

const getLabels = photoUrl => {
  const params = {
    Image: {
      S3Object: {
        Bucket: awsConfig.s3.bucketName,
        Name: getS3KeyFromPathname(pathFromUrl(photoUrl)),
      },
    },
  }

  return detectLabels(params)
}

module.exports = {
  isDogRecognized: async photoUrl => {
    const labelsResponse = await getLabels(photoUrl)
    const dogLabel = R.find(R.propEq(PROP_NAME, PROP_VALUE))(labelsResponse.Labels)

    return Boolean(dogLabel && dogLabel.Confidence > awsConfig.rekognition.minConfidence)
  },
}
