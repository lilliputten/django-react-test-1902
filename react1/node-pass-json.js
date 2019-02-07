/* eslint-env node, es6 */
/* eslint-disable no-console */

process.stdin.on('data', processLine);

function processLine (json) {
  console.log('STDIN: ' + json);
  const data = JSON.parse(json);
  console.log('Parsed data:', data);
}
