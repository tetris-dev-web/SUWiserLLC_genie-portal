import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import {Drizzle, generateStore} from "drizzle";
// import MyStringStore from "./contracts/MyStringStore.json"
import MyStringStore from '../truffle/build/contracts/MyStringStore.json';


// testing start
import { signup, login, logout } from './actions/session_actions'; // its the actions that dispatch login requests
// testing end

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser }};
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  const chainOptions = { contracts: [MyStringStore]} ;
  const drizzleStore = generateStore(chainOptions);
  const drizzle = new Drizzle(chainOptions, drizzleStore);

  window.drizzle = drizzle;
  window.store = store;
  window.getState = store.getState;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} drizzle={drizzle}/>, root);
});
