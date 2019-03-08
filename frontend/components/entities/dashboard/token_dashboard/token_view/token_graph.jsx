import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { fetchAllTokenTransferLogs, receiveTokenTransfer } from '../../../../../actions/chain_actions/token_actions';
// import { userData, totalData } from '../../../../../util/token_data_util';
import { getTokenHistory } from '../../../../../util/propsUtil';
import './token_graph.scss';
import TokenGraphTokenPath from './token_graph_token_path';
import TokenGraphXAxis from './token_graph_x_axis';
import TokenGraphOverlay from './token_graph_overlay';
import { merge } from 'lodash';

const mapStateToProps = (state, ownProps) => {
  let data;

  if (state.entities.tokenTransfers.inactiveTransferLogs && state.entities.dividendsLogs) {
    data = formatTokenGraphData(
      state.entities.tokenTransfers,
      state.entities.dividendsLogs,
      ownProps.currentViewType,
      state.network.account
    );
  }

  return {
    data,
    inactiveToken: state.network.inactiveTokenInstance,
    activeToken: state.network.activeTokenInstance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllTokenTransferLogs: (inactiveToken, activeToken) => dispatch(fetchAllTokenTransferLogs(inactiveToken, activeToken)),
    receiveTokenTransfer: (event) => dispatch(receiveTokenTransfer(event))
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
    this.watchTokenTransfer(this.props.inactiveToken, 'inactive');
    this.watchTokenTransfer(this.props.activeToken, 'active');
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
      return [];//this will be replcced with a loader
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenGraph);
