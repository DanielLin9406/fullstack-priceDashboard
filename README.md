# Price Dashboard

[![Build Status](https://travis-ci.org/DanielLin9406/fullstack-priceDashboard.svg?branch=master)](https://travis-ci.org/DanielLin9406/fullstack-priceDashboard)

This project as internal tool for the company is desinged for setting and showing product price.

Set a new promotion and view a particular promotion.
![preview1](https://i.imgur.com/6rcwR3Y.png)

Details price in terms of different user
![preview2](https://i.imgur.com/MmvQmTv.png)

## Installation

### Prerequisite

- Node v10.16
- npm v6.9

#### Web

```bash
/client/.env
GOOGLE_CLIENT_ID=<client id>
```

#### Prices,Promotions,Upgrade-Rules,User

```bash
PORT=<Number>
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

### General

Install Client Dependence

```bash
cd ./client
npm i
```

Run Dev

```bash
cd ./client

# Mock.js as API sever
npm run start:jsonserver
# API DOC as API server
npm run start:dev
# stage as API server
npm run start:stage

```

Build Production
cd ./client

```bash
# API DOC as API server
npm run build:dev
# stage as API server
npm run build:stage
# production as API server
npm run build:prod
```

## TechStacks

### Web SPA

- Webpack 4 custom scaffold
- Babel 7
- React 16 with render props, compound pattern
- Redux with Module pattern
- Redux-thunk
- React-Router 4
- React Hot loader
- React-Loadable for async loading page
- Redux with module pattern
- Husky
- Lint-stage
- ESlint
- Prettier
- Json-server
- Sensitive data handler: dotenv

### Promotions, Price, Upgrade-Rules, User

- Babel node for compiling ES6 syntax
- Express.js
- Restful API
- Mongoose
- MongoDB Altas
- Redis for DB caching
- Sensitive data handler: dotenv
- (TODO)WebSocket
- (TODO)JWT for API authorization between services

### Dev-Ops

- Docker
- Docker-compose
- Nginx as reverse-proxy
- Nginx as static file server in production
- Bash 5 for development
- Travis plays CI role

### Cloud

- AWS Elastic Beanstalk (EB)
- AWS Elastic Container Service (ECS)
- AWS Elastic Cache (EC) for Caching instead of Redis

### Service Structure on AWS baesd on docker

### Service Structure on Goolge Cloud based on K8S

## License

[MIT](https://choosealicense.com/licenses/mit/)
