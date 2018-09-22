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
    const stringContract = drizzle.contracts.MyStringStore;
    const dataKey = stringContract.methods["myString"].cacheCall();
    console.log(dataKey)
    console.log(drizzleState)
    this.setState({dataKey});

    const GNIToken = drizzle.contracts.GNIToken;
    const GNITokenCrowdsale = drizzle.contracts.GNITokenCrowdsale;


    // var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    // const coinBaseBalanceDataKey = GNIToken.methods.sendTransaction.cacheSend(drizzleState.accounts[0],2, {from: drizzleState.accounts[0],value: web3.toWei("1","ether")})
    const stackId0Balance = GNIToken.methods.balanceOf.cacheCall(drizzleState.accounts[0]);
    console.log(stackId0Balance)
    const stackId1Balance = GNIToken.methods.balanceOf.cacheCall(drizzleState.accounts[1]);
    const stackId2Balance = GNIToken.methods.balanceOf.cacheCall(drizzleState.accounts[2]);
    const stackIdCap = GNITokenCrowdsale.methods.cap.cacheCall();
    const stackIdRate = GNITokenCrowdsale.methods.rate.cacheCall();
    const stackIdSupply = GNIToken.methods.totalSupply.cacheCall();

    this.setState({stackId0Balance,stackId1Balance,stackId2Balance,stackIdCap, stackIdRate,stackIdSupply});
    // this.setState({coinBaseBalanceDataKey})

  }
  getTxStatus () {
    const {transactions, transactionStack} = this.props.drizzleState;
    const txHash = transactionStack[this.state.stackIdBalance];

    if(!txHash)return null;
    return `Transaction status: ${transactions[txHash].status}`;
  };

  render() {
    const { MyStringStore, GNIToken,GNITokenCrowdsale } = this.props.drizzleState.contracts;
    const myString = MyStringStore.myString[this.state.dataKey];
    const balance0Value = GNIToken.balanceOf[this.state.stackId0Balance];
    const balance1Value = GNIToken.balanceOf[this.state.stackId1Balance];
    const balance2Value = GNIToken.balanceOf[this.state.stackId2Balance];
    const totalTokenSupply = GNIToken.totalSupply[this.state.stackIdSupply];
    const cap = GNITokenCrowdsale.cap[this.state.stackIdCap];
    const rate = GNITokenCrowdsale.rate[this.state.stackIdRate];
    console.log(this.state)

    return (<div>
              <p> My stored string: { myString && myString.value} </p>
              <p> account 0 balance: { balance0Value && balance0Value.value}   </p>
              <p> account 0 address: { this.props.drizzleState.accounts[0]}   </p>
              <p> account 1 balance: { balance1Value && balance1Value.value}   </p>
              <p> account 1 address: { this.props.drizzleState.accounts[1]}   </p>
              <p> account 2 balance: { balance2Value && balance2Value.value}   </p>
              <p> account 2 address: { this.props.drizzleState.accounts[2]}   </p>


              <h1> totalTokenSupply : { totalTokenSupply && totalTokenSupply.value} </h1>
              <h1> cap: { cap && cap.value} </h1>
              <h1> rate: { rate && rate.value} </h1>


              <div>{this.getTxStatus()}</div>
          </div>
  )}
}


export default ReadString;
