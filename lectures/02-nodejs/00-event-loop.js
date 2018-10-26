'use strict'

function fn() {
  console.log('1.', 'synchronous function')
}

setTimeout(() => {
  console.log('3.', 'setTimeout with 0ms')
}, 0)

setTimeout(() => {
  console.log('5.', 'setTimeout with 2000ms/2s')
}, 2000)

setImmediate(() => {
  console.log('4.', 'setImmediate')
})

process.nextTick(() => {
  console.log('2.', 'nextTick')
})

fn()

/**
Result:
1. synchronous function
2. nextTick
3. setTimeout with 0ms
4. setImmediate
5. setTimeout with 2000ms/2s
*/
