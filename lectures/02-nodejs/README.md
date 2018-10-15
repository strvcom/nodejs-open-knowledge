# Node.JS lecture summary

* [Presentation](https://docs.google.com/presentation/d/14PalrqWD1lNJ3wi443abAxPkNZGTqFDxO3piZ0_SKws/edit?usp=sharing)
* Video (TODO)

## Topics

### Event loop
* [Nodejs.org website explanation](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
* [Philip Roberts](http://latentflip.com/loupe) - Simulator for event loop. It is mainly for frontend but behavior is similar

### Handling blocking operations
* Callbacks - used a lot in Node.JS api
* Promises (async/await) - Object accessible as Global object in Node
* When method use only callbacks (old packages or nodejs api functions) you can promisify callbacks functions
    * `Bluebird` module
    * `util.promisify` from Node.JS api

_How to view all Global objects:_
* _Write `node` in terminal and hit `ENTER`_
* _Hit two times `TAB`_

### Packages

#### Package managers
* NPM - [npmjs.com](https://www.npmjs.com)
* Yarn - [yarnpkg.com](https://yarnpkg.com)
* You should use only one of them for your project but you can switch in the future if you want

#### Your project setup
* `npm init`
* `yarn init`
* Creates package.json - [Specification](https://docs.npmjs.com/files/package.json)
* [Dependencies versions](https://docs.npmjs.com/misc/semver)

#### Add new package
* `npm i koa`
* `npm i -D mocha` - for development dependency
* `npm i -g eslint` - install package globally
* `yarn add koa`
* `yarn add --dev mocha` - for development dependency
* `yarn global add eslint` - install package globally 

#### Remove package
* `npm un sequlize`
* `yarn remove sequlize`

#### Check outdated packages
* `npm outdated`
* `yarn outdated`

#### Update package
* `npm upgrade koa`
* `npm i koa@latest` - force upgrade to newest version
* `yarn upgrade koa`
* `yarn add koa@latest` - force upgrade to newest version

#### Requiring
* `const myPkg = require('./path/to/my/package')` - With relative or absolute path
* `const myPkg = require('some-package')` - `console.log(module.paths)` you can check paths where node searches for packages
* Node goes through the following sequence of steps when `require()` is used:
    * `Resolving`: To find the absolute path of the file.
    * `Loading:` To determine the type of the file content.
    * `Wrapping`: To give the file its private scope. This is what makes both the require and module objects local to every file we require.
    * `Evaluating`: This is what the Virtual Machine eventually does with the loaded code.
    * `Caching`: So that when we require this file again, we don’t go over all the steps another time.

### Events
* `events` package - [Specification](https://nodejs.org/api/events.html)
* `events` returns `EventEmitter` class
* By default synchronous
* `EventEmitter` in Node.JS are for example servers, streams, file operations, etc.
