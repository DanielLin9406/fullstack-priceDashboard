# Price Dashboard for Positive Grid

This project as internal tool for the company is desinged for setting and showing product price.

![preview](https://i.imgur.com/GQTiwCh.png)

## Installation

### Prerequisite

#### Client

```bash
/client/.env
GOOGLE_CLIENT_ID=

```

#### Server

TODO

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

### Client

- Webpack 4
- Babel 7
- React 16 with render props, compount pattern
- Redux with Module pattern
- Redux-thunk
- React-Router 4
- React Hot loader
- React-Loadable for async loading page
- Husky
- Lint-stage
- ESlint
- Prettier
- Json-server
- Secret data handler: dotenv

### Server

TODO

## Enviorment

- Node v10.16
- npm v6.9

## Client File Structure

- page, route, layout as components

```bash
├── api
│   ├── google
│   └── pg
├── app
│   ├── components
│   │   ├── AddPromotion
│   │   ├── Calendar
│   │   ├── CurrentPrice
│   │   ├── CurrentPromotion
│   │   ├── EditPromotion
│   │   ├── QueuePromo
│   │   ├── SetPriceRule
│   │   └── UserSection
│   ├── const
│   ├── dump
│   ├── layout
│   │   ├── helmet
│   │   └── oneCol
│   ├── pages
│   │   ├── Dashboard
│   │   └── Login
│   └── routes
│       ├── AuthedRoute
│       ├── BaseRoute
│       ├── RouteUnit
│       └── UnAuthedRoute
├── assets
│   ├── image
│   ├── public
│   └── templates
├── modules
│   ├── auth
│   ├── currentBCPrice
│   ├── licenseRule
│   └── scheduledPrice
└── shared

```

## License

[MIT](https://choosealicense.com/licenses/mit/)
