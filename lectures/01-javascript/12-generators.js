
// Generators are special functions that generate items. Caller of the generator can specify
// how many iterations are needed.

function * generateNumbers() {
  yield 1
  yield 2
}

// Generators can be combined together with yield*
function * generateColors() {
  const value = yield 'red'
  yield* generateNumbers()
  yield 'blue'
  yield 'green'
}

// We can pass value back to the generator. This principle is used in redux-sagas library
// (quite popular on frontend).
const colorsIterator = generateColors()
console.log(colorsIterator.next())
console.log(colorsIterator.next('value'))
console.log(colorsIterator.next())
console.log(colorsIterator.next())
