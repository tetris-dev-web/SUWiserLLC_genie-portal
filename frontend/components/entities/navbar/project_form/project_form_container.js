import { connect } from 'react-redux';
import ProjectForm from './project_form';
import {
  createProject
} from '../../../../actions/chain_actions/project_actions';
import { clearProjectErrors } from '../../../../actions/project_actions';

const mapStateToProps = state => {
  const projects = Object.keys(state.entities.projects).reduce((pitchedProjects, projectTitle) => {
    const project = state.entities.projects[projectTitle];
    if (project.instance) {
      pitchedProjects[projectTitle] = project;
    }
    return pitchedProjects;
  }, {});

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
