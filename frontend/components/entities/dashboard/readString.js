import React from 'react';
import PropTypes from 'prop-types';

class ReadString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dataKey: null, coinBaseBalanceDataKey: null};
  }

  componentDidMount(){
    const {drizzle, drizzleState} = this.props;
    const stringContract = drizzle.contracts.MyStringStore;
    const dataKey = stringContract.methods["myString"].cacheCall();
    console.log(dataKey)
    this.setState({dataKey});

    const GNIToken = drizzle.contracts.GNIToken;


    // var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    GNIToken.methods.mint.cacheSend(drizzleState.accounts[0],100, {from: drizzleState.accounts[1]})
    const coinBaseBalanceDataKey = GNIToken.methods.balanceOf.cacheCall(drizzleState.accounts[0]);
    this.setState({coinBaseBalanceDataKey})

  }

  render() {

    const { MyStringStore, GNIToken} = this.props.drizzleState.contracts;
    console.log(GNIToken)
    const myString = MyStringStore.myString[this.state.dataKey];
    console.log(MyStringStore)
    const balanceValue = GNIToken.balanceOf[this.state.coinBaseBalanceDataKey];

    return (<div>
              <p>  My stored string: { myString && myString.value} </p>;
              <p> My stored string: { balanceValue && balanceValue.value}   </p>
          </div>
  )}
}


export default ReadString;
