/* eslint-env node, es6 */
/* eslint-disable no-console */
/**
 * @module webpack.config
 * @see https://webpack.js.org/configuration/
 * @since 2019.02.07, 22:56
 * @version 2019.02.07, 22:56
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const bundlesPath = path.resolve('./assets/bundles');

module.exports = {

  context: __dirname,

  entry: './assets/js/index', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

  output: {
      path: bundlesPath,
      filename: '[name]-[hash].js',
  },

  plugins: [
    new CleanWebpackPlugin([bundlesPath]),
    new HtmlWebPackPlugin({
      inject: true,
      template: './assets/index.html',
      // filename: './index.html',
    }),
    new BundleTracker({ filename: './webpack-stats.json' }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    // modulesDirectories: [ 'node_modules' ],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app'),
    ],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },

  devServer: {
    contentBase: path.join(__dirname, 'assets'),
    compress: true,
    port: 8080,
  },

};
