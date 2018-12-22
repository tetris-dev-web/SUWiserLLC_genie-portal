import React, { Component } from 'react';

class SetString extends Component {
  constructor (props) {
    super(props);
    this.state = {stackId : null};
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getTxStatus = this.getTxStatus.bind(this);
  }

  handleKeyDown (e) {
    if(e.keycode=13){
      this.setValue(e.target.value);
    }
  }

  setValue (value) {
    const {drizzle, drizzleState} = this.props;
    const contract = drizzle.contracts.MyStringStore;
    const stackId = contract.methods['set'].cacheSend(value, {
      from: drizzleState.accounts[0]
    });
    this.setState({stackId});
  }

  handleSubmit(){
    console.log(value)
  }


  getTxStatus () {
    const {transactions, transactionStack} = this.props.drizzleState;
    const txHash = transactionStack[this.state.stackId];

    if(!txHash)return null;
    return `Transaction status: ${transactions[txHash].status}`;
  }

  render(){

    return(
      <div>
        <input type="text" className="testInput"  onKeyDown={this.handleKeyDown} />
        <button className="testButton" onClick={this.handleSubmit}>click me</button>/>
        <div>{this.getTxStatus()}</div>
      </div>
    )
  }
}

export default SetString
