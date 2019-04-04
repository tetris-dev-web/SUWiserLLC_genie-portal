import React from 'react';
import { fetchTokenBalances, fetchDemoInvestorBalances, collectDemoInvestorDividend } from '../../../../../actions/chain_actions/token_actions';
import { activateDemoInvestorPending } from '../../../../../actions/chain_actions/dividends_actions';
import { connect } from 'react-redux';
import { merge } from 'lodash';

class ProfileContent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      account: '',
      "ETH": '',
      "GNI (vesting)": '',
      "GNI (pending)": 0,
      "GNI (active)": '',
      "Dividend Owed": 0
    };
    this.watchTransfer = this.watchTransfer.bind(this);
    this.activateTokens = this.activateTokens.bind(this);
    this.collectDividend = this.collectDividend.bind(this);
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
        const { accountActive, accountInactive, accountPending, accountDividend, account, accountBalance } = balances;
        console.log(balances, "sup")
        this.setState({
          account,
          "ETH": Number(accountBalance),
          "GNI (vesting)": Number(accountInactive),
          "GNI (pending)": Number(accountPending),
          "GNI (active)": Number(accountActive),
          "Dividend Owed": Number(accountDividend)
        })
    })
    this.watchTransfer(inactiveTokenInstance);
    this.watchTransfer(activeTokenInstance);
    // this.watchDividendCollection();
    // this.watchTokenActivation();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.balance !== this.props.balance) {
      this.setState({
        "ETH": this.props.balance
      })
    }
  }

  activateTokens () {
    this.props.inactiveTokenInstance.activateDemoInvestorPending();
  }

  collectDividend () {
    this.props.dividendsInstance.collectDemoInvestorDividend();
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

  watchDividendCollection () {
    const { dividendsInstance } = this.props;
    dividendsInstance.DividendCollection().watch((error, event) => {
      const { account } = event.args;
      if (account === this.props.account) { //we need to populate state with the correct account (hardcode for demo)
        this.setState({
          "Dividend Owed": 0
        })
      }
    })
  }

  watchTokenActivation () {
    const { inactiveTokenInstance } = this.props;
    inactiveTokenInstance.TokenActivation().watch((error, event) => {
      const { account, amount } = event.args;
      if (account === this.props.account) {
        this.setState({
          "GNI (pending)": 0,
          "GNI (active)": this.state["GNI (active)"] + amount
        })
      }
    })
  }

  render () {
    const userInfo = Object.keys(this.state).map((item, idx) => {
      const content =  item === "GNI (pending)" || item === "Dividend Owed" ?
                        <div className='profile_item_right'>
                          <div className='profile_item_content'>
                            {`${this.state[item]}`}
                          </div>
                          <div
                            className='profile_item_button'
                            onClick={ item === "GNI (pending)" ?  this.activateTokens : this.collectDividend }
                            >
                            {this.state[item] > 0 ?
                              `${item === "GNI (pending)" ? "acitvate" : "collect"}`
                              :
                              ''
                            }
                          </div>
                        </div> :
                        <div className='profile_item_content'>{`${this.state[item]}`}</div>
      return (
        <div key={idx} className='profile_item'>
          <div className='profile_item_type'>{`${item}`}</div>
          {content}
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
// {
//   item === "GNI (pending)" || item === "Dividend Owed" ?
//   <div className='profile_item_button'>{`${item === "GNI (pending)" ? "acitvate tokens" : "collect dividend"}`}</div> :
//   <div></div>
// }

const mapStateToProps = state => {
  return {
    inactiveTokenInstance: state.network.inactiveTokenInstance,
    activeTokenInstance: state.network.activeTokenInstance,
    dividendsInstance: state.network.dividendsInstance,
    account: state.network.account,
    balance: state.network.balance,
    tokenBalances: state.entities.tokenBalances,
    fetchTokenBalances: (inactiveTokenInstance, activeTokenInstance, account) => fetchTokenBalances(inactiveTokenInstance, activeTokenInstance, account),
    fetchDemoInvestorBalances: () => fetchDemoInvestorBalances(),
    collectDemoInvestorDividend: () => collectDemoInvestorDividend(),
    activateDemoInvestorPending: () => activateDemoInvestorPending()
  };
};



export default connect(mapStateToProps)(ProfileContent);
