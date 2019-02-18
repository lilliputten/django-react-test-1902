/* eslint-disable no-console */
/**
 * @module render
 * @since 2019.02.19, 02:42
 * @version 2019.02.19, 02:42
 *
 * Console parameters:
 *  --all-chunks: Load all bundles chunks (specified in `~/react/build/bundles.json`
 *  --console-debug: Print debug info in console (normally only production content must be in output)
 *
 * TODO:
 * - https://github.com/jamiebuilds/react-loadable#------------server-side-rendering
 */

// Fetch console parameters:
// TODO 2019.02.19, 02:22 -- Specify parameter in configuration? Depends on DEBUG state? Make meged chunk dynamically?
const allChunks = process.argv.indexOf('--all-chunks') !== -1;
// Debug output in console (only for debugging -- in production real page content only must be at output)
const consoleDebug = process.argv.indexOf('--console-debug') !== -1;

const path = require('path');
const fs = require('fs');
const rootPath = path.dirname(__dirname);
const bundlesPath = path.resolve(path.join(rootPath, 'react/build/bundles'));

const mergedChunk = 'merged.js';

/** {String[]} loadChunks ** {{{ Chunks list to load if not specified `allChunks`
 */
const loadChunks = [
  'vendor',
  'common',
  'About',
  'Home',
  'Contacts',
  'django-render',
];/*}}}*/

// Prepare fake DOM etc...
prepareEnvironment();

// Get single merged chunk or chunk series for `loadChunks` list
const chunksToLoad = allChunks ? getChunksFromBundlesInfo() : [ mergedChunk ];

// Load all (or one merged) chunks
requireAllChunks(chunksToLoad);

// Subroutines...

/** getChunksFromBundlesInfo ** {{{
 * @return {String[]}
 */
function getChunksFromBundlesInfo() {
  const bundlesInfoModule = path.resolve(path.join(rootPath, 'react/build/bundles.json'));
  const bundles = require(bundlesInfoModule);
  const chunks = bundles && bundles.chunks;

  // const loadable = require('react-loadable');

  // Gather module files...
  const chunksToLoad = [];
  loadChunks.map((name) => {
    let chunkModules = chunks && chunks[name];
    // TODO 2019.02.15, 03:41 -- (`test-bundles` chunks loader) Throw error if no chunk found?
    // Simple module name?
    if (!Array.isArray(chunkModules)) {
      chunksToLoad.push(name + '.js');
    }
    // Module from bundles?
    else {
      chunkModules.map((module) => {
        const name = module && module.name;
        if (name && name.endsWith('.js') /* && !name.endsWith('.map') */) {
          chunksToLoad.push(name);
        }
      });
    }
  });

  return chunksToLoad;
}/*}}}*/

/** prepareEnvironment ** {{{
 * TODO 2019.02.15, 03:37 -- Suppress css and resource loading on server-side render!
 */
function prepareEnvironment() {

  const jsdom = require('jsdom');

  // Create fake DOM
  const dom = new jsdom.JSDOM();

  // Mock global window, document etc...
  const __global = typeof global !== 'undefined' ? global : typeof module !== 'undefined' ? module : typeof window !== 'undefined' ? window : this;
  __global.window = dom.window;
  __global.document = dom.window.document;

}/*}}}*/

/** requireAllChunks ** {{{ Require all chunks...
 * @param {String[]} chunksToLoad
 */
function requireAllChunks(chunksToLoad) {

  if (consoleDebug) {
    console.log('Chunks to load:', chunksToLoad.join(', '));
  }

  Array.isArray(chunksToLoad) && chunksToLoad.map((name) => {
    const file = path.join(bundlesPath, name);
    const isExist = fs.existsSync(file);
    if (consoleDebug) {
      const existStr = isExist ? 'exist, requiring' : 'absent!';
      console.log('Chunk file', file, '=>', existStr);
    }
    if (isExist /* || !skipChunkIfAbsent */) {
      require(file);
    }
  });

}/*}}}*/

