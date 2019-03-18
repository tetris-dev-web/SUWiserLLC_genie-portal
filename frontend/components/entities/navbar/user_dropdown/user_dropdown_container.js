
import { connect } from 'react-redux';
import UserDropdown from './user_dropdown';


const mapStateToProps = state => {
  return {
    currentUser: state.network.account
  };
};

export default connect(
  mapStateToProps
)(UserDropdown);
