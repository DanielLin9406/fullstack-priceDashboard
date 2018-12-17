const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const env = process.env.NODE_ENV || "development";

const commonConfig = require("./webpack.config.common.js");
const variables = require("./webpack.variables");

const devConfig = {
  devtool: "inline-source-map",
  entry: {
    index: ["react-hot-loader/patch", path.join(__dirname, "src/index.js")]
  },
  output: {
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]"
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
      },{
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
            }
          },          
        ]
      }
    ]
  },
  plugins: [new webpack.DefinePlugin(variables[env])],
  devServer: {
    port: 8080,
    // contentBase: path.join(__dirname, './build'),
    historyApiFallback: true,
    host: "0.0.0.0",
    hot:true,
    proxy: {
      "/promo4": "http://localhost:8090"
    }
  }
};
module.exports = merge({
  customizeArray(a, b, key) {
    if (key === "entry.index") {
      return b;
    } else {
      return undefined;
    }
  }
})(commonConfig, devConfig);
