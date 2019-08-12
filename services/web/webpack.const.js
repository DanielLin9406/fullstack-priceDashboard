import path from 'path';

const rootDir = path.join(__dirname, './');

export default {
  rootDir,
  srcDir: path.join(rootDir, 'src'),
  apiDir: path.join(rootDir, 'src/api'),
  appJs: path.join(rootDir, 'src/index.js'),
  sharedDir: path.join(rootDir, 'src/shared'),
  assetsDir: path.join(rootDir, 'src/assets'),
  imageDir: path.join(rootDir, 'src/assets/image'),
  publicDir: path.join(rootDir, 'src/assets/public'),
  componentsDir: path.join(rootDir, 'src/app/components'),
  constDir: path.join(rootDir, 'src/app/const'),
  pagesDir: path.join(rootDir, 'src/app/pages'),
  layoutDir: path.join(rootDir, 'src/app/layout'),
  routesDir: path.join(rootDir, 'src/app/routes'),
  dumpDir: path.join(rootDir, 'src/app/dump'),
  modulesDir: path.join(rootDir, 'src/modules'),
  nodeModulesDir: path.join(rootDir, 'node_modules'),
  buildDir: path.join(rootDir, 'build'),
  appHtml: path.join(rootDir, 'src/assets/templates/index.html'),
  servedUrl: '/',
  webpackVisualizerHtml: 'report/webpack-visualizer.html',
  API_VER: {
    prod: {
      promotions: '',
      prices: '',
      upgradeRules: ''
    },
    stage: {
      promotions: '',
      prices: '',
      upgradeRules: ''
    },
    jsonserver: {
      promotions: '',
      prices: '',
      upgradeRules: ''
    },
    dev: {
      promotions: process.env.API_VER_PROMOTIONS,
      prices: process.env.API_VER_PRICES,
      upgradeRules: process.env.API_VER_UPGRADERULES
    }
  },
  API_HOST: {
    prod: {
      promotions: '',
      prices: '',
      upgradeRules: ''
    },
    stage: {
      promotions: 'http://localhost:7000/',
      prices: 'http://localhost:7000/',
      upgradeRules: 'http://localhost:7000/'
    },
    jsonserver: {
      promotions: 'http://localhost',
      prices: 'http://localhost',
      upgradeRules: 'http://localhost'
    },
    dev: {
      promotions: process.env.API_HOST_PROMOTIONS,
      prices: process.env.API_HOST_PRICES,
      upgradeRules: process.env.API_HOST_UPGRADERULES
    }
  },
  API_PORT: {
    prod: {
      promotions: '',
      prices: '',
      upgradeRules: ''
    },
    stage: {
      promotions: '',
      prices: '',
      upgradeRules: ''
    },
    jsonserver: {
      promotions: '8095',
      prices: '8095',
      upgradeRules: '8095'
    },
    dev: {
      promotions: process.env.API_PORT_PROMOTIONS,
      prices: process.env.API_PORT_PRICES,
      upgradeRules: process.env.API_PORT_UPGRADERULES
    }
  }
};
