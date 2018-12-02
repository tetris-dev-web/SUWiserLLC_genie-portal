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

  openModal() {
    this.setState({openModal: true});
  }

  closeModal() {
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
          <CashFlowInputSheet closeModal={this.closeModal}
          cashflow={this.props.cashflow}
          quarter={this.props.quarter}
          updateCashflow={this.props.updateCashflow} />
        </Modal>
      </div>
    );
  }
}
// <CashFlowGraph />

export default CashFlowModal;
