const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./frontend/entry.jsx",
  output: {
    path: path.resolve(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js"
  },
  // plugins: plugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      }
    ]
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    publicPath: '/public', port: 8080
  },
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
