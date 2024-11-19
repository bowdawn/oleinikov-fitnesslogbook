const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    filename: "bundle.[fullhash].js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/core/images/favicon.ico",
    }),
    new Dotenv({
      path: path.resolve(__dirname, ".env"),
      systemvars: true,
    }),
  ],
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: [".*",".js",".jsx",".tsx",".ts"],
    fallback: {
      util: false,
      fs: false,
      path: require.resolve("path-browserify"),
      os: false,
      crypto: false
    },
  },
  devServer: {
    historyApiFallback: {
      index: "/index.html", 
    },
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        use: "json-loader",
        type: "javascript/auto",
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif|jpeg|pdf|docx|webp)$/,
        exclude: /node_modules/,
        use: ["file-loader"],
      },

      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
};
