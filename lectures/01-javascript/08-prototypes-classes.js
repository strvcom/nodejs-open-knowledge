
// Classes are just a better syntax for constructor functions

class Killer {
  kill() {
    console.log('Killing')
  }
}

class ShootingKiller extends Killer {
  shoot() {
    console.log('Shooting')
  }
}

const john = new ShootingKiller()

console.log(john.__proto__ === ShootingKiller.prototype)
console.log(john.__proto__.__proto__ === Killer.prototype)
