require('@babel/register')
let webpackConfig = '';
if (process.env.NODE_ENV === 'development'){
  webpackConfig = './webpack.config.dev';
} else {
  webpackConfig = './webpack.config.prod';
}

module.exports = require(webpackConfig)