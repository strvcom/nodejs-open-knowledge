'use strict'

// Some asynchronous blocking method
function getRequest(uri, cb) {
  setTimeout(() => {
    cb(null, `Hello from ${uri}`)
  }, 3000)
}

getRequest('api.google.com', (err, response) => {
  if (err) {
    console.error('Error:', err)
    return
  }

  console.log(response)

  return getRequest('api.azure.com', (err, response) => {
    if (err) {
      console.error('Error:', err)
      return
    }
  
    console.log(response)
  
    return getRequest('api.aws.com', (err, response) => {
      if (err) {
        console.error('Error:', err)
        return
      }
    
      console.log(response)
    })
  })
})
