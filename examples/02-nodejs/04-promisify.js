'use strict'

const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)

async function readAllLines(file) {
  const data = await readFile(file)
  const lines = data.toString().trim().split('\n')

  return lines
}

async function run() {
  const lines = await readAllLines(__filename)
  lines.forEach((line, index) => {
    console.log(`${index}: ${line}`)
  })
}

run()
