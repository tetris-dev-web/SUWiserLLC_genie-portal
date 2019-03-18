import { connect } from 'react-redux';
import TokenGraph from './token_graph';

const mapStateToProps = (state, ownProps) => {

  let data;

  if (state.chain_data.tokenTransfers.inactiveTransferLogs && state.chain_data.dividendsHistory) {
    console.log("conditions", state.chain_data.tokenTransfers.inactiveTransferLogs, state.chain_data.dividendsHistory );
    data = formatTokenGraphData(
      state.chain_data.tokenTransfers,
      state.chain_data.dividendsHistory,
      ownProps.currentViewType,
      state.network.account
    );
  }
  console.log("data", data)
  return {
    data,
    // data: ownProps.currentViewType === "BY USER"? userData : totalData,
    dividendsInstance: state.network.dividendsInstance,
    inactiveTokenInstance: state.network.inactiveTokenInstance,
    activeTokenInstance: state.network.activeTokenInstance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllTokenTransferLogs: (inactiveTokenInstance, activeTokenInstance) => dispatch(fetchAllTokenTransferLogs(inactiveTokenInstance, activeTokenInstance)),
    receiveTokenTransfer: (event) => dispatch(receiveTokenTransfer(event)),
    fetchReceiveDividendsLogs: (dividendsInstance) => dispatch(fetchReceiveDividendsLogs(dividendsInstance)),
    receiveReceiveDividendsLog: (event) => dispatch(receiveReceiveDividendsLog(event))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TokenGraph);
