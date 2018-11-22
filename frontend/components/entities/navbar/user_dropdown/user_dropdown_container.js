
import { connect } from 'react-redux';
import UserDropdown from './user_dropdown';
import DrizzleConsumer from '../../../drizzle/drizzleConsumer';
import { fetchUser, updateUser } from '../../../../actions/user_actions';
import { logout } from '../../../../actions/session_actions';

const mapStateToProps = state => {
  return {
    component: UserDropdown,
    props: {
      currentUser: state.session.currentUser
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      fetchUser: id => dispatch(fetchUser(id)),
      updateUser: user => dispatch(updateUser(user)),
      logout: () => dispatch(logout())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrizzleConsumer);
