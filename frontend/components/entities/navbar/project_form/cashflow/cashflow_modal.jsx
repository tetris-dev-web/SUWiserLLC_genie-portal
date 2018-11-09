import React from 'react';
import Modal from 'react-modal';
import CashFlow from './cashflow';
import ModalStyle from './modal_style';

class CashFlowModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { openModal: false };

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
          <CashFlow
            closeModal={this.closeModal}
            cashflowData={this.props.cashflowData}
            quarter={this.props.currentQuarter} />
        </Modal>
      </div>
    );
  }
}

export default CashFlowModal;