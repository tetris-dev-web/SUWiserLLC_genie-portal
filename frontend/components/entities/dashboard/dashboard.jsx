//libraries
import React from 'react';
//components
import DashboardGraph from './dashboard_graph_container';
//project graph types
import LocGraphContainer from './project_dashboard/loc_view/loc_graph_container';
import VotesGraphContainer from './project_dashboard/votes_view/votes_graph_container';
import {voteViewIcon, locViewIcon} from './project_dashboard/ProjectDashboardIcons';

//token graph types
import TokenGraph from './token_dashboard/token_view/token_graph';
import {byUserIcon, allUsersIcon} from './token_dashboard/TokenDashboardIcons';

import Loader from './loader/loader';
import TimeAxis from './time_axis/time_axis';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGraph: false,
      LowerDashboardisClosed: true,
      UpperDashboardisClosed: true,
      LowerGraphNeedsAnAxis: false,
      UpperGraphNeedsAnAxis: false
      // OtherDashboardNeedsanAxis: false,
    }
    this.showAxis = this.showAxis.bind(this);
  }

  showAxis(ThisDashboardNeedsanAxis, dashboardIsClosed, dashboardType) {

    let {LowerDashboardisClosed, UpperDashboardisClosed, LowerGraphNeedsAnAxis, UpperGraphNeedsAnAxis} = this.state

    if (dashboardType === "token") {
      UpperDashboardisClosed = dashboardIsClosed
      UpperGraphNeedsAnAxis = ThisDashboardNeedsanAxis
      this.setState({UpperDashboardisClosed: dashboardIsClosed, UpperGraphNeedsAnAxis: ThisDashboardNeedsanAxis})
    }
    if (dashboardType === "project") {
      LowerDashboardisClosed = dashboardIsClosed
      LowerGraphNeedsAnAxis = ThisDashboardNeedsanAxis
      this.setState({LowerDashboardisClosed: dashboardIsClosed, LowerGraphNeedsAnAxis: ThisDashboardNeedsanAxis})
    }

    if (LowerDashboardisClosed && !UpperDashboardisClosed) {
      if (UpperGraphNeedsAnAxis) {
        this.setState({showAxis: true})
      } else {
        this.setState({showAxis: false})
      }
    } else if (UpperDashboardisClosed && !LowerDashboardisClosed) {
      if (LowerGraphNeedsAnAxis) {
        this.setState({showAxis: true})
      } else {
        this.setState({showAxis: false})
      }
    } else if (!LowerDashboardisClosed && !UpperDashboardisClosed) {
      if (UpperGraphNeedsAnAxis || LowerGraphNeedsAnAxis) {
        this.setState({showAxis: true})
      } else {
        this.setState({showAxis: false})
      }
    } else {
      this.setState({showAxis: false})
    }

  }

  render() {

    return (<div className="box">
      <DashboardGraph showAxis={this.showAxis} updateTimeAxis={this.updateTimeAxis} graphs={{
          "BY USER" : <TokenGraph currentView="BY USER"/>,
          "BY ALL" : <TokenGraph currentView="BY ALL"/>
        }} graphsNeedingAxis={["BY USER", "BY ALL"]} dashboardType="token" dashboardTitle="TOKEN DASHBOARD" dashboardDescription="The token dashboard tracks the performance of the portal's token, providing investors perspective on the deployment and earnings history of tokens in circulation." toggleView={this.toggleView} optionIcons={{
          "BY USER" : byUserIcon,
          "BY ALL" : allUsersIcon
        }}/> {
        this.state.showAxis
          ? <TimeAxis/>
          : <div></div>
      }
      <DashboardGraph showAxis={this.showAxis} updateTimeAxis={this.updateTimeAxis} graphs={{
          "LOCATION VIEW" : <LocGraphContainer currentView="LOCATION VIEW"/>,
          "VOTE VIEW" : <VotesGraphContainer currentView="VOTE VIEW"/>
        }} graphsNeedingAxis={["VOTE VIEW"]} dashboardType="project" dashboardTitle="PROJECT DASHBOARD" dashboardDescription="The project dashboard tracks the performance of the projects providing investors a comparative framework to provide direction on which investments to focus on." toggleView={this.toggleView} optionIcons={{
          "VOTE VIEW" : voteViewIcon,
          "LOCATION VIEW" : locViewIcon
        }}/>
    </div>);

    return <div className="box"><Loader/></div>;
  }
};

export default Dashboard;
