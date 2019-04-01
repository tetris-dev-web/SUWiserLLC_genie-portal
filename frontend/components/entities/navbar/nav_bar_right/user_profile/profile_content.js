import React from 'react';
import { fetchTokenBalances, fetchDemoInvestorBalances } from '../../../../../actions/chain_actions/token_actions';
import { connect } from 'react-redux';
import { merge } from 'lodash';

class ProfileContent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      account: null,
      "ETH": null,
      "GNI (active)": null,
      "GNI (vesting)": null,

    };
    this.watchTransfer = this.watchTransfer.bind(this);
  }

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
          account,
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

  render () {
    const userInfo = Object.keys(this.state).map((item, idx) => {
      return (
        <div key={idx} className='profile_item'>
          <div className='profile_item_type'>{`${item}`}</div>
          <div className='profile_item_content'>{`${this.state[item]}`}</div>
        </div>
      );
    })

    return (
      <div className='profile_items'>
        {userInfo}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    inactiveTokenInstance: state.network.inactiveTokenInstance,
    activeTokenInstance: state.network.activeTokenInstance,
    account: state.network.account,
    balance: state.network.balance,
    tokenBalances: state.entities.tokenBalances,
    fetchTokenBalances: (inactiveTokenInstance, activeTokenInstance, account) => fetchTokenBalances(inactiveTokenInstance, activeTokenInstance, account),
    fetchDemoInvestorBalances: () => fetchDemoInvestorBalances()
  };
};


export default connect(mapStateToProps)(ProfileContent);
