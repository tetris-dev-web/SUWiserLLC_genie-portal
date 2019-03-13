import React from 'react';
import { connect } from 'react-redux';
import { fetchProjectsAndCapitalRaised } from '../../../actions/chain_actions/crowdsale_actions';
import TokenDashboardContainer from './token_dashboard/token_dashboard_container';
import ProjectDashboardContainer from './project_dashboard/project_dashboard_container';
import PropTypes from 'prop-types';
import Loader from './loader/loader';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProjectsAndCapitalRaised(this.props.projectFactoryInstance,this.props.projectContract,this.props.crowdsaleInstance);
  }

  render () {
    return Object.keys(this.props.projects).length ?  <div className="box"><TokenDashboardContainer /><ProjectDashboardContainer /></div> : <Loader/>;
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
