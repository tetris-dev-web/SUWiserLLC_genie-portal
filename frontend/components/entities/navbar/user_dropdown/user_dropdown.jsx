import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './modal_style';
import Wallet from './wallet/wallet';
import ProfileContainer from './profile/profile';
import TokenData from '../../../../contract_data/Token';

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);

    //this needs to be updated using uport information
    // const fName = this.props.currentUser.first_name;
    // const lName = this.props.currentUser.last_name;
    // const email = this.props.currentUser.email;
    // const parsedUsername = email.match(/^([^@]*)@/)[1];
    //
    //
    // const uName = this.props.currentUser.username;
    //
    // const userType = fName && lName ? `${fName} ${lName}` : parsedUsername;

    // this.totalSupplyIdx = this.props.drizzle.contracts.Token.methods.totalSupply.cacheCall();
    /*
    We initially set the state of the displayName to either the user's
    first and last name (if they have updated their profile with this information)
    or to their truncated username.
    */

    this.state = {
      openModal: false,
      // displayName: userType,
      displayName: "demo user",
      totalActive: 0,
      totalInactive: 0,
      accountActive: 0,
      accountInactive: 0
    };
    // tokens: 0,
    // user_tokens: 500,
    // total_tokens: 49500

    window.SessionOpenModal = () => {
      this.setState({openModal: true});
    };

    window.SessionOpenModal = window.SessionOpenModal.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateUsernameDisplay = this.updateUsernameDisplay.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  openModal() {
    this.setState({openModal: true});
  }

  closeModal() {
    this.setState({openModal: false});
  }

  updateUsernameDisplay(user) {
    let input = '';
    if (user.first_name && user.last_name) {
      input = `${user.first_name} ${user.last_name}`;
    } else if (user.first_name) {
      input = user.first_name;
    } else if (user.last_name) {
      input = user.last_name;
    } else {
      input = user.email.match(/^([^@]*)@/)[1];
    }
    this.setState({ displayName: input });
  }

  /*
  this function serves to update the user's display name on the
  underlying Navbar Component upon updating their profile, via being
  passed down through props to the Profile Component.
  */

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout();
  }

  // handlePublicKeyUpdate(newKey){
  //   debugger;
  //   let updatedUser = {
  //     id: this.props.currentUser.id,
  //     email: this.props.currentUser.email,
  //     // password: (this.state.password.length > 6) ? this.state.password : "",
  //     password: this.props.currentUser.password,
  //     zipcode: this.props.currentUser.zipcode,
  //     first_name: this.props.currentUser.first_name,
  //     last_name: this.props.currentUser.last_name
  //   };
  //
  //   this.props.updateUser(updatedUser);
  // }

  render() {



    return (
      <div>
        <div id="dropdown-container" className="dropdown">
            <div className="user-dropdown-button" id='token-display'>
              <div id='user-text'className="display-name">
                {this.state.displayName}
              </div>
              <hr/>
              <div className="tokens-cont">
                <div id='user-text' className="total-tokens">{this.state.accountActive ? this.state.accountActive : 0} active tokens</div>
              </div>
              <div className="tokens-cont">
                <div id='user-text' className="total-tokens">{this.state.accountInactive ? this.state.accountInactive : 0} inactive tokens</div>
              </div>
            </div>
        </div>
        <div className="dropdown-menu dropdown-item">
          <ProfileContainer
            updateUsernameDisplay={this.updateUsernameDisplay}
            user={this.props.currentUser}/>
        </div>
      </div>
    );
  }
}

// Container

import { fetchTokenBalances, fetchDemoInvestorBalances, receiveActiveTokens, receiveInactiveTokens } from '../../../../actions/chain_actions/token_actions';
import { connect } from 'react-redux';
import { merge } from 'lodash';

const mapStateToProps = state => {
  return {
    web3: state.network.web3,
    crowdsaleInstance: state.network.crowdsaleInstance,
    projectContract: state.network.project,
    inactiveTokenInstance: state.network.inactiveTokenInstance,
    activeTokenInstance: state.network.activeTokenInstance,
    account: state.network.account,
    tokenBalances: state.chain_data.tokenBalances
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTokenBalances: (inactiveTokenInstance, activeTokenInstance, account) => fetchTokenBalances(inactiveTokenInstance, activeTokenInstance, account),
    fetchDemoInvestorBalances: () => fetchDemoInvestorBalances()
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
