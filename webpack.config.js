/* eslint-env node, es6 */
/* eslint-disable no-console */
/**
 * @module webpack.config
 * @see https://webpack.js.org/configuration/
 * @since 2019.02.07, 22:56
 * @version 2019.02.09, 02:52
 */

module.exports = (env, argv) => {

  // console.log('ARGV', argv);

  const isDevServer = !!argv.host; // (argv.mode === 'none'); // (none = server) // Alternate method: !!argv.host;
  const isWatch = !!argv.watch;
  const isDev = (/* isDevServer || */ argv.mode === 'development');
  const isProd = !isDev;
  const useDevTool = true && (isDevServer || isDevServer);
  const debugModes = [
    isDevServer && 'DevServer',
    isWatch && 'Watch',
    isDev && 'Development',
    isProd && 'Production',
    useDevTool && 'DevTool',
  ].filter(x => x).join(', ');
  console.log('Running modes:', debugModes);


  const path = require('path');

  // https://webpack.js.org/plugins/internal-plugins/
  // const webpack = require('webpack');
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  const HtmlWebPackPlugin = require('html-webpack-plugin');
  const BundleTracker = require('webpack-bundle-tracker');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const ExtractCssPlugin = require('mini-css-extract-plugin');
  const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
  // const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

  // const rootPath = path.resolve('./');
  const appBase = path.resolve('./react');
  const buildPath = path.resolve('./react/build');
  const bundlesPath = path.resolve('./react/build/bundles');
  const srcPath = path.resolve('./react/src');

  const localHtmlFilename = 'local-server-index.html';
  const localHtmlTemplate = './react/src/' + localHtmlFilename;

    /** postcssPlugins ** {{{ */
  const postcssPlugins = [
      // Necessary for external CSS imports to work
      // https://github.com/facebookincubator/create-react-app/issues/2677
      require('postcss-flexbugs-fixes'),
      require('postcss-import'),
      require('postcss-mixins')({
        mixinsDir: path.join(srcPath, 'components', '!mixins'),
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

  const useHashes = true;
  const bundleName = (ext) => '[name]' + (useHashes && !isWatch && !isDevServer ? '-[contenthash:8]' : '') + ext;

  const entry = {};
  if (isDevServer) {
    entry['local-server'] = './react/src/local-server';
  }
  else {
    entry['django-render'] = './react/src/django-render';
  }

  return {

    context: __dirname,

    entry,

    // NOTE: Sourcemaps in dev-tools mode...
    devtool: useDevTool && 'cheap-module-source-map',

    /*{{{*/resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'app'),
      ],
      // TODO: Add '.ts', '.tsx'?
      extensions: ['.js', '.json', '.jsx', '.css', '.pcss'],
    },/*}}}*/

    /*{{{*/output: {
        path: bundlesPath,
        filename: bundleName('.js'),
    },/*}}}*/

    /*{{{*/devServer: {
      // @see:
      // - [Multiple Entry Points · Issue #141 · gaearon/react-hot-loader](https://github.com/gaearon/react-hot-loader/issues/141)
      contentBase: appBase,
      index: localHtmlFilename,
      watchContentBase: true,
      historyApiFallback: {
        index: '/' + localHtmlFilename,
      },
      compress: true,
      port: 8080,
      // /*{{{*/before(app) {
      //   // app.use(errorOverlayMiddleware());
      //   // app.use(noopServiceWorkerMiddleware());
      //
      //   // // Fake response demo:
      //   // app.get('/site/fake.json', function(req, res) {
      //   //   res.json({ fake: 'response' });
      //   // });
      //
      //   // Serve raw files:
      //   const fs = require('fs');
      //   app.get('/static/*', function(req, res) {
      //     let file = String(req.path).substr(1); // strip leading slash
      //     file = path.join(rootPath, file);
      //     console.log('XXX', file);
      //     let buf = fs.readFileSync(file);
      //     // Return binary content:
      //     res.end(buf, 'binary'); // 'utf-8'));
      //     // Alt: return text content:
      //     // res.send(buf && buf.toString()); // 'utf-8'));
      //   });
      //
      // },/*}}}*/
    },/*}}}*/

    /*{{{*/module: {
      rules: [
        /*{{{ jsx */{
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          // options: {
          // },
          // cacheable: true,
          options: {
            // sourceRoot: '/', // srcPath, // './react/src',
            retainLines: true,
            cacheDirectory: true,
          },
        },/*}}}*/
        /*{{{ css */{
          test: /\.(pcss|css)$/,
          // loader: 'css-loader!csso-loader',
          use: [
            // TODO: No css reloads?
            // {
            //   // loader: require.resolve('css-hot-loader'),
            //   loader: require.resolve('webpack-extract-css-hot-reload'),
            //   options: {
            //     // reloadAll: true,
            //     cssModule: true,
            //   },
            // },
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
      // // Pass macro substitutions?
      // new webpack.DefinePlugin({
      //   'process.env': {
      //     testVar: JSON.stringify('test'), // ???
      //     // NODE_ENV: JSON.stringify('development'), // Automatically passed by webpack
      //   }
      // }),
      !isDevServer && new CleanWebpackPlugin(
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
      /* isDev && */ new HtmlWebPackPlugin({
        inject: true,
        template: localHtmlTemplate,
        filename: localHtmlFilename,
        excludeChunks: [
          'django-render',
          'test',
        ],
      }),
      new ExtractCssPlugin({
        filename: bundleName('.css'),
      }),
      !isDevServer && new BundleTracker({
        filename: path.join(buildPath, 'bundles.json'),
      }),
      new AsyncChunkNames(),
    ].filter(x => x),/*}}}*/

    /*{{{*/optimization: {
      minimizer: [
        new UglifyJsPlugin({
          test: /\.js(\?.*)?$/i,
          sourceMap: true,
          // https://github.com/webpack-contrib/uglifyjs-webpack-plugin#uglifyoptions
          uglifyOptions: {
            // https://github.com/mishoo/UglifyJS2#compressor-options%23compressor-options
            compress: {
              drop_debugger: false,
            },
          },
        }),
      ],
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
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          common: {
            name: 'common',
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

};
