
// ------ Callback style ------------------------------------------------------

/*

function callApi(url, callback) {
  setTimeout(() => {
    // Error goes as a first parameter, always! This is a convention
    // used in all native Node.js modules.
    callback(null, `Result: ${url}`)
  }, 1000)
}

// This is callback hell
callApi('api.google.com', (err, data) => {
  console.log(data)
  callApi('api.microsoft.com', (innerErr, innerData) => {
    console.log(innerData)
    callApi('api.apple.com', (subErr, subData) => {
      console.log(`${data} ${subData}`)
    })
  })
})

*/

// ------ Promise style -------------------------------------------------------

/*

function callApi(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // if (somethingBadHappens) {
      //   return reject(new Error('Some error'))
      // }
      resolve(`Result: ${url}`)
    }, 1000)
  })
}

let result
callApi('api.google.com')
  .then(data => {
    result = data
    console.log(data)
    return callApi('api.microsoft.com')
  })
  .then(innerData => {
    console.log(innerData)
    return callApi('api.apple.com')
  })
  .then(subData => {
    console.log(`${result} ${subData}`)
  })
  .catch(err => {
    console.error(err, 'Something bad happened')
  })

*/

// ------ Async await style ---------------------------------------------------

function callApi(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Result: ${url}`)
    }, 1000)
  })
}

async function run() {

  const data = await callApi('api.google.com')
  // Context is automatically loaded here
  console.log(data)
  const innerData = await callApi('api.microsoft.com')
  console.log(innerData)
  const subData = await callApi('api.apple.com')
  console.log(`${data}, ${subData}`)

  // We can await all at once
  /*
  const [data, innerData, subData] = await Promise.all([
    callApi('api.google.com'),
    callApi('api.microsoft.com'),
    callApi('api.apple.com')
  })
  
  console.log(data)
  console.log(innerData)
  console.log(`${data}, ${subData}`)
  */
}

// Result of an async function is Promise 
run()
  .then(() => console.log('All APIs called'))
  .catch(err => {
    console.log('Something bad happened')
  })

console.log('When will this happen?')
