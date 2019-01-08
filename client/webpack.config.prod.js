import merge from "webpack-merge";
import webpack from "webpack";
import stringify from 'stringify-object-values'

import UglifyJSPlugin from "uglifyjs-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackAssetsManifest from "webpack-assets-manifest";

import commonConfig from "./webpack.config.common.js";
import env from "./webpack.env";
import { paths } from "./webpack.const";

const publicConfig = {
  mode: 'production',
  entry: {
    index: [ paths.appJs ],
    vendor: ["react", "react-dom", "react-redux", "redux", "react-router-dom", "lodash"]
  },
  output: {
    path: paths.buildDir,
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].js'
  },  
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]-[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["build/*.*"]),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin(stringify(env.variables)),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css',
      chunkFilename: 'static/css/[name].[hash].css',
      allChunks: true
    }),
    new WebpackAssetsManifest()
  ]
};

export default merge(commonConfig, publicConfig);
