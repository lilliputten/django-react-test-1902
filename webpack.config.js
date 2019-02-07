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

const bundlesPath = path.resolve('./bundles');

module.exports = {

  context: __dirname,

  entry: './src/index',

  devtool: 'cheap-module-source-map',

  output: {
      path: bundlesPath,
      filename: '[name]-[hash:8].js',
      sourceMapFilename: '[file].map',
  },

  plugins: [
    // new webpack.SourceMapDevToolPlugin({
    //   test: ['.js', '.jsx', '.mjs', '.css'],
    //   moduleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]',
    // }),
    new CleanWebpackPlugin(
      [
        path.join(bundlesPath, '**/*'),
      ],
      {
        exclude: ['.gitkeep'],
        verbose: true,
        beforeEmit: true,
        // dry: false,
      }
    ),
    new HtmlWebPackPlugin({
      inject: true,
      template: './src/index.html',
      // filename: './index.html',
    }),
    new BundleTracker({
      filename: './webpack-stats.json',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // cacheable: true,
        query: {
            retainLines: true,
            cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          // require.resolve('extract-loader'), // ???
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: true,
              // modules: true,
              localIdentName: '[name]-[local]-[hash:base64]',
            },
          },
        ],
      },
      // postcss
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
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 8080,
  },

};
