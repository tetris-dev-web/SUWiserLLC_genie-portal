import React, { useState, useEffect } from "react";
import ToggleOptions from "./dashboard_toggle_options/toggle_options";
import LoginPrompt from "./login_prompt/login_prompt";
import "./dashboard_graph.scss";
const DashboardGraph = (props) => {
  const [currentView, setCurrentView] = useState(null);
  const {
    fetchStartAndEndTimes,
    dashboardType,
    showAxis,
    graphsNeedingAxis,
    web,
    account,
    graphs,
    currentUser,
    dashboardTitle,
    viewOptions,
    optionIcons,
    dashboardDescription,
  } = props;

  useEffect(() => {
    fetchStartAndEndTimes();
  }, []);

  const toggleView = (currentView0) => {
    const newView = currentView0 === currentView ? null : currentView0;
    setCurrentView(newView);

    const dashboardIsClosed = newView === null ? true : false;
    graphsNeedingAxis.includes(newView)
      ? showAxis(true, dashboardIsClosed, dashboardType)
      : showAxis(false, dashboardIsClosed, dashboardType);
  };
  let currentGraph;

  currentView === null ? (currentGraph = <div />) : (currentGraph = graphs[currentView]);

  if (currentUser) {
    return (
      <div className={`dashboard-${dashboardType}`}>
        <ToggleOptions
          dashboardType={dashboardType}
          dashboardTitle={dashboardTitle}
          dashboardDescription={dashboardDescription}
          toggleView={toggleView}
          currentView={currentView}
          viewOptions={viewOptions}
          optionIcons={optionIcons}
        />
        <div className="graph-container">
          {!web3 || (currentView === 0 && !account) ? <LoginPrompt /> : currentGraph}
        </div>
      </div>
    );
  } else {
    return <div className="graph-container graph">{dashboardTitle}</div>;
  }
};

import { connect } from "react-redux";
import { fetchStartAndEndTimes as fetchStartAndEndTimes2 } from "../../../actions/chain_actions/time_axis_actions";

const mapStateToProps = (state) => {
  return {
    web3: state.network.web3,
    account: state.network.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStartAndEndTimes: () => dispatch(fetchStartAndEndTimes2()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGraph);
