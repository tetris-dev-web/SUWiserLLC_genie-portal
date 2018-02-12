import { connect } from 'react-redux';
import UserDropdown from './user_dropdown';
import { fetchUser } from '../../../../actions/user_actions';
import { logout } from '../../../../actions/session_actions';

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id)),
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDropdown);
