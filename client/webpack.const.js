import path from 'path';

const rootDir = path.join(__dirname, './');

export const paths = {
  rootDir,
  srcDir: path.join(rootDir, 'src'),
  appJs: path.join(rootDir, 'src/index.js'),
  apiDir: path.join(rootDir, 'src/api'),
  assetsDir: path.join(rootDir, 'src/assets'),
  publicDir: path.join(rootDir, 'src/assets/public'),
  appHtml: path.join(rootDir, 'src/assets/templates/index.html'),
  componentsDir: path.join(rootDir, 'src/app/components'),
  layoutDir: path.join(rootDir, 'src/app/layout'),
  pagesDir: path.join(rootDir, 'src/app/pages'),
  routesDir: path.join(rootDir, 'src/app/routes'),
  modulesDir: path.join(rootDir, 'src/app/modules'),
  sharedDir: path.join(rootDir, 'src/shared'),
  buildDir: path.join(rootDir, 'build'),
  nodeModulesDir: path.join(rootDir, 'node_modules'),
  servedUrl: '/',
  pgInternalApiUrl: 'https://intrapi.positivegrid.com',
  pgInternalStagingApiUrl: 'https://pg-beta-intrapi.herokuapp.com',
  pgInternalApiProxyUrl: '/pg-intrapi',
  webpackVisualizerHtml: 'report/webpack-visualizer.html'
}