const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const env = process.env.NODE_ENV || "development";
const DEV_MODE = env === "development";

const commonConfig = {
  entry: {
    index: [path.join(__dirname, "src/index.js")],
    vendor: ["react", "react-dom", "react-redux", "redux", "react-router-dom"]
  },
  output: {
    path: path.join(__dirname, "./build"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
    // publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ],
        include: path.join(__dirname, "src")
      },
      {
        test: /\.(jpg|png|gif|JPG)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "./images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|ttc)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "./assets/fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader"
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: DEV_MODE
            }
          }
        ]
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: "json-loader"
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "./public/index.html")
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  resolve: {
    alias: {
      pages: path.join(__dirname, "src/pages"),
      components: path.join(__dirname, "src/components"),
      actions: path.join(__dirname, "src/actions"),
      reducers: path.join(__dirname, "src/reducers"),
      router: path.join(__dirname, "src/router"),
      mock: path.join(__dirname, "mock"),
      image: path.join(__dirname, "images"),
      bigCalendarStyle: path.join(__dirname, 'node_modules/react-big-calendar/lib/css/react-big-calendar.css'),
      dayPickerStyle: path.join(__dirname, 'node_modules/react-day-picker/lib/style.css')
    }
  }
};

module.exports = commonConfig;
