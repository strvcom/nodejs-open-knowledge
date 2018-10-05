
// Constructor function
function Killer() {
  this.name = 'John'
}

// This object will be used as a prototype for newly created object
const KillerProto = {
  kill() {
    console.log('Killing')
  }
}

// This reference is used when the function is used as a constructor function
Killer.prototype = KillerProto

const john = new Killer()
console.log(Object.getPrototypeOf(john) === KillerProto)
console.log(john.__proto__.__proto__ === Object.prototype)

console.log(john.hasOwnProperty('kill'))

// Null & undefined - there's a difference but we usually don't care that much

console.log(undefined == null)
console.log(undefined === null)

const obj = {
  firstName: 'John',
  lastName: undefined,
}

console.log(obj.lastName)
