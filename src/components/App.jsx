/* eslint-disable no-debugger, no-console */

import * as React from 'react';
import PropTypes from 'prop-types';

import './App.css';

const App = ({ mode }) => {
  // TODO: `NODE_ENV` must be in config!
  const NODE_ENV = process.env.NODE_ENV;
  console.log('App: NODE_ENV', NODE_ENV);
  // debugger;
  return (
    <div className="App">
      App mode: {mode}
    </div>
  );
};

App.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default App;
