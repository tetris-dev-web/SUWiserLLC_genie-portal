import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import {DrizzleContext} from 'drizzle-react';

import App from './app';

const Root = ({ store, drizzle }) => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </DrizzleContext.Provider>
  );
}

export default Root;
