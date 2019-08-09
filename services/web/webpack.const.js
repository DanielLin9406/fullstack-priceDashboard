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
  API_HOST: {
    prod: '',
    stage: 'http://localhost:7000/',
    jsonserver: 'http://localhost',
    dev: 'http://localhost'
  },
  API_PORT: {
    prod: {
      promotions: null,
      price: null,
      upgradeRule: null
    },
    stage: {
      promotions: null,
      price: null,
      upgradeRule: null
    },
    jsonserver: {
      promotions: '8095',
      price: '8095',
      upgradeRule: '8095'
    },
    dev: {
      promotions: '5001/v1',
      price: '5000/v1',
      upgradeRule: '5002/v1'
    }
  }
};
