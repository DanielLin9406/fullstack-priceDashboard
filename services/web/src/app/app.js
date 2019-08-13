import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import Routes from './routes';

import './app.scss';

class App extends Component {
  componentDidCatch() {
    // logError(error, { extra: info })
  }

  render() {
    return (
      <div id="app">
        <Routes />
      </div>
    );
  }
}

export default hot(module)(App);
