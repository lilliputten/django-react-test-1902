/* eslint-disable no-console */
import * as React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import App from './components/layout/App/App';

const element = (
  <App mode="default"/>
);
const result = ReactDOMServer.renderToString(element);
console.log('result:', result);
debugger;
// ReactDOM.render(content, document.getElementById('AppContainer'));
