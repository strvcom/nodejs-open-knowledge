# Deployment

- [Presentation](https://docs.google.com/presentation/d/13fmv92YSw5MTSJXsqd7SIMBV5juefxKfO0Rzh4qfaY8/edit?usp=sharing)
- [Video](https://www.youtube.com/watch?v=Jb1ztje-CQE&list=PLfX7tWavkVjBVmmZOU5sWuyutpekJ6KNP&index=7)

# Topics

## Software Deployment

Process that consists in different activities

- Pull/Push from a version control system.
- Build artifacts, compilation, update dependencies.
- Check health status. If something failed, rollback to previous healthy deployment
- Specify release versions.

Deployments could have different named environments like: development, pre-production, production

## Deployment Strategies

- On-premise data centers
  - You need to take care of all hardware, networking, maintenance.
  - Upgrade the obsolete parts.
  - There should be a good reason to go this way, eg: Licensing, Credit cards information.

- Cloud
  - Ready to use provisioned hardware/software/configuration.
  - Provide different kind of services within different models.
  - Different pay models.
  - Different providers.

## Cloud

- Infrastructure as a Service (IaaS)
  - AWS, Azure, Google Cloud, DigitalOcean
- Platform as a Service (PaaS)
  - __Heroku__, AWS Beanstalk, AWS Fargate
- Software as a Service (SaaS)
  - Dropbox, Slack, Google Apps
- Serverless
  - Function as a Service (FaaS): AWS Lambda, Google Cloud Functions
  - Backend as a Service (BaaS): Firebase

# Heroku

- On top of AWS
- Architecture
  - Dynos: Application containers
  - Stacks: Operating system + built dependencies. Always Ubuntu.
  - Add-ons: Databases, Logs consumers, Monitoring tools...
- Deployments using Git

# Continuous Delivery

- Process that consist on keep your application on a delivery-ready state
- Comes along with Automation strategies/services
- Continuous Integration
  - Build/Compilation succeed
  - Tests succeed
- Continuous Deployment
  - Script/Service that makes deployments

# Homework

## 1. Code coverage

So far the code coverage is only being generated and that's it. Let's make a better use of them!
This activity consists on attaching the code coverage to the CD pipeline by uploading them to a service like [CodeCov](https://codecov.io/).

Replace the `after_success` step in the TravisCI config file with the proper command to upload.

Hint: As you will be uploading data to a remote service there should be a way to authenticate against it (just like Heroku deployments) so make sure you have the `"token"` included in the TravisCI config file __encrypted__

## 2. (Optional) Dockerfile for Development

Currently we have the `Dockerfile` only for production environments and final releases. To make completely sure that new features we develop will run exactly as in a production environment, we should have a Docker-ized development environment and integrate it to the current `docker-compose.yml` configuration so when we run `npm run infra` we provision not only the database but the API itself, all running inside Docker.

Hint: Check out [Docker's volumes](https://docs.docker.com/storage/volumes/). This allows us to share and link directories between the Host machine and the Docker container, eg: Link the APP's code to the container so there's no need to re-build the image every time the code changes!