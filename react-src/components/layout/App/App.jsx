/* eslint-disable no-debugger, no-console */
import * as React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter, Switch, NavLink as Link, Route } from 'react-router-dom';
import loadable from 'react-loadable';

import './App.css';

// loading view
const LoadingComponent = () => <div>Loading...</div>;

const AsyncMainPage = loadable({
  loading: LoadingComponent,
  loader: () => import( '../../pages/Home/Home' ),
});

const App = ({ mode }) => {
  // TODO: `NODE_ENV` must be in config!
  const NODE_ENV = process.env.NODE_ENV;
  console.log('App: NODE_ENV', NODE_ENV);
  console.log('App mode', mode);
  // debugger;
  return (
    <BrowserRouter>
      <div className="App" id={mode}>
        <div className="App-Menu">
          <Link exact to="/" activeClassName="active">Home</Link>
          <Link to="/about" activeClassName="active">About</Link>
          <Link to="/contact" activeClassName="active">Contact</Link>
        </div>
        <Switch>
          <Route exact path="/" component={AsyncMainPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

App.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default App;
