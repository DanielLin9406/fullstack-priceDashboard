import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Frontload } from 'react-frontload';
import { BrowserRouter } from 'react-router-dom';
import createStore from './store';
import App from './app/app';

const { store } = createStore();
const root = document.querySelector('#root');
const Application = (
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <Frontload noServerRender>
          <App />
        </Frontload>
      </BrowserRouter>
    </Provider>
  </AppContainer>
);

// If we're not running on the server, just render like normal
render(Application, root);

// Remain State while reload
// if (module.hot) {
//   module.hot.accept('./app/app', () => {
//     const NextApp = require('./app/app').default;
//     render(NextApp);
//   });
// }
