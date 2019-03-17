
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: ["@babel/polyfill", "./frontend/entry.jsx"],
  output: {
     path: path.resolve(__dirname, 'dist'),
     filename: 'bundle.js'
   },
   target: 'web', // update from 23.12.2018
   // externals: [nodeExternals()],
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'style.scss'
    // }),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      // template: "./public/index.html",
      // // favicon: "./public/favicon.ico"
      // inject: false,
      // hash: true,
      template: './public/index.html',
      // filename: 'index.html'
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
       use: ExtractTextPlugin.extract({
         fallback: "style-loader",
         use: "css-loader!sass-loader",
       })
     },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     "style-loader",
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'sass-loader'
      //   ]
      // },
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
  devServer: {
    port: 3000,
    open: true,
    proxy: {
        "/api": "http://localhost:8080"
    }
  },
  resolve: {
       extensions: ['.js', '.jsx', '.css', '.scss'],
       // modulesDirectories: [
       //   'node_modules'
       // ]
   }
};
