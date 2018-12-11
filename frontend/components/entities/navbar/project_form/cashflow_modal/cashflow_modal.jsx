import React from 'react';
import Modal from 'react-modal';
import CashFlowInputSheet from './cashflow_input_sheet';
import CashFlowGraph from '../../../dashboard/project_dashboard/project_cashflow_graph.jsx';
import ModalStyle from './modal_style';

class CashFlowModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false
    };

    window.SessionOpenModal = () => {
      this.setState({openModal: true});
    };

    window.SessionOpenModal = window.SessionOpenModal.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // solves 'Warning: react-modal: App element is not defined'
  UNSAFE_componentWillMount() {
    Modal.setAppElement('body');
  }

  componentWillUnmount(){
  }

  openModal() {
    this.setState({openModal: true});
    console.log();
  }

  closeModal(e) {
    // console.log("this is: ", this);
    // const { cashflow } = this.cashflowInputSheet.state.cashflow
    // console.log("refs are: ", this.refs);
    // console.log("Cashflow from inputsheet is: ", cashflow);
    // console.log("E is: ", e);
    // this.props.updateCashflow(cashflow)(e);
    this.setState({openModal: false});
    this.props.receiveCashflowData();
  }

  render() {
    return (
      <div>
        <div onClick={this.openModal}>Cashflows</div>
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          contentLabel="Manage Modal"
          className="modal-container">
          <CashFlowInputSheet
            closeModal={this.closeModal}
            cashflow={this.props.cashflow}
            quarter={this.props.quarter}
            updateCashflow={this.props.updateCashflow}
            ref={(cashflowInputSheet) => {this.cashflowInputSheet = cashflowInputSheet;}}
            updateActuals={this.props.updateActuals}
            updateCashflowValue={this.props.updateCashflowValue}
            />
        </Modal>
      </div>
    );
  }
}
// <CashFlowGraph />

export default CashFlowModal;
