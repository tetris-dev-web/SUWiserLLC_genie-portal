import React from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import {
  AuthRoute,
  ProtectedRoute,
  RedirectedRoute
} from '../util/route_util';
import Navbar from './entities/navbar/navbar_container';
import Landing from './entities/landing/landing';
import Dashboard from './entities/dashboard/dashboard';
import Footer from './entities/footer/footer';

const App = () => (
  <div className="">
    <Navbar />
    <RedirectedRoute />
    <Switch>
      <AuthRoute path="/login" component={Landing} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
    </Switch>
    <Footer />
  </div>
);

export default App;
