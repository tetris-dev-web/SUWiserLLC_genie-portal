import { connect } from 'react-redux';

import SessionModal from './session_modal';


const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors.session
  };
};


export default connect(
  mapStateToProps,
  null
)(SessionModal);
