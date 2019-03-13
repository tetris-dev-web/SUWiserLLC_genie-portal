import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { fetchAllTokenTransferLogs, receiveTokenTransfer } from '../../../../../actions/chain_actions/token_actions';
import { fetchReceiveDividendsLogs, receiveReceiveDividendsLog } from '../../../../../actions/chain_actions/dividends_actions';
import { userData, totalData } from '../../../../../util/token_data_util';
import { formatTokenGraphData } from '../../../../../util/propsUtil';
import './token_graph.scss';
import TokenGraphTokenPath from './token_graph_token_path';
import TokenGraphXAxis from './token_graph_x_axis';
import TokenGraphOverlay from './token_graph_overlay';
import Loader from '../../loader/loader';
import '../../loader/loader.scss';
import { merge } from 'lodash';

const mapStateToProps = (state, ownProps) => {
  // const parseTime = d3.timeParse("%m/%d/%y");
  //
  // userData.forEach(d => {
  //   /* It will try to parse twice if relogging in, resulting in null,
  //   so you must check if it's a string */
  //   if (typeof d.date === 'string') d.date = parseTime(d.date);
  //   d.price = +d.price;
  //   d.balance = +d.balance;
  //   d.totalTokens = +d.totalTokens;
  //   d.activeTokens = +d.activeTokens;
  // });
  //
  // totalData.forEach(d => {
  //   if (typeof d.date === 'string') d.date = parseTime(d.date);
  //   d.price = +d.price;
  //   d.balance = +d.balance;
  //   d.totalTokens = +d.totalTokens;
  //   d.activeTokens = +d.activeTokens;
  // });
  let data;

  if (state.entities.tokenTransfers.inactiveTransferLogs && state.entities.dividendsHistory) {
    data = formatTokenGraphData(
      state.entities.tokenTransfers,
      state.entities.dividendsHistory,
      ownProps.currentViewType,
      state.network.account
    );
  }
  console.log("data", data)
  return {
    data,
    // data: ownProps.currentViewType === "BY USER"? userData : totalData,
    dividends: state.network.dividendsInstance,
    inactiveToken: state.network.inactiveTokenInstance,
    activeToken: state.network.activeTokenInstance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllTokenTransferLogs: (inactiveToken, activeToken) => dispatch(fetchAllTokenTransferLogs(inactiveToken, activeToken)),
    receiveTokenTransfer: (event) => dispatch(receiveTokenTransfer(event)),
    fetchReceiveDividendsLogs: (dividends) => dispatch(fetchReceiveDividendsLogs(dividends)),
    receiveReceiveDividendsLog: (event) => dispatch(receiveReceiveDividendsLog(event))
  }
}

class TokenGraph extends React.Component {
  constructor(){
    super();

    this.state = {
      showTimeAxis: false,
      componentVisible: "invisible"
    };

    this.margin = { top: 20, right: 50, bottom: 30, left: 50 };
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.watchTokenTransfer = this.watchTokenTransfer.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllTokenTransferLogs(this.props.inactiveToken, this.props.activeToken);
    this.props.fetchReceiveDividendsLogs(this.props.dividends);
    this.watchTokenTransfer(this.props.inactiveToken, 'inactive');
    this.watchTokenTransfer(this.props.activeToken, 'active');
    this.watchReceiveDividends();
    setTimeout(() => {
      this.setState({ componentVisible: "" });
    }, this.props.wait);
  }

  toggleTimeAxis(boolean) {
    return () => {
      this.setState({showTimeAxis: boolean});
    };
  }

  watchTokenTransfer (token, type) {
    token.Transfer().watch((error, event) => {
      this.props.receiveTokenTransfer({data: event, type});
    })
  }

  watchReceiveDividends () {
    const { dividends } = this.props;
    dividends.ReceiveDividends().watch((error, event) => {
      this.props.receiveReceiveDividendsLog(event);
    })
  }

  render() {
    const { data } = this.props;

    if (data) {
      const { showTimeAxis, componentVisible } = this.state;

      const xScale = d3.scaleTime()
      .range([0, this.width])
      .domain([data[0].date, data[data.length - 1].date]);

      const yScaleTokens = d3.scaleLinear()
      .range([this.height, 0])
      .domain([(data[0].activeTokens), (data[data.length - 1].totalTokens)]);

      const yScaleEarnings = d3.scaleLinear()
      .range([this.height, 0])
      .domain([(data[0].earnings), (data[data.length - 1].earnings)]);

      const TokenGraphTotalTokenPath = <TokenGraphTokenPath
        pathType="total-tokens"
        lineData={data}
        lineScale={
          d3.line()
          .x(d => xScale(d.date))
          .y(d => yScaleTokens(d.totalTokens))
          .curve(d3.curveMonotoneX)
        }
        transform={`translate(${this.margin.left}, ${this.margin.top})`} />;

      const TokenGraphActiveTokenPath = <TokenGraphTokenPath
        pathType="active-tokens"
        lineData={data}
        lineScale={
          d3.line()
          .x(d => xScale(d.date))
          .y(d => yScaleTokens(d.activeTokens))
          .curve(d3.curveStepAfter)
        }
        opacity="0.5"
        transform={`translate(${this.margin.left}, ${this.margin.top})`} />;

      const TokenGraphTimeAxis = <TokenGraphXAxis
        xScale={xScale}
        transform={`translate(${this.margin.left}, ${this.height + this.margin.bottom + this.margin.top})`} />;

      return (
        <div className={`token-graph ${componentVisible}`}
          onMouseEnter={this.toggleTimeAxis(true)}
          onMouseLeave={this.toggleTimeAxis(false)}>
          <svg className="token-svg" viewBox="0 0 960 500" preserveAspectRatio="xMinYMin meet">
            {TokenGraphTotalTokenPath}
            {TokenGraphActiveTokenPath}
            {showTimeAxis && TokenGraphTimeAxis}
            <TokenGraphOverlay
              data={data}
              width={this.width}
              height={this.height}
              xScale={xScale}
              yScaleTokens={yScaleTokens}
              yScaleEarnings={yScaleEarnings}
              transform={`translate(${this.margin.left}, ${this.margin.top})`}/>
          </svg>
        </div>
      );
    }
    else {
      console.log("should see loader")
      return <Loader/>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenGraph);



// return <Loader/>;//this will be replcced with a loader
