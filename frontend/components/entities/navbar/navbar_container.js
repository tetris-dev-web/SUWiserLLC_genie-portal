import { connect } from 'react-redux';
import { logout } from '../../../actions/session_actions';
import Navbar from './navbar';

const mapStateToProps = state => {
  return {
    account: state.network.account
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
)(Navbar);
