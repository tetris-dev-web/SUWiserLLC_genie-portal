import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
// import {DrizzleContext} from 'drizzle-react';

import App from './app';

const Root = ({ store, window }) => {
  return (
      <Provider store={store}>
        <HashRouter>
          <App window={window}/>
        </HashRouter>
      </Provider>
  );
};

export default Root;
