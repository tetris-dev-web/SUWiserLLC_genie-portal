import React from 'react';
import TokenGraph from './token_graph';
import { data1, data2, data3 } from '../../../util/token_data_util'

class TokenDashboard extends React.Component {
  constructor(props){
    super(props);

    const parseTime = d3.timeParse("%m/%d/%y");

    data1.forEach(d => {
      d.date = parseTime(d.date);
      d.price = +d.price;
      d.balance = +d.balance;
      d.tokens = +d.tokens;
    });

    data2.forEach(d => {
      d.date = parseTime(d.date);
      d.price = +d.price;
      d.balance = +d.balance;
      d.tokens = +d.tokens;
    });

    data3.forEach(d => {
      d.date = parseTime(d.date);
      d.price = +d.price;
      d.balance = +d.balance;
      d.tokens = +d.tokens;
    });

    this.state = {
      data: data1,
      toggle: true,
      totalData: data3
    };

    this.toggleData = this.toggleData.bind(this);
  }

  toggleData() {
    if (this.state.toggle) {
      this.setState({
        data: data2,
        toggle: false
      });

    } else {
      this.setState({
        data: data1,
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
