import { connect } from 'react-redux';
import ProjectForm from './project_form';
import {
  createProject
} from '../../../../actions/chain_actions/project_actions';
import { clearProjectErrors } from '../../../../actions/project_actions';

const mapStateToProps = state => {
  const projects = state.entities.projects.filter(project => {
    return typeof project.address !== "undefined";
  });

  return {
    projects,
    currentUser: state.session.currentUser,
    errors: state.errors.project,
    crowdsaleInstance: state.network.crowdsaleInstance,
    account: state.network.account
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: (crowdsale, projectData, account) => dispatch(createProject(crowdsale, projectData, account)),
    clearProjectErrors: () => dispatch(clearProjectErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectForm);
