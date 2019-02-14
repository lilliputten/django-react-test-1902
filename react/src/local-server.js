// const r = require('react');
// import r2 from 'react-dom';
import * as React from 'react';
import ReactDOM from 'react-dom';

import App from './components/layout/App/App';

const content = (
  <App mode="default"/>
);
// console.log(r, r2);
// debugger;
ReactDOM.render(content, document.getElementById('AppContainer'));
