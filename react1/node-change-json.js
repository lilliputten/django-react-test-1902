/* eslint-env node, es6 */
/* eslint-disable no-console */

process.stdin.on('data', processLine);

function processLine (sourceJson) {
  const data = JSON.parse(sourceJson);
  data.date = String(new Date());
  console.log(JSON.stringify(data));
}
