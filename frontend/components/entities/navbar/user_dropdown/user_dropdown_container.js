import { connect } from 'react-redux';
import UserDropdown from './user_dropdown';
// import { fetchUser, updateUser } from '../../../../actions/user_actions';
import { logout } from '../../../../actions/session_actions';

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDropdown);
