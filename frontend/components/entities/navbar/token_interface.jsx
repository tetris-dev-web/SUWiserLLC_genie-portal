import React from 'react';import { fetchTokenBalances, receiveActiveTokens, receiveInactiveTokens } from '../../../actions/chain_actions/token_actions';
import UserDropdownContainer from './user_dropdown/user_dropdown_container';
import BuyFormModal from './buy_form/buy_form_modal';
import ProjectFormModal from './project_form/project_form_modal';

// import getWeb3 from './getWeb3.js';
// import TruffleContract from 'truffle-contract';
// import GenieToken from './GenieToken.json';
// import MultiSigWallet from './MultiSigWallet.json';

class TokenInterface extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <nav className="series navbar-container">
        <div className= "navbar-left">
          <img className="gen-logo" src="https://s3.amazonaws.com/genie-portal-dev/static/logo.png"/>
          <div className="genus-dev-dash">
            <div className="gen-dev">GENUS DEVELOPMENT</div>
            <div className="gen-dash">GENIE DASHBOARD</div>
          </div>
        </div>
        <div className="navbar-right">
          <div className="user-container">
          </div>
          <UserDropdownContainer />
          <BuyFormModal />
          <ProjectFormModal />
        </div>
      </nav>
    );
  }
}

// <div onClick={this.fetchTest}>FETCHTEST</div>


export default TokenInterface;
