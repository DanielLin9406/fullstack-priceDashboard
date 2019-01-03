import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { Frontload } from "react-frontload";
import createStore from "./store";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";

const { store } = createStore();
const root = document.querySelector("#root");
const Application = (
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <Frontload noServerRender={true}>
          <App />
        </Frontload>
      </BrowserRouter>
    </Provider>
  </AppContainer>
);

// If we're not running on the server, just render like normal
render(Application, root);
// If runnign in development with Hot Reload
if (module.hot) {
  module.hot.accept("./app/App", () => {
    const NextApp = require('./app/App').default;
    render(NextApp);
  });
}