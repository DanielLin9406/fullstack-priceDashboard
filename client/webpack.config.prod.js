const merge = require("webpack-merge");
const webpack = require("webpack");
const env = process.env.NODE_ENV || "production";

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");

const commonConfig = require("./webpack.config.common.js");
const variables = require("./webpack.variables");

const publicConfig = {
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
    new webpack.DefinePlugin(variables[env]),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[name].[hash].css",
      allChunks: true
    }),
    new WebpackAssetsManifest()
  ]
};

module.exports = merge(commonConfig, publicConfig);
