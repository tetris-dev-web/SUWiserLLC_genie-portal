import { connect } from 'react-redux';
import {
  fetchProjects,
  fetchProject
} from '../../../actions/project_actions';
import ProjectDashboard from './project_dashboard';

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser,
    projects: state.entities.projects,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
    fetchProject: project => dispatch(fetchProject(project)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDashboard);
