import { connect } from 'react-redux';
import {
  fetchProject,
  editProject,
  receiveProject
} from '../../../../actions/project_actions';
import { fetchProjects } from '../../../../actions/chain_actions/project_actions';
import ProjectDashboard from './project_dashboard';

const mapStateToProps = state => {
  const currentUser = state.session.currentUser;

  let isInvestor = false;
  currentUser.accounts.forEach( account => {
    if(account.account_type === "Investor") isInvestor = true;
  });


  return {
    projects: state.entities.projects,
    crowdsaleInstance: state.network.crowdsaleInstance,
    projectContract: state.network.project,
    currentUser,
    isInvestor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    receiveProject: project => dispatch(receiveProject(project)),
    fetchProjects: (crowdsaleInstance, projectContract) => dispatch(fetchProjects(crowdsaleInstance, projectContract)),
    fetchProject: project => dispatch(fetchProject(project)),
    editProject: project => dispatch(editProject(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDashboard);
