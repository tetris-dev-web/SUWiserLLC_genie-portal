
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: ["@babel/polyfill", "./frontend/entry.jsx"],
  output: {
     path: path.resolve(__dirname, 'dist'),
     filename: 'bundle.js'
   },
  plugins: [
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, "stylesheets"),
      filename: 'bundle.scss'
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    })
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[path][name]-[hash:8].[ext]'
                },
            },
        ]
      },
    ]
  },
  devtool: 'source-map',
  // devServer: {
  //   publicPath: '/public', port: 8080
  // },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
        "/api": "http://localhost:8080"
    }
},
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
