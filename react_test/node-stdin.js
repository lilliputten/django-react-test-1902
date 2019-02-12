/* eslint-env node, es6 */
/* eslint-disable no-console */

process.stdin.on('data', processLine);

function processLine (line) {
  console.log('STDIN: ' + line);
}
