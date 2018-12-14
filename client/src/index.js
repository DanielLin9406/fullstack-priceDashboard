import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { Frontload } from "react-frontload";
import createStore from "./store";
import { BrowserRouter } from "react-router-dom";
import Appc from "./app/appc";

const { store } = createStore();
const root = document.querySelector("#root");
const Application = (
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <Frontload noServerRender={true}>
          <Appc />
        </Frontload>
      </BrowserRouter>
    </Provider>
  </AppContainer>
);

// If we're not running on the server, just render like normal
render(Application, root);
// If runnign in development with Hot Reload
if (module.hot) {
  module.hot.accept("./app/appc", () => {
    const NextApp = require('./app/appc').default;
    render(NextApp);
  });
}