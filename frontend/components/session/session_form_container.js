import { connect } from 'react-redux';
import {
  login,
  signup,
  clearSessionErrors
} from '../../actions/session_actions';
import SessionModal from './session_modal';


const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch, { type }) => {
  return {
    login: user => dispatch(login(user)),
    signup: user => dispatch(signup(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    type
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionModal);
