/* eslint-env node, es6 */
/* eslint-disable no-console */
/**
 * @module webpack.config
 * @see https://webpack.js.org/configuration/
 * @since 2019.02.07, 22:56
 * @version 2019.02.09, 02:52
 */

const path = require('path');

// const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractCssPlugin = require('mini-css-extract-plugin');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const buildPath = path.resolve('./react-build');
// const srcPath = path.resolve('./react-src');

  /** postcssPlugins ** {{{ */
const postcssPlugins = [
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    require('postcss-flexbugs-fixes'),
    require('postcss-import'),
    require('postcss-mixins')({
      // mixinsDir: path.join(srcPath, 'components', '!mixins'),
    }), // https://github.com/postcss/postcss-mixins
    // require('postcss-random'), // https://www.npmjs.com/package/postcss-random
    // require('postcss-each'),
    // require('postcss-for'),
    // require('postcss-define-function'), // https://github.com/titancat/postcss-define-function
    require('postcss-advanced-variables')({ // https://github.com/jonathantneal/postcss-advanced-variables
      // unresolved: 'warn', // 'ignore',
      // variables: configCss,
    }),
    require('postcss-simple-vars'), // https://github.com/postcss/postcss-simple-vars
    // require('postcss-conditionals'), // Already used (scss?)
    require('postcss-color-function'), // https://github.com/postcss/postcss-color-function
    require('postcss-calc')(),
    require('postcss-nested-ancestors'), // https://github.com/toomuchdesign/postcss-nested-ancestors
    require('postcss-nested'),
    // require('postcss-current-selector'),
    // require('rebem-css'),
    require('postcss-url')({ url: 'rebase' }),
    // require('postcss-reporter')(),
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
    require('postcss-reporter'),
  ];/*}}}*/

module.exports = {

  context: __dirname,

  entry: {
    App: './react-src/index',
    // main: './react-src/main',
  },

  // NOTE: Sourcemaps in dev-tools mode...
  devtool: 'cheap-module-source-map',

  /*{{{*/resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app'),
    ],
    // TODO: Add '.ts', '.tsx'?
    extensions: ['.js', '.json', '.jsx', '.css', '.pcss'],
  },/*}}}*/

  /*{{{*/output: {
      path: buildPath,
      filename: '[name]-[hash:8].js',
      // chunkFilename: '[name].js',
      // sourceMapFilename: '[file].map',
  },/*}}}*/

  /*{{{*/devServer: {
    contentBase: path.join(__dirname, 'react-src'),
    historyApiFallback: true,
    compress: true,
    port: 8080,
  },/*}}}*/

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
        test: /\.(pcss|css)$/,
        // loader: 'css-loader!csso-loader',
        use: [
          {
            loader: require.resolve('css-hot-loader'),
            options: {
              // reloadAll: true,
              cssModule: true,
            },
          },
          ExtractCssPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              // importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              parser: require('postcss-scss'),
              plugins: () => postcssPlugins,
            },
          },
        ],
      },/*}}}*/
    ],
  },/*}}}*/

  /*{{{*/plugins: [
    // new webpack.DefinePlugin({
    //   // Macro substitutions?
    //   'process.env': {
    //     testVar: JSON.stringify('test'), // ???
    //     // NODE_ENV: JSON.stringify('development'), // Automatically passed by webpack
    //   }
    // }),
    new CleanWebpackPlugin(
      [
        path.join(buildPath, '**/*'),
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
      template: './react-src/local-public/index.html',
    }),
    new BundleTracker({
      filename: path.join(buildPath, 'webpack-tracker.json'),
    }),
    new ExtractCssPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
    // new BundleAnalyzerPlugin({
    //   // see: https://github.com/webpack-contrib/webpack-bundle-analyzer
    //   analyzerMode: 'static',
    //   openAnalyzer: false,
    //   reportFilename: 'stats.html',
    //   generateStatsFile: true,
    //   statsOptions: {
    //     // see: https://webpack.js.org/configuration/stats/
    //     // hash: false,
    //     source: false,
    //   },
    // }),
    new AsyncChunkNames(),
  ],/*}}}*/

  /*{{{*/optimization: {
    splitChunks: {
      cacheGroups: {
        // chunks: 'all',
        // minSize: 0,
        // maxSize: 0,
        // minChunks: 1,
        // maxAsyncRequests: 5,
        // maxInitialRequests: 3,
        // automaticNameDelimiter: '-',
        // name: true,
        default: false,
        vendors: false,
        // vendor chunk
        vendor: {
          // name of the chunk
          name: 'Vendor',
          // async + async chunks
          chunks: 'all',
          // import file path containing node_modules
          test: /node_modules/,
          // priority
          priority: 20,
        },
        // common chunk
        common: {
          name: 'Common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },/*}}}*/

};
