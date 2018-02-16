import { connect } from 'react-redux';
import ProjectForm from './project_form';
import {
  createProject,
  clearProjectErrors
} from '../../../../actions/project_actions';

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser,
    errors: state.errors.project,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => dispatch(createProject(project)),
    clearProjectErrors: () => dispatch(clearProjectErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectForm);
