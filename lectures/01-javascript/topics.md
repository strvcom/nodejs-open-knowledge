# JavaScript lecture

## A. Intro
- Why would anyone use JavaScript
- IDE - VSCode, WebStorm, Atom, Sublime
- EcmaScript (ES5, ES6, ES7) and browser support
  - mention [Babel](https://babeljs.io/repl/)

## B. Install Node.js
- install from web (LTS vs Current support) [Node.js](https://nodejs.org/en/)
- version manager: <https://github.com/tj/n>
  - `npm install -g n`
  - `n latest`

## C. JavaScript
  ### 0. JS support
  - <https://node.green/>

  ### 1. `use strict` 
  - undeclared variable demo
  - `Object.freeze()` demo
  - `--use_strict` flag

  ### 2. Functions & Variables
  - `var`, `let`, `const`
  
  ### 3. Objects
  - fields:
    - static name (key)
    - dynamic name
    - via `Object.defineProperty`
      - enumerable - visible in `for .. in` iterations
      - writable - getter, setter
      - configurable - true, when it can be deleted or property descriptor changed
    - via Symbols

  - `for .. in` loop
  - functions:
    - separate - defines own this
    - object functions
    - arrow functions
  - delete operator

  ### 4. `this` binding

  ### 5. strict operators `==` vs `===`

  ### 6. Prototypes
  - via Object.create
  - `for .. in` loop and `hasOwnProperty`
  - via constructor Function
  - via classes

  ### 7. Closures
  - a function with outer context
  - A closure is the combination of a function and the lexical environment within which that function was declared.

  ### 8. Async constructs
  - callbacks & callback hell
    - converting them to promises (with default callback param)
  - Promises
  - `async await`

  ### 9. Iterators & Symbols
  ### 10. Generators

## Resources
- [Writable, enumerable, configurable](http://arqex.com/967/javascript-properties-enumerable-writable-configurable)
- [Node version manager](https://github.com/tj/n)
