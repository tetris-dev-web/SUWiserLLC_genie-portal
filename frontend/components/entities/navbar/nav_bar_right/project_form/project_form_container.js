import ProjectForm from './project_form';
import { connect } from 'react-redux';
import {
  createProject,
  pitchProjectForDemo
} from '../../../../../actions/chain_actions/project_actions';
import { updateTransactionModal } from '../../../../../actions/ui_actions';

const mapStateToProps = state => {
  const projects = Object.keys(state.entities.projectGraph.projects).reduce((pitchedProjects, projectTitle) => {
    const project = state.entities.projectGraph.projects[projectTitle];
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
    pitchProjectForDemo: params => pitchProjectForDemo(params),
    clearProjectErrors: () => dispatch(clearProjectErrors()),
    updateTransactionModal: modalInfo => dispatch(updateTransactionModal(modalInfo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectForm);
