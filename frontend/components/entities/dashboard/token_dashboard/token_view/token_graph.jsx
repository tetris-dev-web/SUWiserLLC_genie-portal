import React from 'react';

import * as d3 from 'd3';



import './token_graph.scss';
import TokenGraphTokenPath from './token_graph_token_path';
import TokenGraphXAxis from './token_graph_x_axis';
import TokenGraphOverlay from './token_graph_overlay';
import Loader from '../../loader/loader';
import '../../loader/loader.scss';


class TokenGraph extends React.Component {
  constructor(){
    super();

    this.state = {
      showTimeAxis: false,
      componentVisible: "invisible"
    };

    this.margin = { top: 20, right: 50, bottom: 30, left: 50 };
    this.width = (960 - this.margin.left - this.margin.right);
    this.height = (400 - this.margin.top - this.margin.bottom);
    this.watchTokenTransfer = this.watchTokenTransfer.bind(this);
    this.watchReceiveDividends = this.watchReceiveDividends.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.watchTokenTransfer(this.props.inactiveToken, 'inactive');
    this.watchTokenTransfer(this.props.activeToken, 'active');
    this.watchReceiveDividends();

    setTimeout(() => {
      this.setState({ componentVisible: "" });
    }, this.props.wait);
  }

  componentDidUpdate (prevProps) {
    const prevData = prevProps.data;
    const prevViewType = prevProps.currentView;
    const { data, currentView } = this.props;

    if (currentView !== prevViewType) {
      this.fetchData()
    }
  }

  fetchData () {
    this.props.fetchTokenGraphData(this.props.currentView, this.props.account);
  }

  toggleTimeAxis(boolean) {
    return () => {
      this.setState({showTimeAxis: boolean});
    };
  }

  watchTokenTransfer (token, type) {
    console.log('watching token transfer')
    token.Transfer().watch((error, event) => {
      console.log('event', event)
      this.props.receiveTokenTransfer({event, account: this.props.account, type})
    })
  }

  watchReceiveDividends () {
    const { dividends } = this.props;
    dividends.ReceiveDividends().watch((error, event) => {
      this.props.receiveReceiveDividends(event)
    })
  }

  render() {
    const { data, startTime, endTime} = this.props;
    if (data) {
      const { showTimeAxis, componentVisible } = this.state;
      // console.log(data)
      const timeScale = d3.scaleTime()
      .domain(new Date(2019, 3, 15), new Date(2019, 4, 15))
      .range([0, this.width])

      const xScale = d3.scaleTime()
      .range([0, this.width])
      .domain([startTime, endTime]);

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
          <svg className="token-svg" viewBox="0 0 960 415" preserveAspectRatio="xMinYMin meet">
            {TokenGraphTotalTokenPath}
            {TokenGraphActiveTokenPath}
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



// {showTimeAxis && TokenGraphTimeAxis}


// return <Loader/>;//this will be replcced with a loader

/// CONTAINER
import { fetchTokenGraphData, receiveTokenTransfer } from '../../../../../actions/chain_actions/token_actions';
import { receiveReceiveDividends } from '../../../../../actions/chain_actions/dividends_actions';
import { fetchStartAndEndTimes } from '../../../../../actions/chain_actions/time_axis_actions';
import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => {
  const { currentView } = ownProps;
  const tokenGraph = state.chain_data.tokenGraph;
  const { byUser, byAll } = tokenGraph;
  const dataLoaded = Object.keys(byAll).length && currentView === 'BY ALL' || Object.keys(byUser).length && currentView === 'BY USER';


  const { startTime, endTime } = fetchStartAndEndTimes()


  return {
    data: dataLoaded ? currentView === 'BY USER' ? tokenGraph.byUser : tokenGraph.byAll : null,
    dividends: state.network.dividendsInstance,
    inactiveToken: state.network.inactiveTokenInstance,
    activeToken: state.network.activeTokenInstance,
    account: state.network.account,
    startTime: startTime,
    endTime : endTime
  };
};


const mapDispatchToProps = dispatch => {
  return {
    fetchTokenGraphData: (currentView, account) => dispatch(fetchTokenGraphData(currentView, account)),
    receiveTokenTransfer: (event) => dispatch(receiveTokenTransfer(event)),
    receiveReceiveDividends: (event) => dispatch(receiveReceiveDividends(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenGraph);
