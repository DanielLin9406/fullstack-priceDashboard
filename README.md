# Price Dashboard

[![Build Status](https://travis-ci.org/DanielLin9406/fullstack-priceDashboard.svg?branch=master)](https://travis-ci.org/DanielLin9406/fullstack-priceDashboard)

This project is originally desinged as an internal tool for a company I was at for the purpose of setting and showing product price. Initially, it contains only front-end side before I completely refractor front-end side and rebuild it as a full-stack project with container technique. It also has CI pipeline right now.

Set a new promotion and view a particular promotion.
![preview1](https://i.imgur.com/6rcwR3Y.png)

Details price in terms of different user
![preview2](https://i.imgur.com/MmvQmTv.png)

## Features

### Web Service Features

Tech perspective:

- Use my own Webpack setting for React instead of CRA.
- Layout, route and page as component for more flexibility.
- Separate container as subscriber of Redux make it easy to understand.
- Use React design pattern such as compound, render-props and context api to build reuseable component.
- Use nginx as static file server in production version.

Function perspective:

- No need to reload page after create/update/delete, the state is always up-to-date with backend.
- Easily to check the following promotion in queue pool.
- Show individual product price in different promotion sale
- You can understand how much a product cost to a particular user who may alrady has a product before.

### User/Promotions/Prices/Upgrade-rules Service Features

Tech perspective:

- Clearly understand Node/Express backend structure with ES6 syntax.
- Every route has implemented Redis as cache server to reduce DB write/read operation.
- Thanks for Redis, my API will return full promotion list without additionly DB querying no matter which restfull api is called.
- Use nginx as reverse-proxy.
- Separate Express 'app' and 'server'
- self-contained components as file structure.

## Prerequisite

**This section is necessary no matter which way to start/build this project.**

- Node v10.16
- npm v6.9

### Web Services

```bash
# ./services/web/.env

GOOGLE_CLIENT_ID=<Google OAuth 2 Client Id>
API_HOST_PRICES=http://localhost
API_HOST_PROMOTIONS=http://localhost
API_HOST_UPGRADERULES=http://localhost
API_PORT_PRICES=5000
API_PORT_PROMOTIONS=5001
API_PORT_UPGRADERULES=5002
API_VER_PRICES=v1
API_VER_PROMOTIONS=v1
API_VER_UPGRADERULES=v1
```

### User Services

```bash
# ./services/user/.env

PORT=4999
# Same as the client id in web service
CLIENT_ID=<Google OAuth 2 Client Id>
CLIENT_SECRET=<Google OAuth 2.0 client Secret>
REDIRECT_URI=http://localhost:8080/auth/callback

```

### Prices,Promotions,Upgrade-Rules Services

```bash
# ./services/prices/.env
# ./services/promotions/.env
# ./services/upgrade-rules/.env

PORT=5000(promotions) | 5001(prices)| 5002(upgrade-rules)
DATABASE_URL_PROD=<MongoDB Altas URL>
DATABASE_URL_DEV=<MongoDB Altas URL>
REDIS_HOST_DEV=127.0.0.1
REDIS_HOST_PROD=127.0.0.1
REDIS_PORT_DEV=6379
REDIS_PORT_PROD=6379
AUTH_HOST_DEV=localhost
AUTH_HOST_PROD=localhost
AUTH_PORT_DEV=4999
AUTH_PORT_PROD=4999
AUTH_VER_DEV=v1
AUTH_VER_PROD=v1
```

## Start Project by Default Environment Setting

You have two ways to start this project:

```bash
# Method 1. In project root (Highly Recommonded)
docker-compose -f docker-compose-dev.yml up

# Method 2. In project root
See below details
```

### Method 1: docker-compose

This method is easy.
Open browser and go to http://localhost:3050.
You can see the dashboard.

### Method 2: npm script

If you want to do it with purely npm command, there are more additional setup:

1. Install Redis.

```bash
# Use homebrew on MacOSX
brew install redis
```

2. Install Dependence of each service

```bash
# ./
# ./services/web
# ./services/promotions
# ./services/prices
# ./services/upgrade-rules
# ./services/user

npm i
```

3. Start Redis

```bash
redis-server
```

4. Start Project

```bash
# ./ @project root
npm start
```

5. Check result

Open browser and go to http://localhost:8080.

### More Slient Start Script

```bash
# with JSON Mock server (only get data is available )
npm run start:jsonserver

# with other server on same localhost but port
# Need to start server first
npm run start:dev
```

## Build Project and Run Production version

You also have two ways to run production version:

```bash
# Method 1. In project root (Highly Recommonded)
docker-compose -f docker-compose-stage.yml up

# Method 2. In project root
(TODO)See below details
```

### Method 1: docker-compose

This method is easy.
Open browser and go to http://localhost:3060.
You can see the dashboard.

### Method 2: npm script

1. Run Production Bbuild

```bash
# ./ @project root
# Use Babel to complie import syntax to require
npm run build
```

2. Run Production Server

```bash
# ./ @project root
# Use Babel to complie import syntax to require
npm run prod
```

3. Check result

Open browser and go to http://localhost:8080.

### More Client Build Script

```bash
# ./services/web
# with other localhost API server in different port
npm run build:dev

# stage as API server
npm run build:stage

# production as API server
npm run build:prod
```

## TechStacks

### Web

- Webpack 4 custom scaffold
- Babel 7
- React 16 with render props, compound pattern
- Redux with Module pattern
- Redux-thunk
- React-Router 4
- React Hot loader
- React-Loadable for async loading page
- Redux with module pattern
- (TODO) Jest+puppeteer for unit test
- Husky+Lint-stage
- ESlint+Prettier
- Json-server
- Sensitive data handler: dotenv
- Google OAuth 2.0

### Promotions, Price, Upgrade-Rules and User

- Babel node for compiling ES6 syntax
- Express.js
- Restful API
- (TODO) Mocha+Chi for unit test
- Mongoose
- MongoDB Altas
- Redis for DB caching
- Sensitive data handler: dotenv
- API authorization between services

### Dev-Ops

- Docker
- Docker-compose
- Nginx as reverse-proxy
- Nginx as static file server in production
- Bash 5 for development
- Travis plays as CI role
  - Delegate gcloud to handle kubectl command

### Cloud - Service Structure on AWS for multi-docker

- (TODO)AWS Elastic Beanstalk (EB)
- (TODO)AWS Elastic Container Service (ECS)
- (TODO)AWS Elastic Cache (EC) for Caching instead of Redis

### Cloud - Service Structure on AWS for Kubernetes

- (TODO) AWS Elastic Container Service for Kubernetes (EKS)

### Cloud - Service Structure on Goolge Cloud for Kubernetes

- (TODO)Google Kubernetes Engine (GKE)

## History

- origin/initial-version: this is the first version which contains only front-end side code
- origin/basic: Add client and server to become full-stack project
- origin/basic-refractor-setpricerule: Checkout from origin/basic and refractor a huge amout of the front-end code that becomes componentization.
- origin/master: complete full-stack project with dev-ops pipeline.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## TODO

1. Check React performance with an idea provided by this [article](https://medium.com/@evenchange4/react-stack-%E9%96%8B%E7%99%BC%E9%AB%94%E9%A9%97%E8%88%87%E5%84%AA%E5%8C%96%E7%AD%96%E7%95%A5-b056da2fa0aa))

2. Check Node practice to match a [Node.js best practice guide](https://github.com/goldbergyoni/nodebestpractices)
