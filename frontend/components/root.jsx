import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
// import {DrizzleContext} from 'drizzle-react';
import TransactionNotifications from './entities/notifications/notifications';
import Landing from './landing/landing';
import App from './app';
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
              <Route exact path='/' component={Landing} />
              <Route exact path='/dashboard/:userType' component={App} />
            </div>
          </HashRouter>
        </Provider>
      );

    }

    const web3 = { window };
    return <FourOhFourPage
      title={ web3 ? 'Network Error' : 'Web3 404'}
      description={web3 ? 'Please select the Ropsten network to continue.' : 'Unable to connect to your web3 provider. Please download Metamask to continue.'}
      additionalContent={
        web3 ?
        <div></div> :
        <a href="https://metamask.io/" target="_blank" className="metaMask-Button" style={{fontSize: '30px'}}>{web3 ? '' : 'Download MetaMask'}</a>
      }
      />
  }
}
// <Navbar />



export default Root;
