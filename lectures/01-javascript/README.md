# JavaScript lecture summary

- [Topics covered](./topics.md)
- [Presentation](https://docs.google.com/presentation/d/1C1bWK_-J_7KjjXM2SxbeIRa4Uzxn7QfIbS6u_y6EDos/edit?usp=sharing)
- Video: TO BE DONE

## Homework

### Summary:
Get names of all vehicles owned by `Luke Skywalker`. Use Starwars API to retrieve data (<http://swapi.co>).

### Workflow:
1. Make a request to retrieve Luke Skywalker (`GET http://swapi.co/api/people/1`)
2. You will retrieve Luke detail with `vehicles` array
3. Then retrieve all vehicles by making requests to vehicle URL (e.g. `GET http://swapi.co/api/vehicles/14`)
4. Use `map` function (<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map>) to retrieve vehicles names and dump them to the console

### Implementation details:
1. Install Node.js latest from <https://nodejs.org/en/>
2. Implement workflow with callbacks
  - use `request` package to make requests
  - package documentation is here: <https://www.npmjs.com/package/request>
  - to install the package use `npm install request` (`npm` is Node Package Manager automatically installed with Node.js)

3. Implement workflow with promises
  - use `request-promise` package to make requests
  - to install the package use `npm install request request-promise` (`request-promise` package needs `request` package as well, it uses it internally)

4. Implement workflow with async await
  - `async await` works with promises so use the same `request-promise` package
