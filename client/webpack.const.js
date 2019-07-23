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
  API_URL: {
    apiDoc: 'http://localhost:7000/v2',
    jsonserver: 'http://localhost:8095'
  },
  webpackVisualizerHtml: 'report/webpack-visualizer.html'
};
