## Introduction
This repository serves as an online course for learning nodejs.
It’s here to help those who want to learn more about nodejs and backend to develop a backend API.

#### Goal
To give you a fundamental understanding of backend and nodejs.

Presenters in our courses demonstrated the best practices in building nodejs applications based on their experience gained from numerous projects.

#### Source
This repository ("online course") was created and transformed from **STRV Nodejs Nights**–
a free offline course focused on Nodejs created by [STRV](https://www.strv.com/).

#### Prerequisites
The course requires at least a junior-level knowledge of programming (don’t need to be experienced with javascript, node or backend itself).

## Contents

This repository & course contains 9 lectures, with the first 3 lectures being general while the rest 6 sections
focus on building up one simple project from scratch to demonstrate all the practices.

Each lecture contains a video recording of the presentation with live coding and sample codes.

The course focuses on understanding good architectural practices and project setups. Please keep it mind that for the purpose of the course, it’s simplified compared to big production app to easily demonstrate fundamental patterns.

## Materials

#### Branches
- **Master** branch contains the final solution.
- **Lecture branches (e.b. 01-javascript)** contain parts of the solution finished after that lecture.

#### Lectures directory

[Lectures](https://github.com/strvcom/nodejs-nights-2018/tree/master/lectures)
These lectures contain a brief theoretical overview of what was discussed in that lecture.

Here you can find a list of past lessons:

1. [Javascript](https://github.com/strvcom/nodejs-nights-2018/tree/master/lectures/01-javascript)
2. [Node.js](https://github.com/strvcom/nodejs-nights-2018/tree/master/lectures/02-nodejs)
3. [Servers](https://github.com/strvcom/nodejs-nights-2018/tree/master/lectures/03-servers)
4. [Architecture](https://github.com/strvcom/nodejs-nights-2018/tree/master/lectures/04-architecture)
5. [Database](https://github.com/strvcom/nodejs-nights-2018/tree/master/lectures/05-database)
6. [Testing](https://github.com/strvcom/nodejs-nights-2018/tree/master/lectures/06-testing)
7. [Deployment](https://github.com/strvcom/nodejs-nights-2018/tree/master/lectures/07-deployment)
8. [Workers & Queues and Security](https://github.com/strvcom/nodejs-nights-2018/tree/master/lectures/08-workers-security)
9. [GraphQL](https://github.com/strvcom/nodejs-nights-2018/tree/master/lectures/09-graphql)

#### Video recordings
Recordings of all sessions can be found in a youtube playlist:

[https://www.youtube.com/playlist?list=PLfX7tWavkVjBVmmZOU5sWuyutpekJ6KNP](https://www.youtube.com/playlist?list=PLfX7tWavkVjBVmmZOU5sWuyutpekJ6KNP)


## Used technologies
#### Language & Runtime
- Javascript. ES6
- Nodejs 11

#### Framework
- [Koa](https://github.com/koajs/koa) as web application framework

#### Database
- [PostgreSQL](https://www.postgresql.org/) as database
- [Objection](https://github.com/sensepost/objection) as ORM
- [Knex](https://github.com/tgriesser/knex) as query builder (for migrations)

#### Testing
- [Mocha](https://github.com/mochajs/mocha) as the most robust testing framework for node.
- [Sinon.js](https://sinonjs.org/) for mocking.

#### Containerization
- [Docker](https://www.docker.com/) as very popular and easy-to-use platform for local development and deployment.

#### CI
- [Travis](https://travis-ci.org/) as Continuous integration
