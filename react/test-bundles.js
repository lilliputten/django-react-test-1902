/* eslint-disable no-console */

/**
 * TODO:
 * - https://github.com/jamiebuilds/react-loadable#------------server-side-rendering
 */

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const path = require('path');
// const rootPath = process.cwd();
const rootPath = path.dirname(__dirname);
const bundlesPath = path.resolve(path.join(rootPath, 'react/build/bundles'));
const bundlesInfoModule = path.resolve(path.join(rootPath, 'react/build/bundles.json'));
const bundles = require(bundlesInfoModule);
const chunks = bundles && bundles.chunks;

// const loadable = require('react-loadable');

const loadChunks = [
  'vendor',
  'common',
  'About',
  'Home',
  'Contacts',
  // TODO: Load all async chunks before render!
  'django-render',
  // 'test',
];

// Gather module files...
const chunksToLoad = [];
loadChunks.map((name) => {
  const chunkModules = chunks && chunks[name];
  // TODO 2019.02.15, 03:41 -- (`test-bundles` chunks loader) Throw error if no chunk found?
  Array.isArray(chunkModules) && chunkModules.map((module) => {
    const name = module && module.name;
    if (name && name.endsWith('.js') /* && !name.endsWith('.map') */) {
      chunksToLoad.push(name);
    }
  });
});

console.log('test-bundles: chunksToLoad:', chunksToLoad.join(', '));

// Mock global window, document etc...
const dom = new JSDOM();
// TODO 2019.02.15, 03:37 -- Suppress css and resource loading on server-side render!
const __global = typeof global !== 'undefined' ? global : typeof module !== 'undefined' ? module : typeof window !== 'undefined' ? window : this;
__global.window = dom.window;
__global.document = dom.window.document;

// Require all chunks...
console.log('test-bundles: Require all chunks...');
Array.isArray(chunksToLoad) && chunksToLoad.map((name) => {
  const file = path.join(bundlesPath, name);
  require(file);
});

