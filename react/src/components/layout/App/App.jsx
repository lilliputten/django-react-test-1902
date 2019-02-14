/* eslint-disable no-debugger, no-console */
import * as React from 'react';
import PropTypes from 'prop-types';

import { /* BrowserRouter, */ Switch, NavLink as Link, Route } from 'react-router-dom';
import loadable from 'react-loadable';

import './App.pcss';

// loading view
const LoadingComponent = ({ id }) => <div className="Loading" id="{id}">Loading {id}...</div>;
LoadingComponent.propTypes = {
  id: PropTypes.string,
};

// Pages...

// console.log('App: before async components...');
// debugger;
// const AsyncHomePage = loadable({
//   loading: LoadingComponent,
//   loader: () => import( '../../pages/Home/Home' ),
// });
//
// const AsyncAboutPage = loadable({
//   loading: LoadingComponent,
//   loader: () => import( '../../pages/About/About' ),
// });
//
// const AsyncContactsPage = loadable({
//   loading: LoadingComponent,
//   loader: () => import( '../../pages/Contacts/Contacts' ),
// });

// const App = ({ mode }) => {
//   // TODO: `NODE_ENV` must be in config!
//   // const NODE_ENV = process.env.NODE_ENV;
//   // console.log('App: NODE_ENV', NODE_ENV);
//   // console.log('App mode', mode);
//   // debugger;
// };

// const getChunkPath = (id) => `../../pages/${id}/${id}`;

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

class App extends React.Component {

  constructor(props) {
    super(props);
    const routes = {};
    routesList.map(({ id, path, loader }) => {
      // const chunkPath = getChunkPath(id);
      const route = {
        path,
        // chunkPath,
        // content: () => <LoadingComponent id={id} />,
        content: loadable({
          loading: () => <LoadingComponent id={id} />,
          loader,
        }),
      };
      routes[id] = route;
      console.log('App: route', id, ': ', route);
    });
    debugger;
    const paths = Object.keys(routes);
    this.state = {
      paths,
      routes,
    };
  }

  /** componentWillMount ** {{{
   */
  componentWillMount() {
    console.log('App: componentWillMount');
    debugger;
  }/*}}}*/

  /** render ** {{{
   */
  render() {
    const { mode } = this.props;
    const { routes } = this.state;
    return (
      <div className="App" id={mode}>
        <div className="App-Menu">
          <span className="App-MenuLogo" />
          <Link className="App-MenuItem" activeClassName="active" exact to="/">Home</Link>
          <Link className="App-MenuItem" activeClassName="active" to="/About">About</Link>
          <Link className="App-MenuItem" activeClassName="active" to="/Contacts">Contacts</Link>
        </div>
        <div className="App-Page">
          <Switch>
            <Route exact path="/" component={routes.Home.content} />
            <Route exact path="/About" component={routes.About.content} />
            <Route exact path="/Contacts" component={routes.Contacts.content} />
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
