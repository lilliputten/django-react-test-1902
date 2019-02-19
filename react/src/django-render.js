/* eslint-disable no-console */
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import loadable from 'react-loadable';

import App from './components/layout/App/App';

const __global = typeof global !== 'undefined' ? global : typeof module !== 'undefined' ? module : typeof window !== 'undefined' ? window : this;
const context = __global.stdinData;
// console.log('XXX django-render context', context); // DEBUG!

// {{{ DEBUG: Sample context
// const context = {
//   props: {
//     users: [
//       { username: 'alice' },
//       { username: 'bob' },
//     ]
//   },
//   component: 'index.js',
//   location: {
//     path: '/About/',
//     host: 'localhost:8000',
//     uri: 'http://localhost:8000/About/',
//   },
//   title: '[Debug: ReactApp]',
// };
// }}}

// On all chunks load finished...
const preloadAll = loadable.preloadAll();
preloadAll.then(() => {
  const url = context.location.path;
  // Render after all async chunks loaded!
  const element = (
    <StaticRouter location={url} context={context}>
      <App mode="default"/>
    </StaticRouter>
  );
  const content = ReactDOMServer.renderToString(element);
  const state = { test: Date.now() };
  const result = {
    content,
    state,
  };
  // Print output for django server
  console.log(JSON.stringify(result));
});
