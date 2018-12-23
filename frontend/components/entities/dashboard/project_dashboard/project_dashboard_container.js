import { connect } from 'react-redux';
import {
  fetchProjects,
  fetchProject,
  editProject
} from '../../../../actions/project_actions';
import ProjectDashboard from './project_dashboard';

const mapStateToProps = state => {
  const currentUser = state.session.currentUser;

  let isInvestor = false;
  currentUser.accounts.forEach( account => {
    if(account.account_type === "Investor") isInvestor = true;
  });


  return {
    projects: state.entitites.projects,
    crowdsaleInstance: state.network.crowdsaleInstance,
    currentUser,
    isInvestor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
    fetchProject: project => dispatch(fetchProject(project)),
    editProject: project => dispatch(editProject(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDashboard);
