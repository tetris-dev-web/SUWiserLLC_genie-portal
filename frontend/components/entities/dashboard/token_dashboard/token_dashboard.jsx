import React from 'react';
import TokenGraph from './token_graph';
import { userData, totalData } from '../../../../util/token_data_util';
import * as d3 from 'd3';

class TokenDashboard extends React.Component {
  constructor(props){
    super(props);

    const parseTime = d3.timeParse("%m/%d/%y");

    userData.forEach(d => {
      /* It will try to parse twice if relogging in, resulting in null,
      so you must check if it's a string */
      if (typeof d.date === 'string') d.date = parseTime(d.date);
      d.price = +d.price;
      d.balance = +d.balance;
      d.tokens = +d.tokens;
    });

    totalData.forEach(d => {
      if (typeof d.date === 'string') d.date = parseTime(d.date);
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
    return (
      <div className="graph-container">
        <TokenGraph currentUser={this.props.currentUser} data={this.state.data} />
        <label className="switch">
          <input type="checkbox" onClick={this.toggleData} />
          <span className="slider round"></span>
        </label>
      </div>
    );
  }
}

export default TokenDashboard;
