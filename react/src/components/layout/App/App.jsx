/* eslint-disable no-debugger, no-console */
import * as React from 'react';
import PropTypes from 'prop-types';

import { /* BrowserRouter, */ Switch, NavLink as Link, Route } from 'react-router-dom';
import loadable from 'react-loadable';

import './App.pcss';

// loading view
// const LoadingComponent = ({ id }) => <div className="Loading" id="{id}">Loading {id}...</div>;
const LoadingComponentFactory = ({ id }) => {
  const LoadingComponentWithId = () => <div className="Loading" id="{id}">Loading {id}...</div>;
  return LoadingComponentWithId;
};

// Routes...
// TODO 2019.02.15, 03:34 -- Move route definitions to separated config using on both client and server?
const routesList = [
  {
    id: 'Home',
    path: '/',
    loader: () => import('../../pages/Home/Home'),
  },
  {
    id: 'About',
    path: '/About',
    loader: () => import('../../pages/About/About'),
  },
  {
    id: 'Contacts',
    path: '/Contacts',
    loader: () => import('../../pages/Contacts/Contacts'),
  },
];

const routes = routesList.map(({ id, path, loader }) => {
  const loading = LoadingComponentFactory({id});
  const route = {
    id,
    path,
    content: loadable({
      loading,
      loader,
    }),
  };
  // console.log('App: route', id, ': ', route);
  return route;
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      routes,
    };
  }

  // /** componentWillMount ** {{{
  //  */
  // componentWillMount() {
  //   console.log('App: componentWillMount');
  //   // debugger;
  // }/*}}}*/

  /** render ** {{{
   */
  render() {
    const { mode } = this.props;
    const { routes } = this.state;
    const routesMenu = [];
    const routesContent = [];
    routes.map(({id, path, content}) => {
      routesMenu.push(<Link className="App-MenuItem" activeClassName="active" key={id} exact to={path}>{id}</Link>);
      routesContent.push(<Route exact path={path} key={id} component={content} />);
    });
    return (
      <div className="App" id={mode}>
        <div className="App-Menu">
          <span className="App-MenuLogo" />
          {routesMenu}
        </div>
        <div className="App-Page">
          <Switch>
            {/* <Route exact path="/" component={AsyncHomePage} /> */}
            {/* <Route exact path="/About" component={AsyncAboutPage} /> */}
            {/* <Route exact path="/Contacts" component={AsyncContactsPage} /> */}
            {routesContent}
          </Switch>
        </div>
        <div className="App-Info">
          App mode: {mode}
        </div>
      </div>
    );
  }/*}}}*/

}

App.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default App;
