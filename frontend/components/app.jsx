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

// Filler component for flex layout
import Filler from './entities/filler';

import Footer from './entities/footer/footer';

const App = () => (
  <div className="box">
    <Navbar />
    <Filler />
    <Footer />
  </div>
);

// <Switch>
//   <AuthRoute exact path="/login" component={SessionFormContainer} />
//   <AuthRoute exact path="/signup" component={SessionFormContainer} />
// </Switch>
export default App;
