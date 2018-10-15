'use strict'

// Finds ./custom-math/index.js file 
// because default loaded file is index.js 
// when your path to module is directory
// require('./custom-math') === require('./custom-math/index.js')
const customMath = require('./custom-math')

// You can load single files as well
const constants = require('./custom-math/constants')

console.log('1 + 1 =', customMath.add(1, 1))
console.log('2 * 10 =', customMath.multiply(2, 10))

console.log('PI is', constants.PI)
console.log('E is', constants.E)

// Search paths for modules if you do not provide relative path
console.log(module.paths)
