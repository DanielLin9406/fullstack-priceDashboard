import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './modules';

// A nice helper to tell us if we're on the server
export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export default () => {
  const enhancers = [];

  // Dev tools are helpful
  if (process.env.NODE_ENV === 'development' && !isServer) {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const middleware = [thunkMiddleware];
  const initialState = !isServer ? window.__PRELOADED_STATE__ : {};
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  // Delete it once we have it stored in a variable
  if (!isServer) {
    delete window.__PRELOADED_STATE__;
  }

  const store = createStore(rootReducer, initialState, composedEnhancers);

  if (module.hot) {
    module.hot.accept('./modules/index', () => {
      const nextCombineReducers = require('./modules/index').default;
      store.replaceReducer(nextCombineReducers);
    });
  }
  return {
    store
  };
};
