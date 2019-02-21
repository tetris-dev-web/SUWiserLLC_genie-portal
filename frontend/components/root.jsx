import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
// import {DrizzleContext} from 'drizzle-react';

import App from './app';

const Root = ({ store }) => {
  return (
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
  );
};

export default Root;
