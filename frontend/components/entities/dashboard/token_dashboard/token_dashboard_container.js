import { connect } from 'react-redux';
import TokenDashboard from './token_dashboard';

const mapStateToProps = state => {
  return {
    currentUser: true,
    crowdsale: state.network.crowdsaleInstance,
    account: state.network.account
  };
};

export default connect(
  mapStateToProps
)(TokenDashboard);
