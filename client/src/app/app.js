import { hot } from "react-hot-loader";
import React, { Component } from "react";
import Pages from './pages';

import './App.scss';

class App extends Component {
  componentDidCatch(error, info) {
    // logError(error, { extra: info })
  }
  render() {
    return (
      <div id="app">
        <Pages />
      </div>
    );
  }
}

export default hot(module)(App);
