/* eslint-disable no-console */
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import loadable from 'react-loadable';

import App from './components/layout/App/App';

// DEBUG!
// TODO 2019.02.15, 03:35 -- Parse stdin for passed context (and pass it from django + generate default state)
const context = {
  props: {
    users: [
      { username: 'alice' },
      { username: 'bob' },
    ]
  },
  component: 'index.js',
  location: {
    path: '/About/',
    host: 'localhost:8000',
    uri: 'http://localhost:8000/About/',
  },
  title: '[ReactApp]',
};

// XXX 2019.02.15, 03:09 -- Preloading all modules (Where we need to do it?)
// (see `test-bundles.js:loadChunks`)
// const About = require('./components/pages/About/About');
// const Home = require('./components/pages/Home/Home');
// const Contacts = require('./components/pages/Contacts/Contacts');
// console.log(Home, About, Contacts);

const preloadAll = loadable.preloadAll();
// On all chunks load finished...
preloadAll.then(() => {
  // console.log('test-bundles: loadable.preloadAll', loadable);
  const url = context.location.path;
  // Render after all async chunks loaded!
  const element = (
    <StaticRouter location={url} context={context}>
      <App mode="default"/>
    </StaticRouter>
  );
  const result = ReactDOMServer.renderToString(element);
  console.log('result:', result);
  // TODO 2019.02.15, 03:35 -- Catch output in django wrapper!
  // debugger;
});

// DEBUG: Control all chunks loading
// setInterval(() => {
//   console.log('preloadAll', preloadAll);
// }, 1000);
