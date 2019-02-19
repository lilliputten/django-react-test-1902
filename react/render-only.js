/* eslint-disable no-console */
/**
 * @module render-only
 * @since 2019.02.19, 02:42
 * @version 2019.02.19, 04:05
 *
 * Console parameters:
 *  --console-debug: Print debug info in console (normally only production content must be in output)
 *
 */

// Prepare fake DOM etc...
prepareEnvironment();

// Subroutines...

/** getStdinContents ** {{{
 */
function getStdinContents() {

  var fs = require('fs');

  // process.stdin.resume(); // ???

  // Create buffer
  var BUFSIZE = 1024;
  var buf = Buffer.alloc(BUFSIZE);

  // Read contents...
  var bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE);
  var stdinContents = buf.toString('utf-8', 0, bytesRead);

  // process.stdin.pause(); // ???

  return stdinContents;
}/*}}}*/

/** prepareEnvironment ** {{{
 * TODO 2019.02.15, 03:37 -- Suppress css and resource loading on server-side render!
 */
function prepareEnvironment() {

  var jsdom = require('jsdom');

  // Create fake DOM
  var dom = new jsdom.JSDOM();

  // Mock global window, document etc...
  var __global = typeof global !== 'undefined' ? global : typeof module !== 'undefined' ? module : typeof window !== 'undefined' ? window : this;
  __global.window = dom.window;
  __global.document = dom.window.document;

  // Debug output in console (only for debugging -- in production real page content only must be at output)
  var consoleDebug = process.argv.indexOf('--console-debug') !== -1;

  // Get passed data...
  __global.stdinContents = getStdinContents();
  if (consoleDebug) {
    console.log('stdinContents:', __global.stdinContents);
  }
  __global.stdinData = JSON.parse(__global.stdinContents);
  if (consoleDebug) {
    console.log('stdinData:', __global.stdinData);
  }

}/*}}}*/
