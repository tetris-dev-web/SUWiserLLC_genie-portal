import { connect } from 'react-redux';
import {
  fetchProjects,
  fetchProject
} from '../../../../actions/project_actions';
import ProjectGraph from './project_graph';

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser,
    data: state.entities.projects
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
)(ProjectGraph);
