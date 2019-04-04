import React from 'react';
import { fetchTokenBalances, fetchDemoInvestorBalances } from '../../../../../actions/chain_actions/token_actions';
import { connect } from 'react-redux';
import { merge } from 'lodash';


class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
      "ETH": null,
      "GNI (active)": null,
      "GNIT (vesting)": null,
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.watchTransfer = this.watchTransfer.bind(this);
  }
  /*
  After we updated the user on the backend, we update the user's display
  name on the underlying Navbar Component before closing the modal
  */

  componentDidMount() {
    const { inactiveTokenInstance, activeTokenInstance, account } = this.props;
    // this.props.fetchTokenBalances(inactiveTokenInstance, activeTokenInstance, account).then(balances => {
    //   const { totalActive, totalInactive, accountActive, accountTotal } = balances;
    //   this.setState({
    //     totalActive: Number(totalActive),
    //     totalInactive: Number(totalInactive),
    //     accountActive: Number(accountActive),
    //     accountTotal: Number(accountTotal)
    //   })
    // });
    this.props.fetchDemoInvestorBalances().then(balances => {
        const { accountActive, accountInactive } = balances;
        this.setState({
          "GNI (active)": Number(accountActive),
          "GNI (vesting)": Number(accountInactive),
          "ETH": this.props.balance
        })
    })
    this.watchTransfer(inactiveTokenInstance);
    this.watchTransfer(activeTokenInstance);
  }

  componentDidUpdate (prevProps) {
    if (prevProps.balance !== this.props.balance) {
      this.setState({
        "ETH": this.props.balance
      })
    }
  }

  watchTransfer (token) {
    const { inactiveTokenInstance, account } = this.props;
    token.Transfer().watch((error, event) => {
      let newState = merge({}, this.state);
      const value = Number(event.args.value);
      if (event.args.from === "0x0000000000000000000000000000000000000000") {
        if (token === inactiveTokenInstance) {
          newState = merge({}, newState, { totalInactive: this.state.totalInactive + value })
        } else {
          newState = merge({}, newState, { totalActive: this.state.totalActive + value })
        }
      }

      if (event.args.to === "0x0000000000000000000000000000000000000000") {
        if (token === inactiveTokenInstance) {
          newState = merge({}, newState, { totalInactive: this.state.totalInactive - value })
        } else {
          newState = merge({}, newState, { totalActive: this.state.totalActive - value })
        }
      }

      if (event.args.to === account) {
        if (token === inactiveTokenInstance) {
          newState = merge({}, newState, { accountInactive: this.state.accountInactive + value })
        } else {
          newState = merge({}, newState, { totalAactive: this.state.accountActive + value })
        }
      }

      if (event.args.from === account) {
        if (token === inactiveTokenInstance) {
          newState = merge({}, newState, { accountInactive: this.state.accountInactive - value })
        } else {
          newState = merge({}, newState, { totalAactive: this.state.accountActive - value })
        }
      }

      this.setState(newState);
    });
  }

  render() {


    return(
      <form className="profile-form-box">
        <input
          type="text"
          placeholder="email"
          autoComplete="new-email"
          value='hi'
          className="profile-input"
          />
        <br/>
        <input
          type="password"
          placeholder="password"
          autoComplete="new-password"
          value='hi'
          className="profile-input"
          />
        <br/>
        <input
          type="zipcode"
          placeholder="zipcode"
          autoComplete="new-zipcode"
          value='hi'
          className="profile-input"
          />
        <br/>
        <input
          type="first_name"
          placeholder="first name"
          autoComplete="new-first_name"
          value='hi'
          className="profile-input"
          />
        <br/>
        <input
          type="last_name"
          placeholder="last name"
          autoComplete="new-last_name"
          value='hi'
          className="profile-input"
          />
        <br/>
        <input
          type="submit"
          value="update"
          className="submit-button"
          /><br/>
      </form>
    );
  }
}


// CONTAINER

const mapStateToProps = state => {
  return {
    inactiveTokenInstance: state.network.inactiveTokenInstance,
    activeTokenInstance: state.network.activeTokenInstance,
    account: state.network.account,
    balance: state.network.balance,
    tokenBalances: state.entities.tokenBalances
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTokenBalances: (inactiveTokenInstance, activeTokenInstance, account) => fetchTokenBalances(inactiveTokenInstance, activeTokenInstance, account),
    fetchDemoInvestorBalances: () => fetchDemoInvestorBalances()
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
