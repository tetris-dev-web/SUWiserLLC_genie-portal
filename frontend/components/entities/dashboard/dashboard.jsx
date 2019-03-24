import React from 'react';
import TokenDashboardContainer from './token_dashboard/token_dashboard_container';
import ProjectDashboardContainer from './project_dashboard/project_dashboard_container';
import TimeAxis from './time_axis/time_axis';
import PropTypes from 'prop-types';
import Loader from './loader/loader';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      endTime: null,
      tokenGraphOpen: null,
      projectGraphOpen: null
    }
    this.showAxis = this.showAxis.bind(this);
    this.trackGraph = this.trackGraph.bind(this);
    this.updateTimeAxis = this.updateTimeAxis.bind(this);
  }

  updateTimeAxis(newStartTime, newEndTime) {
    const { startTime, endTime } = this.state;
    this.setState({
      startTime: newStartTime ? startTime ? Math.min(newStartTime, startTime) : newStartTime : startTime,
      endTime: Math.max(endTime, newEndTime)
    })
  }

  trackGraph (graphType, openStatus) {
    this.setState({
      [`${graphType}Open`]: openStatus
    })
  }

  showAxis () {
    return this.state.tokenGraphOpen || this.state.projectGraphOpen
  }

  render () {
    const { startTime, endTime } = this.state;

    return (
      <div className="box">
        <TokenDashboardContainer timeAxis={{startTime, endTime}} trackGraph={this.trackGraph} updateTimeAxis={this.updateTimeAxis}/>
        { this.showAxis() ? <TimeAxis startTime={startTime} endTime={endTime}/> : <div></div>}
        <ProjectDashboardContainer timeAxis={{startTime, endTime}} trackGraph={this.trackGraph} updateTimeAxis={this.updateTimeAxis}/>
      </div>
    );
  }
};


export default Dashboard;
