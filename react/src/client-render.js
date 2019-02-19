import * as React from 'react';
import ReactDOM from 'react-dom';

// TODO: Polyfills etc...

// import { BrowserRouter, Switch, NavLink as Link, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/layout/App/App';
const content = (
  <BrowserRouter>
    <App mode="default"/>
  </BrowserRouter>
);
ReactDOM.render(content, document.getElementById('AppContainer'));
