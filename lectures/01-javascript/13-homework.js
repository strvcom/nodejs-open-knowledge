
// Install with:
// npm install request
// npm install request-promise

const request = require('request-promise')

const BASE_URL = 'http://swapi.co/api'

async function run() {
  const result = await request(`${BASE_URL}/people/1`)
  console.log(result)
}

run()
