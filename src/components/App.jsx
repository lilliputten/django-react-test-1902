/* eslint-disable no-debugger, no-console */

var React = require('react');

import './App.css';

const App = () => {
  // TODO: `NODE_ENV` must be in config!
  const NODE_ENV = process.env.NODE_ENV;
  console.log('App: NODE_ENV', NODE_ENV);
  // debugger;
  return (
    <div className="App">
      Hello React!
    </div>
  );
};

export default App;
