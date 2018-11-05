'use strict'

const fetch = require('node-fetch')

module.exports = {
  getRandomBreedImage: async breed => {
    const response = await fetch(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`)
    const json = await response.json()
    if (json.status === 'error') {
      return null
    }
    return json.message
  },
}
