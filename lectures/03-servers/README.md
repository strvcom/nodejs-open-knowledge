# 3. Lecture summary

This lecture covers
- TCP server
- HTTP server
- REST API guidelines
- Express.js
- Koa.js
  - middleware
  - context
  - router
 
Also basics of
- Nodemon
- linting code
- logging
- user input validation
- Node.js clustering
- process signals

#### Links:
- [Slides](https://docs.google.com/presentation/d/1rJOtXGaKL2s90MJCfhjr52E_fab8ww-4PDHFufu1n_Y/edit?usp=sharing)
- [Homework](#homework)

## Servers introduction

This lecture is all about servers. We start with an introduction to TCP and HTTP servers.

### Simple TCP server
- build-in `net` package
- instance of `EventEmitter` object
- socket implements `DuplexStream` interface - read/write
- `nc localhost 3000`

### Simple HTTP server
- build-in `http` package
- transfer-encoding
  - response is streamed, partial chucked responses
  - node can send chunks when they are ready instead of caching them in memory
- terminating request is mandatory (`res.end`)
- `curl localhost:3000` or Postman

### REST API guidelines
- Representational state transfer
- always go for HTTPS
- use correct HTTP statuses
  - see `require('http').STATUS_CODES`
- plural names (e.g. `/dogs/1`)
- PUT vs PATCH (replace vs modify)

## Koa
[Koa.js](https://koajs.com) is a minimal and flexible Node.js web application framework, developed by the creators of Express.js. It supports modern features like `async/await` out of the box.

### Basic Koa application
Starting a Koa server is super simple:
```js
const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000)
```

### Middleware
A Koa application is an object containing an array of middleware functions which are composed and executed in a stack-like manner upon request.

```js
const app = new Koa()

/*
  Use middleware
 */
app.use(koaCompress())
app.use(koaCors())
app.use(koaBody())

app.use(async (ctx, next) => {
  const start = Date.now()
  
  await next()
  
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})
```

### Context
A Koa Context encapsulates node's request and response objects into a single object which provides many helpful methods for writing web applications and APIs.

A Context is created per request, and is referenced in middleware as the receiver, or the ctx identifier, as shown in the following snippet:

```js
app.use(async ctx => {
  ctx // is the Context
  ctx.request // is a Koa Request
  ctx.response // is a Koa Response
})
```

For more info see Koa documentation for the [Context](https://koajs.com/#context), [Request](https://koajs.com/#request), and [Response](https://koajs.com/#response) objects.

### Routing
In order to keep things simple and implement routes in a Koa app, we will use middleware library [koa-router](https://github.com/alexmingoia/koa-router).

```js
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router
  .get('/', ctx => {
    ctx.body = 'Hello World'
  })
  .get('/dogs', ctx => {
    ctx.body = dogs
  })

app
  .use(router.routes())
  .use(router.allowedMethods()) // OPTIONS middleware
```

## Useful stuff
There are a lot of useful things we've learned during the lesson.

### Nodemon
- restart your node application when file changes in the directory are detected
- https://www.npmjs.com/package/nodemon
- `nodemon .`

### Linter
_A linter or lint refers to tools that analyze source code to flag programming errors, bugs, stylistic errors, and suspicious constructs._

- https://eslint.org
- `.eslintrc.js`
- Rule sets:
  - [STRV](https://www.npmjs.com/package/@strv/eslint-config-javascript)
  - [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb-base)
    
### Logging
Rather than using `console.log` you should use a proper logger.

Recommended packages
- [Bunyan](https://www.npmjs.com/package/bunyan)
- [Pino](https://www.npmjs.com/package/pino)
    
### Input validation
Validating user input manually is complicated you can easily miss some unwanted cases. But there are packages to the rescue.

- [jsonschema](https://www.npmjs.com/package/jsonschema)
- [Joi](https://www.npmjs.com/package/joi)

### Clustering in Node.js
_A single instance of Node.js runs in a single thread. To take advantage of multi-core systems, the user will sometimes want to launch a cluster of Node.js processes to handle the load._

- build-in `cluster` module
- or even simpler [Throng](https://www.npmjs.com/package/throng) package

### Process signals
_The `process` object is a `global` that provides information about, and control over, the current Node.js process. As a global, it is always available to Node.js applications without using `require()`._

- instance of `EventEmitter`
```js
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
```

- SIGINT
- SIGTERM

## Homework
Create your own Koa server which supports all CRUD (**C**reate, **R**ead, **U**pdate, **D**elete) operations on a collection of dogs.

You can write everything from scratch (_recommended_), or you can use this repository as a boilerplate.
