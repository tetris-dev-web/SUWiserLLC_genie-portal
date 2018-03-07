import React from 'react';
import TokenGraph from './token_graph';
import { userData, totalData } from '../../../util/token_data_util'

class TokenDashboard extends React.Component {
  constructor(props){
    super(props);

    const parseTime = d3.timeParse("%m/%d/%y");

    userData.forEach(d => {
      d.date = parseTime(d.date);
      d.price = +d.price;
      d.balance = +d.balance;
      d.tokens = +d.tokens;
    });

    totalData.forEach(d => {
      d.date = parseTime(d.date);
      d.price = +d.price;
      d.balance = +d.balance;
      d.tokens = +d.tokens;
    });

    this.state = {
      data: userData,
      toggle: true,
      totalData: totalData
    };

    this.toggleData = this.toggleData.bind(this);
  }

  toggleData() {
    if (this.state.toggle) {
      this.setState({
        data: totalData,
        toggle: false
      });

    } else {
      this.setState({
        data: userData,
        toggle: true
      });

    }
  }

  render() {
    if (this.props.currentUser) {
      return (
        <div className="graph-container">
          <TokenGraph currentUser={this.props.currentUser} data={this.state.data} />
          <label className="switch">
            <input type="checkbox" onClick={this.toggleData} />
            <span className="slider round"></span>
          </label>
        </div>
      );
    } else {
      return (
        <div>
          <TokenGraph data={this.state.totalData} />
        </div>
      );
    }

  }
}

export default TokenDashboard;
