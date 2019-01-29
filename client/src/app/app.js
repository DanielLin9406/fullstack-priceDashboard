import { hot } from "react-hot-loader";
import React, { Component } from "react";
import { Switch } from 'react-router-dom';
import ConsoleRoute from './routes/ConsoleRoute/Container'
import LoginRoute from './routes/LoginRoute/Container'
import SecuredRoute from './routes/SecuredRoute/Container'

import './App.scss';

class App extends Component {
  componentDidCatch(error, info) {
    // logError(error, { extra: info })
  }
  render() {
    return (
      <div id="app">
        <Switch>
          <LoginRoute />
          <SecuredRoute component={ConsoleRoute} />
        </Switch>
      </div>
    );
  }
}

export default hot(module)(App);
