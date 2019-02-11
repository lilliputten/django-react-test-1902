/* eslint-disable no-debugger, no-console */
import * as React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter, Switch, NavLink as Link, Route } from 'react-router-dom';
import loadable from 'react-loadable';

import './App.pcss';

// loading view
const LoadingComponent = () => <div>Loading...</div>;

// Pages...

const AsyncHomePage = loadable({
  loading: LoadingComponent,
  loader: () => import( '../../pages/Home/Home' ),
});

const AsyncAboutPage = loadable({
  loading: LoadingComponent,
  loader: () => import( '../../pages/About/About' ),
});

const AsyncContactsPage = loadable({
  loading: LoadingComponent,
  loader: () => import( '../../pages/Contacts/Contacts' ),
});

const App = ({ mode }) => {
  // TODO: `NODE_ENV` must be in config!
  // const NODE_ENV = process.env.NODE_ENV;
  // console.log('App: NODE_ENV', NODE_ENV);
  // console.log('App mode', mode);
  // debugger;
  return (
    <BrowserRouter>
      <div className="App" id={mode}>
        <div className="App-Menu">
          <span className="App-MenuLogo" />
          <Link className="App-MenuItem" activeClassName="active" exact to="/">Home</Link>
          <Link className="App-MenuItem" activeClassName="active" to="/About">About</Link>
          <Link className="App-MenuItem" activeClassName="active" to="/Contacts">Contacts</Link>
        </div>
        <div className="App-Page">
          <Switch>
            <Route exact path="/" component={AsyncHomePage} />
            <Route exact path="/About" component={AsyncAboutPage} />
            <Route exact path="/Contacts" component={AsyncContactsPage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

App.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default App;
