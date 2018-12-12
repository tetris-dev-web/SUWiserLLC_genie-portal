import React from 'react';
import PropTypes from 'prop-types';

class ReadString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKey: null,
      coinBaseBalanceDataKey: null,
      stackId0Balance: null,
      stackId1Balance: null,
      stackId2Balance: null,
      stackId3Balance: null,
      stackIdCap: null,
      stackIdRate: null,
      stackIdSupply: null
    };
    this.getTxStatus = this.getTxStatus.bind(this);
  }

  componentDidMount(){
    const {drizzle, drizzleState} = this.props;
    // const stringContract = drizzle.contracts.MyStringStore;
    // const dataKey = stringContract.methods["myString"].cacheCall();
    // this.setState({dataKey});

    const Token = drizzle.contracts.Token;
    const GNITokenCrowdsale = drizzle.contracts.GNITokenCrowdsale;

    var that = this;
    web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                // App.account = account;
                // $("#account").text(account);
                web3.eth.getBalance(account, function (err, balance) {
                    if (err === null) {
                        console.log((web3.fromWei(balance, "ether") + " ETH"));
                        debugger;
                        that.setState({stackId0Balance: (web3.fromWei(balance, "ether") + " ETH")})
                    }
                });
            }
        });

    const stackIdRate = GNITokenCrowdsale.methods.rate.cacheCall();
    const stackIdSupply = Token.methods.totalSupply.cacheCall();
    console.log('stackId =', stackIdSupply)
    this.setState({stackIdRate,stackIdSupply});

  }
  getTxStatus () {
    const {transactions, transactionStack} = this.props.drizzleState;
    const txHash = transactionStack[this.state.stackIdBalance];

    if(!txHash)return null;
    return `Transaction status: ${transactions[txHash].status}`;
  }

  render() {
    const {Token,GNITokenCrowdsale } = this.props.drizzleState.contracts;

    const rate = GNITokenCrowdsale.rate[this.state.stackIdRate];
    return (<div>
              <p> account balance: {this.state.stackId0Balance}   </p>
              <p> account address: { this.props.drizzleState.accounts[0]}   </p>

          </div>
  )}
}
// <h1> cap: { cap && cap.value} </h1>

// <h1> cap: { cap && cap.value} </h1>
// <h1> rate: { rate && rate.value} </h1>
export default ReadString;


          // <p> My stored string: { myString && myString.value} </p>
// <p> account 1 balance: { balance1Value && balance1Value.value}   </p>
// <p> account 1 address: { this.props.drizzleState.accounts[1]}   </p>
// <p> account 2 balance: { balance2Value && balance2Value.value}   </p>
// <p> account 2 address: { this.props.drizzleState.accounts[2]}   </p>

// <h1> totalTokenSupply : { totalTokenSupply && totalTokenSupply.value} </h1>
// <h1> rate: { rate && rate.value} </h1
//
//
//
//
//
//                 <div>{this.getTxStatus()}</div>
