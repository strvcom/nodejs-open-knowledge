
const person = {
  // Field
  firstName: 'John',
  // Nested object
  address: {
    street: 'Rohanske'
  },
  // Method
  sayHello() {
    console.log('Hello')
  },
}

Object.defineProperty(person, 'age', {
  // Whether it can be deleted or the configuration changed
  configurable: true,
  // Whether it will be visible in for-in loop
  enumerable: true,
  // Getter
  get() {
    return 30
  }
})

for (const fieldName in person) {
  console.log(fieldName)
}

console.log(person.age)
