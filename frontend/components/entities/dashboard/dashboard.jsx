//libraries
import React from 'react';
//components
import DashboardGraph from './dashboard_graph_container';
//project graph types
import LocGraphContainer from './project_dashboard/loc_view/loc_graph_container';
import VotesGraphContainer from './project_dashboard/votes_view/votes_graph_container';
import { voteViewIcon, locViewIcon } from './project_dashboard/ProjectDashboardIcons';

//token graph types
import TokenGraph from './token_dashboard/token_view/token_graph';
import { byUserIcon, allUsersIcon } from './token_dashboard/TokenDashboardIcons';

import Loader from './loader/loader';
import TimeAxis from './time_axis/time_axis';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      endTime: null,
      howManyGraphsAreOpen: 0,
    }
    this.showAxis = this.showAxis.bind(this);
    this.addToNumberOfGraphsOpenBy = this.addToNumberOfGraphsOpenBy.bind(this);
    this.updateTimeAxis = this.updateTimeAxis.bind(this);
  }

  updateTimeAxis(newStartTime, newEndTime) {
    const { startTime, endTime } = this.state;
    this.setState({
      startTime: newStartTime ?
                  startTime ?
                      Math.min(newStartTime, startTime)
                      : newStartTime
                  : startTime,
      endTime: Math.max(endTime, newEndTime)
    })
  }

  addToNumberOfGraphsOpenBy(numberOfGraphs) {
    this.setState({
      howManyGraphsAreOpen: this.state.howManyGraphsAreOpen + numberOfGraphs
    })
  }

  showAxis () {
    return this.state.howManyGraphsAreOpen > 0?
            true
            : false
  }

  render () {
    const { startTime, endTime } = this.state;

      return (
        <div className="box">
          <DashboardGraph
            timeAxis={{startTime, endTime}}
            addToNumberOfGraphsOpenBy={this.addToNumberOfGraphsOpenBy}
            updateTimeAxis={this.updateTimeAxis}
            graphs={{
              "BY USER": <TokenGraph currentView="BY USER" />,
              "BY ALL": <TokenGraph currentView="BY ALL" />
            }}
            dashboardType="token"
            dashboardTitle="TOKEN DASHBOARD"
            dashboardDescription="The token dashboard tracks the performance of the portal's token, providing investors perspective on the deployment and earnings history of tokens in circulation."
            toggleView={this.toggleView}
            optionIcons={{
              "BY USER" : byUserIcon ,
              "BY ALL": allUsersIcon }}
            />
          {this.showAxis() ?
            <TimeAxis
              startTime={startTime}
              endTime={endTime}/>
            : <div> </div> }
          <DashboardGraph
            timeAxis={{startTime, endTime}}
            addToNumberOfGraphsOpenBy={this.addToNumberOfGraphsOpenBy}
            updateTimeAxis={this.updateTimeAxis}
            graphs={[
              LocGraphContainer, VotesGraphContainer]}
            dashboardType="project"
            dashboardTitle="PROJECT DASHBOARD"
            dashboardDescription="The project dashboard tracks the performance of the projects providing investors a comparative framework to provide direction on which investments to focus on."
            toggleView={this.toggleView}
            optionIcons={{
              "VOTE VIEW" : voteViewIcon ,
              "LOCATION VIEW": locViewIcon }}
            />
        </div>
      );

    return <div className="box"><Loader/></div>;
  }
};


export default Dashboard;
