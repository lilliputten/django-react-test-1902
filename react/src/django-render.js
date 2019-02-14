/* eslint-disable no-console */
import * as React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from './components/layout/App/App';

// DEBUG!
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

// <StaticRouter location={req.url} context={context}>
const url = context.location.path;
// debugger;
const element = (
  <StaticRouter location={url} context={context}>
    <App mode="default"/>
  </StaticRouter>
);
// debugger;
const result = ReactDOMServer.renderToString(element);
console.log('result:', result);
debugger;
