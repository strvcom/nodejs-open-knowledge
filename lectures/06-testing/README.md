# Testing

Testing is absolutely crucial for any serious software development. Even the simplest projects, in order to work properly,
need to be tested thoroughly. Otherwise such a projects will be riddled with bugs that you won't be even aware of (no kidding).

You can try to test your software by manually running it and observing how it behaves. However, you won't get far with
this approach. As your project will grow, manual testing quickly becomes unmanageable.


#### Links:
- [Video](https://www.youtube.com/watch?v=Aykxg9loDjE&list=PLfX7tWavkVjBVmmZOU5sWuyutpekJ6KNP&index=6)
- [Slides](./Node.js_Nights_Testing.pdf)
- [Homework](#homework)

## Testing Frameworks
Luckily there are tools to help you with automatization of your tests. Currently there are two dominant test frameworks
to choose from:

- [Mocha](https://mochajs.org/) - Battle-tested framework. Works best with [Chai](https://www.chaijs.com/).
- [Jest](https://jestjs.io/) - New framework from Facebook. Has some interesting features and also provides
mocking and coverage so you don't need to install any additional dependencies. 


## Tests

In API we use mostly two kinds of tests:

- **Unit tests** - to verify functionality of individual isolated components
- **Integration tests** - to verify how these components works together. Most notably, we are testing whole endpoints.

There's also **End-to-end** testing, but in terms of API we are not using them

## Coverage

Coverage is telling us how much of our codebase we are actually testing. This is very important metric as
without it we can never be sure if our tests are actually covering enough of our codebase.

If you are using Mocha as your testing framework, try to add [nyc](https://www.npmjs.com/package/nyc) to your
project. Jest users doesn't need to install anything, just enable coverage generation thorough CLI param
or in options. 

## Mocking

Sooner or later you'll run into a problem that using some actual services during tests are very impractical.
For example when you'll be testing your payment endpoints you don't want to actually make any payments. In
fact you don't want to make any network requests to 3rd party services.

To solve that situation, you can use imitation of some part of the code that fakes the response. This allows
you to test actual feature you want to test in isolation from other parts that you are don't want to test.

If you are using Mocha, you can try [Sinon](https://sinonjs.org/).Again, Jest users can use jests built-in
mocking features.


# Homework

## 1. Improve coverage
Improve coverage of file `src/operations/users.js` so that only one
line (doesn't matter which one) is not covered (coverage 97.14%, 34 out of 35 lines covered).

To be able to do that, you're gonna need to write several more tests. Study tests in `tests/integration/users/create.spec.js` as well as in
`tests/integration/dogs/create.spec.js`. This should get you enough
information to carry out this task easily.

If that last uncovered line bugs you and you would like to score extra credit, try to improve coverage as much as reaching
100%. Hint: To do so, you'll need to find and fix a bug that creeped 
into our code during one of the previous lessons. Bug should get revealed by a test you'll write.

## 2. Optional

Look at Jest library and try to reimplement at least some of the tests using this framework instead of Mocha.
