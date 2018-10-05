
const killer = {
  name: 'John',
  counter: 0,
  kill: function(who, where) {
    console.log(`I am ${this.name} and I will kill ${who} in ${where}.`)
  },
  count: function() {
    setInterval(() => {
      console.log(this.counter++)
    }, 1000)
  }
}

// killer.kill('Mark', 'Paris')

// const kill = killer.kill
// kill('Mark', 'Paris')

// killer.kill.call({ name: 'Brian' }, 'Mark', 'Paris')
// killer.kill.apply({ name: 'Brian' }, ['Mark', 'Paris'])

// const killBinded = killer.kill.bind({ name: 'Joe' })
// killBinded('Mark', 'Paris')

killer.count()
