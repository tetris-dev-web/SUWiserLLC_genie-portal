import { connect } from 'react-redux';
import {
  fetchProjects,
  fetchProject
} from '../../../actions/chain_actions/project_actions';
import DashboardGraph from './dashboard_graph';
import { fetchTokenPurchaseLogs } from '../../../actions/chain_actions/token_actions';

const mapStateToProps = state => {

  let isInvestor = false; //hard coded for demo

  return {
    //token related props
    currentUser: true, //hard coded for demo
    crowdsale: state.network.crowdsaleInstance,
    account: state.network.account,
    //projects related props
    web3: state.network.web3,
    crowdsaleInstance: state.network.crowdsaleInstance,
    projectContract: state.network.projectContract,
    projectFactoryInstance: state.network.projectFactoryInstance,
    capitalBeingRaised: state.chain_data.capitalBeingRaised,
    isInvestor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTokenPurchaseLogs: (crowdsale, web3) => dispatch(fetchTokenPurchaseLogs(crowdsale, web3)),
    fetchProject: (projectFactoryInstance, projectContract, id, address) => dispatch(fetchProject(projectFactoryInstance, projectContract, id, address)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardGraph);
