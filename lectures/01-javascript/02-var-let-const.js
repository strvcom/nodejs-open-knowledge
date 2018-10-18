
function test(condition) {
  if (condition) {
    // var name = 'John'
    // const name = 'John'
    let name = 'John'
    name = 'Mark'
  }
  
  console.log(name)
}

// Means a constant reference to the object
const obj = {
  first: 'John'
}

obj.first = 'Mark'  // This is OK
obj = {}            // This is NOT OK

test(true)
