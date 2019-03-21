import { connect } from 'react-redux';
import { fetchProjectsAndCapitalRaised } from '../../../actions/chain_actions/crowdsale_actions';
import Dashboard from './dashboard';


const mapStateToProps = state => {
  return {
    projects: state.chain_data.projects,
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
