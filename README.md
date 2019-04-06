# BC_price_center

 
## Client Stage
run webpack with  `webpack.config.dev.js`
```bash
# Mock.js as API sever
npm run start:jsonserver
# API DOC as API server
npm run start:dev
# stage as API server
npm run start:stage
```

## Client Production
run webpack with `webpack.config.prod.js`
```bash
# API DOC as API server
npm run build:dev
# stage as API server
npm run build:stage
# production as API server
npm run build:prod
```