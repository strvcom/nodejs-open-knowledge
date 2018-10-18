
// Closure function can hold references to outer scope

function getAnswerToEverythingFunc() {
  const result = 42
  return () => {
    console.log(`Answer is ${result}`)
  }
}

const giveMeAnswer = getAnswerToEverythingFunc()

// Here, "result" variable cannot be garbage collected yet
// even though getAnswerToEverythingFunc completed. That's
// because of the closure reference. Beware of memory leaks.

giveMeAnswer()
