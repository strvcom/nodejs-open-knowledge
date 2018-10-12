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

getRequest(API.google).then(response => {
  console.log('Single request:', response)

  return getRequest(API.azure)
}).then(response => {
  console.log('Single request:', response)

  return getRequest(API.aws)
}).then(response => {
  console.log('Single request:', response)
}).catch(err => {
  console.error('Error:', err)
})

// You can send multiple requests at once with Promise.all
function getAll() {
  return Promise.all([
    getRequest(API.google),
    getRequest(API.azure),
    getRequest(API.aws),
  ])
}

getAll().then(response => {
  for (const data of response) {
    console.log('Promise.all:', data)
  }
}).catch(err => {
  console.error('Error:', err)
})
