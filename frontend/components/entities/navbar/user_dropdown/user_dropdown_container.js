import { connect } from 'react-redux';
import UserDropdown from './user_dropdown';
import { fetchUser } from '../../../../actions/user_actions';
import { logout } from '../../../../actions/session_actions';
import {drizzleConnect} from 'drizzle-react';


const mapStateToProps = state => {
  return {
      currentUser: state.session.currentUser,
      drizzleState: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      fetchUser: id => dispatch(fetchUser(id)),
      logout: () => dispatch(logout())
    }
  };
};

export default drizzleConnect(UserDropdown,
  mapStateToProps,
  mapDispatchToProps
);
