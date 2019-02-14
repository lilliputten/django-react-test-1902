/* eslint-disable no-console */
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const path = require('path');
// const rootPath = process.cwd();
const rootPath = path.dirname(__dirname);
const bundlesPath = path.resolve(path.join(rootPath, 'react/build/bundles'));
const bundlesInfoModule = path.resolve(path.join(rootPath, 'react/build/bundles.json'));
const bundles = require(bundlesInfoModule);
const chunks = bundles && bundles.chunks;
const loadChunks = [
  'vendor',
  'common',
  'About',
  // 'django-render',
  // 'test',
];
// Gather module files...
const chunksToLoad = [];
loadChunks.map((name) => {
  const chunkModules = chunks && chunks[name];
  // TODO? Throw error if no chunk found?
  Array.isArray(chunkModules) && chunkModules.map((module) => {
    const name = module && module.name;
    if (name && name.endsWith('.js') /* && !name.endsWith('.map') */) {
      chunksToLoad.push(name);
    }
  });
});
console.log('test-bundles: chunksToLoad:', chunksToLoad.join(', '));
// debugger;
// Global mocks...
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
const __global = typeof global !== 'undefined' ? global : typeof module !== 'undefined' ? module : typeof window !== 'undefined' ? window : this;
__global.window = dom.window;
__global.document = dom.window.document;
console.log('test-bundles: Require all chunks...');
// debugger;
// Require all chunks...
Array.isArray(chunksToLoad) && chunksToLoad.map((name) => {
  const file = path.join(bundlesPath, name);
  require(file);
});
// // Require render module...
// debugger;
setTimeout(() => {
  const file = path.join(bundlesPath, 'django-render');
  require(file);
}, 1000);
console.log('test-bundles: Render done');
debugger;
