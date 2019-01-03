import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import env from './webpack.env';
// import { path }  from "./webpack.const.js";

const babelOptions = {
  presets: [
    [
      "@babel/preset-env",{
        "modules": false,
      }
    ],
    "@babel/preset-react"
  ],
  plugins:[
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-transform-runtime",
    "react-hot-loader/babel"
  ],
  cacheDirectory: true
}

const commonConfig = {
  entry: {
    index: [path.join(__dirname, 'src/index.js')],
    vendor: ["react", "react-dom", "react-redux", "redux", "react-router-dom", "lodash"]
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
            options: babelOptions
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
              pretty: env.isDev
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
      template: path.join(__dirname, "src/assets/template/index.html")
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

export default commonConfig;
