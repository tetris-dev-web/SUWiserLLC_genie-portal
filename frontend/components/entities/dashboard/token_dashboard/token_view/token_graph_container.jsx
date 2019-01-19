import React from 'react';
import * as d3 from 'd3';
import { userData, totalData } from '../../../../../util/token_data_util';
import './token_graph.scss';
import TokenGraph from './token_graph';
import TokenGraphTokenPath from './token_graph_token_path';
import TokenGraphXAxis from './token_graph_x_axis';

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
      d.totalTokens = +d.totalTokens;
      d.activeTokens = +d.activeTokens;
    });

    // totalData.forEach(d => {
    //   if (typeof d.date === 'string') d.date = parseTime(d.date);
    //   d.price = +d.price;
    //   d.balance = +d.balance;
    //   d.tokens = +d.tokens;
    // });

    this.state = {
      data: userData,
      toggle: true,
      totalData: totalData
    };

    this.margin = { top: 20, right: 50, bottom: 30, left: 50 };
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.bisectDate = d3.bisector(d => d.date).left;

    // this.x = d3.scaleTime().range([0, this.width]);
    // this.y1 = d3.scaleLinear().range([this.height, 0]);
    // this.y2 = d3.scaleLinear().range([this.height, 0]);

    // this.x.domain([data[0].date, data[data.length - 1].date]);
    // this.y1.domain([(data[0].price * 0.9), (data[data.length - 1].price * 1.1)]);
    // this.y2.domain([0, (data[data.length - 1].balance * 1.5)]);

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
    const { data } = this.state;
    console.log(data);
    const xScale = d3.scaleTime()
      .range([0, this.width])
      .domain([data[0].date, data[data.length - 1].date]);
      
    const yScaleToken = d3.scaleLinear()
      .range([this.height, 0])
      .domain([(data[0].totalTokens), (data[data.length - 1].totalTokens)]);

    const yScaleEarnings = d3.scaleLinear()
      .range([this.height, 0])
      .domain([(data[0].earnings), (data[data.length - 1].earnings)]);

    return (
      <div className="token-graph">
        <svg className="token-svg" viewBox="0 0 960 500" preserveAspectRatio="xMinYMin meet">
          <TokenGraphTokenPath xScale={xScale} yScale={yScaleToken} lineData={data} transform={`translate(${this.margin.left}, ${this.margin.top})`}/>
          <TokenGraphXAxis xScale={xScale}/>
        </svg>
        <TokenGraph currentUser={this.props.currentUser} data={this.state.data}/>
        <label className="switch">
          <input type="checkbox" onClick={this.toggleData} />
          <span className="slider round"></span>
        </label>
      </div>
    );
  }
}

export default TokenDashboard;
