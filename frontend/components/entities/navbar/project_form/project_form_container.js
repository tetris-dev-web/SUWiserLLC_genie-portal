import ProjectForm from './project_form';
import { connect } from 'react-redux';
import {
  createProject
} from '../../../../actions/chain_actions/project_actions';
import { clearProjectErrors } from '../../../../actions/project_actions';

const mapStateToProps = state => {
  const projects = Object.keys(state.chain_data.projects).reduce((pitchedProjects, projectTitle) => {
    const project = state.chain_data.projects[projectTitle];
    if (project.instance) {
      pitchedProjects[projectTitle] = project;
    }
    return pitchedProjects;
  }, {});

  return {
    projects,
    currentUser: state.session.currentUser,
    errors: state.errors.project,
    projectFactoryInstance: state.network.projectFactoryInstance,
    account: state.network.account
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: (projectFactoryInstance, params, pdf_file, account) => createProject(projectFactoryInstance, params, pdf_file, account),
    clearProjectErrors: () => dispatch(clearProjectErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectForm);
