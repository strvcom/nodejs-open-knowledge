
// Symbols are unique
const symbolA = Symbol('A')
const symbolB = Symbol('B')
console.log(symbolA === symbolB)

// Iterable collection has a special field with Symbol.iterator key
const arr = [1, 2, 3, 4, 5]
const iterator = arr[Symbol.iterator]()

// Custom iterator - an object with single method "next" that returns 
// { value: ..., done: true/false } object on each call.
function getIterator() {
  const colors = ['white', 'blue', 'red']
  let currentIndex = 0
  return {
    next: function() {
      if (currentIndex < colors.length) {
        const currentValue = colors[currentIndex]
        currentIndex++
        return {
          done: false,
          value: currentValue,
        }
      }

      return { done: true }
    }
  }
}

// If Symbol.iterator field is defined, we can use the object in for-of loop
const myIterableObj = {
  [Symbol.iterator]: getIterator
}

for (const item of myIterableObj) {
  console.log(item)
}
