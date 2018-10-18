'use strict'

const API = {
  google: 'api.google.com',
  azure: 'api.azure.com',
  aws: 'api.aws.com',
}

// Some asynchronous blocking method
function getRequest(uri) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(`Hello from ${uri}`)
    }, 3000)
  })
}

async function printData() {
  try {
    const data0 = await getRequest(API.google)
    console.log(data0)

    const data1 = await getRequest(API.azure)
    console.log(data1)

    const data2 = await getRequest(API.aws)
    console.log(data2)
  } catch (err) {
    console.error('Error:', err)
  }
}

printData().then()
