import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
// import {DrizzleContext} from 'drizzle-react';
import TransactionNotifications from './entities/notifications/notifications';
import Landing from './landing/landing';
import App from './app';
import Navbar from './entities/navbar/navbar_container';
import Modal from '../components/entities/modal/modal';

const Root = ({ store, window }) => {
  return (
      <Provider store={store}>
        <HashRouter>
          <div style={{height: "100%"}}>
            <TransactionNotifications />
            <Modal />
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Route exact path='/dashboard/:userType' component={App} />
          </div>
        </HashRouter>
      </Provider>
  );
};

export default Root;
