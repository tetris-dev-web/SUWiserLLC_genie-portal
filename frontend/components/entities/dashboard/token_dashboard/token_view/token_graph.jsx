import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./token_graph.scss";
import TokenGraphTokenPath from "./token_graph_token_path";
import TokenGraphXAxis from "./token_graph_x_axis";
import TokenGraphOverlay from "./token_graph_overlay";
import Loader from "../../loader/loader";
import "../../loader/loader.scss";

import {
  fetchTokenGraphData,
  receiveTokenTransfer,
} from "../../../../../actions/chain_actions/token_actions";
import { receiveReceiveDividends } from "../../../../../actions/chain_actions/dividends_actions";
import { fetchStartAndEndTimes } from "../../../../../actions/chain_actions/time_axis_actions";
import { connect } from "react-redux";
import { merge } from "lodash";

const TokenGraph = (props) => {
  const prevProps = useRef(props).current;

  const [state, setState] = useState({
    showTimeAxis: false,
    componentVisible: "invisible",
  });

  const { inactiveToken, activeToken, wait } = props;

  const margin = { top: 20, right: 50, bottom: 30, left: 50 };
  const width = 960 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  useEffect(() => {
    fetchData();
    watchTokenTransfer(inactiveToken, "inactive");
    watchTokenTransfer(activeToken, "active");
    watchReceiveDividends();

    setTimeout(() => {
      setState(merge({}, state, { componentVisible: "" }));
    }, wait);
  }, []);

  useEffect(() => {
    const { data, currentView } = props;
    if (currentView !== prevProps.currentView) {
      fetchData();
    }
  }, [props]);

  const fetchData = () => {
    props.fetchTokenGraphData(props.currentView, props.account);
  };

  const toggleTimeAxis = (boolean) => {
    return () => {
      setState(merge({}, state, { showTimeAxis: boolean }));
    };
  };

  const watchTokenTransfer = (token, type) => {
    console.log("watching token transfer");
    token.Transfer().watch((error, event) => {
      console.log("event", event);
      receiveTokenTransfer({ event, account: props.account, type });
    });
  };
  const watchReceiveDividends = () => {
    const { dividends, receiveReceiveDividends } = props;
    dividends.ReceiveDividends().watch((error, event) => {
      receiveReceiveDividends(event);
    });
  };

  const { data, startTime, endTime } = props;

  if (data && data.length) {
    const timeScale = d3
      .scaleTime()
      .domain(new Date(2019, 3, 15), new Date(2019, 4, 15))
      .range([0, width]);

    const xScale = d3.scaleTime().range([0, width]).domain([startTime, endTime]);

    const yScaleTokens = d3
      .scaleLinear()
      .range([height, 0])
      .domain([data[0].activeTokens, data[data.length - 1].totalTokens]);

    const yScaleEarnings = d3
      .scaleLinear()
      .range([height, 0])
      .domain([data[0].earnings, data[data.length - 1].earnings]);

    const TokenGraphTotalTokenPath = (
      <TokenGraphTokenPath
        pathType="total-tokens"
        lineData={data}
        lineScale={d3
          .line()
          .x((d) => xScale(d.date))
          .y((d) => yScaleTokens(d.totalTokens))
          .curve(d3.curveMonotoneX)}
        transform={`translate(${margin.left}, ${margin.top})`}
      />
    );

    const TokenGraphActiveTokenPath = (
      <TokenGraphTokenPath
        pathType="active-tokens"
        lineData={data}
        lineScale={d3
          .line()
          .x((d) => xScale(d.date))
          .y((d) => yScaleTokens(d.activeTokens))
          .curve(d3.curveStepAfter)}
        opacity="0.5"
        transform={`translate(${margin.left}, ${margin.top})`}
      />
    );

    const TokenGraphTimeAxis = (
      <TokenGraphXAxis
        xScale={xScale}
        transform={`translate(${margin.left}, ${height + margin.bottom + margin.top})`}
      />
    );

    return (
      <div
        className={`token-graph ${state.componentVisible}`}
        onMouseEnter={toggleTimeAxis(true)}
        onMouseLeave={toggleTimeAxis(false)}
      >
        <svg className="token-svg" viewBox="0 0 960 415" preserveAspectRatio="xMinYMin meet">
          {TokenGraphTotalTokenPath}
          {TokenGraphActiveTokenPath}
          <TokenGraphOverlay
            data={data}
            width={width}
            height={height}
            xScale={xScale}
            yScaleTokens={yScaleTokens}
            yScaleEarnings={yScaleEarnings}
            transform={`translate(${margin.left}, ${margin.top})`}
          />
        </svg>
      </div>
    );
  } else if (data) {
    return <p className="token-graph-placeholder">No token history yet</p>;
  } else {
    console.log("should see loader");
    return <Loader />;
  }
};

const mapStateToProps = (state, ownProps) => {
  const { currentView } = ownProps;
  const tokenGraph = state.chain_data.tokenGraph;
  const { byUser, byAll } = tokenGraph;
  const dataLoaded = (byAll && currentView === "BY ALL") || (byUser && currentView === "BY USER");

  const { startTime, endTime } = state.chain_data.timeAxis;

  return {
    data: dataLoaded ? (currentView === "BY USER" ? tokenGraph.byUser : tokenGraph.byAll) : null,
    dividends: state.network.dividendsInstance,
    inactiveToken: state.network.inactiveTokenInstance,
    activeToken: state.network.activeTokenInstance,
    account: state.network.account,
    startTime: startTime,
    endTime: endTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTokenGraphData: (currentView, account) =>
      dispatch(fetchTokenGraphData(currentView, account)),
    receiveTokenTransfer: (event) => dispatch(receiveTokenTransfer(event)),
    receiveReceiveDividends: (event) => dispatch(receiveReceiveDividends(event)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenGraph);
