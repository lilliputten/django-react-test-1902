import * as React from 'react';
import ReactDOM from 'react-dom';

// import { BrowserRouter, Switch, NavLink as Link, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
// import { matchPath } from 'react-router-dom';
// import { matchPath } from 'react-router';
// import { Router/* , browserHistory */ } from 'react-router';

// console.log(matchPath);
// debugger;
//
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', initializeApp);
// } else {
//   initializeApp();
// }
//
// function initializeApp () {
//   // const store = configureStore(window.__REDUX_STATE__)
//
//   const { pathname, search, hash } = window.location;
//   const location = `${pathname}${search}${hash}`;
//   // const routes = getRoutes(store);
//   const routes = {};
//   debugger;
//
//   matchPath({ routes, location }, () => {
//         // <Router history={browserHistory}>
//     ReactDOM.render((
//         <Router>
//           {routes}
//         </Router>
//       ),
//       document.getElementById('root')
//     );
//   });
// }

import App from './components/layout/App/App';
const content = (
  <BrowserRouter>
    <App mode="default"/>
  </BrowserRouter>
);
ReactDOM.render(content, document.getElementById('AppContainer'));
