
// Inspect prototype chain of an object

const parent = {
  name: 'Parent'
}

const child = Object.create(parent)
child.age = 20
child.name = 'Child'

console.log(child.name)

console.log(child.__proto__.__proto__ === Object.prototype)
console.log(Object.getPrototypeOf(child) === parent)

child.toString()

// Inspect prototype chain of a function

function test() {
}

console.log(Object.getPrototypeOf(test) === Function.prototype)
console.log(Object.getOwnPropertyNames(Function.prototype))
console.log(Function.__proto__.__proto__ === Object.prototype)
