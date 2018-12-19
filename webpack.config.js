const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: ["@babel/polyfill", "./frontend/entry.jsx"],
  output: {
    path: path.resolve(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js"
  },
  // plugins: plugins,
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
    publicPath: '/public', port: 8080
  },
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
