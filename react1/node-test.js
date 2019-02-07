/* eslint-env node, es6 */
/* eslint-disable no-console */

const x = 'ES6 Ok';
console.log('node-test result', x);
setTimeout(() => {
  console.log('Timeout callback ok');
}, 1000);
