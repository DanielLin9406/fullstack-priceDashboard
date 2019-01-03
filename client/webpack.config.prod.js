import merge from "webpack-merge";
import webpack from "webpack";

import UglifyJSPlugin from "uglifyjs-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackAssetsManifest from "webpack-assets-manifest";

import commonConfig from "./webpack.config.common.js";
import env from "./webpack.env";

const publicConfig = {
  mode: 'production',
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
    new webpack.DefinePlugin(env.variables),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[name].[hash].css",
      allChunks: true
    }),
    new WebpackAssetsManifest()
  ]
};

export default merge(commonConfig, publicConfig);
