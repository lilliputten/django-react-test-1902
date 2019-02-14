/* eslint-disable no-console */
const path = require('path');
const rootPath = process.cwd();
const bundlesPath = path.resolve(path.join(rootPath, 'react/build/bundles'));
const bundlesInfoModule = path.resolve(path.join(rootPath, 'react/build/bundles.json'));
const bundles = require(bundlesInfoModule);
const chunks = bundles && bundles.chunks;
const loadChunks = [
  'vendor',
  'common',
  'django-render',
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
console.log('chunksToLoad:', chunksToLoad.join(', '));
// debugger;
// Global mocks...
const __global = typeof global !== 'undefined' ? global : typeof module !== 'undefined' ? module : typeof window !== 'undefined' ? window : this;
__global.window = {};
// console.log('global object:', __global);
// debugger;
// Require all chunks...
Array.isArray(chunksToLoad) && chunksToLoad.map((name) => {
  const file = path.join(bundlesPath, name);
  require(file);
});
console.log('Render done');
debugger;
