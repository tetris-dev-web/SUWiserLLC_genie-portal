import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
// import {DrizzleContext} from 'drizzle-react';
import TransactionNotifications from './entities/notifications/notifications';
import Landing from './landing/landing';
import App from './app';
import Navbar from './entities/navbar/navbar_container';
import Modal from '../components/entities/modal/modal';
import './root.scss';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.window.web3
    }
  }

  render () {
    const { store, window } = this.props;

    if (window.web3) {

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

    return (
          <div className='404_prompt' style={{display: 'flex', margin: 'auto'}}>
            <div className='404_message' style={{display: 'flex', flexDirection: 'column'}}>
              <h1 className='404_title' style={{margin: 'auto', fontSize: '90px', fontFamily: 'none'}}>Web3 404</h1>
              <p className='404_description' style={{fontSize: '30px', margin: '30px'}}>Unable to connect to your web3 provider. Please download Metamask to continue.</p>
              <a href="https://metamask.io/" target="_blank" className="metaMask-Button" style={{fontSize: '30px'}}>Download MetaMask</a>
            </div>
          </div>
        );
  }
}



export default Root;
