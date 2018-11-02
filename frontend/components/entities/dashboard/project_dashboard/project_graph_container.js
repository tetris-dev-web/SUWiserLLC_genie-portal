import { connect } from 'react-redux';
import {
  fetchProjects,
  fetchProject,
  editProject
} from '../../../../actions/project_actions';
import ProjectDashboard from './project_dashboard';

const mapStateToProps = state => {
  const currUser = state.session.currentUser;
  let isInvestor = false;
  currUser.accounts.forEach( account => {
    if(account.account_type === "Investor") isInvestor = true;
  });

  return {
    currentUser: currUser,
    isInvestor: isInvestor,
    projects: state.entities.projects
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
