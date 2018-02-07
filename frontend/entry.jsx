import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

// testing start
import { signup, login, logout } from './actions/session_actions'; // its the actions that dispatch login requests
// testing end

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // testing start
  window.store = store;
  window.getState = store.getState;
  // window.fetchProjects = fetchProjects;
  // testing end

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
