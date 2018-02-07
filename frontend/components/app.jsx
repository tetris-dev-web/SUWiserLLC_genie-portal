import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  AuthRoute,
  HashRouter
} from 'react-router-dom';
import Navbar from './entities/navbar/navbar_container';

const App = () => (
  <div>
    <Navbar />
  </div>
);

// <Switch>
//   <AuthRoute exact path="/login" component={SessionFormContainer} />
//   <AuthRoute exact path="/signup" component={SessionFormContainer} />
// </Switch>
export default App;
