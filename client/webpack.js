require('@babel/register')
let webpackConfig = '';
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'jsonServer'){
  webpackConfig = './webpack.config.dev';
} else {
  webpackConfig = './webpack.config.prod';
}

module.exports = require(webpackConfig)