import { connect } from 'react-redux';
// import {
//   fetchProject,
//   editProject,
//   receiveProject
// } from '../../../../actions/project_actions';
import { fetchProjectsAndCapitalRaised } from '../../../../actions/chain_actions/crowdsale_actions';
import {
  fetchProjects,
  fetchProject
} from '../../../../actions/chain_actions/project_actions';
import ProjectDashboard from './project_dashboard';
import { fetchTokenPurchaseLogs } from '../../../../actions/chain_actions/token_actions';

const mapStateToProps = state => {
  // const currentUser = state.session.currentUser;
  //
  let isInvestor = false;
  // currentUser.accounts.forEach( account => {
  //   if(account.account_type === "Investor") isInvestor = true;
  // });


  return {
    web3: state.network.web3,
    // projects: state.entities.projects,
    crowdsaleInstance: state.network.crowdsaleInstance,
    projectContract: state.network.projectContract,
    projectFactoryInstance: state.network.projectFactoryInstance,
    capitalBeingRaised: state.entities.capitalBeingRaised,
    // currentUser,
    isInvestor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTokenPurchaseLogs: (crowdsale, web3) => dispatch(fetchTokenPurchaseLogs(crowdsale, web3)),
    // receiveProject: project => dispatch(receiveProject(project)),
    fetchProjectsAndCapitalRaised: (projectFactoryInstance, projectContract, crowdsaleInstance) => dispatch(fetchProjectsAndCapitalRaised(projectFactoryInstance, projectContract, crowdsaleInstance)),
    fetchProject: (projectFactoryInstance, projectContract, id, address) => dispatch(fetchProject(projectFactoryInstance, projectContract, id, address)),
    // editProject: project => dispatch(editProject(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDashboard);
