import { connect } from 'react-redux';
import TokenDashboard from './token_dashboard';

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser
  };
};

// eventually you will need to dispatch fetchUsers to find total token data
// const mapDispatchToProps = dispatch => {
//   return {};
// };

export default connect(
  mapStateToProps
)(TokenDashboard);
