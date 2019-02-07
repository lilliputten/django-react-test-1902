/* eslint-env node, es6 */
/* eslint-disable no-console */
/**
 * @module webpack.config
 * @see https://webpack.js.org/configuration/
 * @since 2019.02.07, 22:56
 * @version 2019.02.07, 22:56
 */

const path = require('path');

// const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractCssPlugin = require('mini-css-extract-plugin');

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

  resolve: {
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

  /*{{{*/module: {
    rules: [
      /*{{{ jsx */{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // cacheable: true,
        query: {
            retainLines: true,
            cacheDirectory: true,
        },
      },/*}}}*/
      /*{{{ css */{
        test: /\.css$/,
        // loader: 'css-loader!csso-loader',
        use: [
          ExtractCssPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
                require('postcss-csso'),
              ],
            },
          },
        ],
      },/*}}}*/
    ],
  },/*}}}*/

  /*{{{*/plugins: [
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
    new ExtractCssPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
  ],/*}}}*/

};
