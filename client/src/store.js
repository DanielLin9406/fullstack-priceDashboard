import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./modules";
import thunkMiddleware from "redux-thunk";

// A nice helper to tell us if we're on the server
export const isServer = !(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export default (url = "/") => {
  const enhancers = [];

  // Dev tools are helpful
  if (process.env.NODE_ENV === "development" && !isServer) {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }

    if (module.hot) {
      module.hot.accept("./modules/index", () => {
        const nextCombineReducers = require("./modules/index").default;
        store.replaceReducer(nextCombineReducers);
      });
    }
  }

  const middleware = [thunkMiddleware];
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  // Do we have preloaded state available? Great, save it.
  const initialState = !isServer ? window.__PRELOADED_STATE__ : {};

  // Delete it once we have it stored in a variable
  if (!isServer) {
    delete window.__PRELOADED_STATE__;
  }

  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
  );

  return {
    store
  };
};