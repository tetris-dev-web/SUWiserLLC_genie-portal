import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
// import {DrizzleContext} from 'drizzle-react';
import TransactionNotifications from './entities/notifications/notifications';
import Landing from './landing/landing';
import App from './app';
import Navbar from './entities/navbar/navbar_container';
import Modal from '../components/entities/modal/modal';
import FourOhFourPage from './404_page/404_page';
import './root.scss';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.window.web3
    }
  }

  render () {
    const { store, window, networkVersion } = this.props;
    console.log('networkVersion', networkVersion)
    if (window.web3 && networkVersion === '3') {

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

    }

    return <FourOhFourPage web3={window.web3}/>
  }
}



export default Root;
