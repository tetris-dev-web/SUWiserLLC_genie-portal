import { connect } from 'react-redux';
import { buyTokens } from '../../../../actions/chain_actions/token_actions';
import TokenDashboard from './token_dashboard';

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser,
    crowdsale: state.network.crowdsaleInstance,
    account: state.network.account
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buyTokens: (crowdsale, account, value) => buyTokens(crowdsale, account, value)
  }
}

// eventually you will need to dispatch fetchUsers to find total token data
// const mapDispatchToProps = dispatch => {
//   return {};
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenDashboard);
