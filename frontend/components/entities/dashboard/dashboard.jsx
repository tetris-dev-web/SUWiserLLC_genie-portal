import React from 'react';
import { connect } from 'react-redux';
import { fetchProjectsAndCapitalRaised } from '../../../actions/chain_actions/crowdsale_actions';
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

  componentDidMount() {
    this.props.fetchProjectsAndCapitalRaised(this.props.projectFactoryInstance,this.props.projectContract,this.props.crowdsaleInstance);
  }

  updateTimeAxis(newStartTime, newEndTime) {
    const { startTime, endTime } = this.state;
    // console.log(newStartTime, 'st update')
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

    // console.log("stte", this.state)
    if (Object.keys(this.props.projects).length) {
      return (
        <div className="box">
          <TokenDashboardContainer timeAxis={{startTime, endTime}} trackGraph={this.trackGraph} updateTimeAxis={this.updateTimeAxis}/>
          { this.showAxis() ? <TimeAxis startTime={startTime} endTime={endTime}/> : <div></div>}
          <ProjectDashboardContainer timeAxis={{startTime, endTime}} trackGraph={this.trackGraph} updateTimeAxis={this.updateTimeAxis}/>
        </div>
      );
    }
    return <Loader/>;
  }
};

const mapStateToProps = state => {
  return {
    projects: state.entities.projects,
    projectFactoryInstance: state.network.projectFactoryInstance,
    crowdsaleInstance: state.network.crowdsaleInstance,
    projectContract: state.network.projectContract
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProjectsAndCapitalRaised: (projectFactoryInstance, projectContract, crowdsaleInstance) => dispatch(fetchProjectsAndCapitalRaised(projectFactoryInstance, projectContract, crowdsaleInstance))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
