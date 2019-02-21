import React from 'react';
import Modal from 'react-modal';
import DrizzleConsumer from '../../../drizzle/drizzleConsumer';

import BuyForm from './buy_form';
import ModalStyle from './modal_style';

class BuyFormModal extends React.Component {
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

  openModal() {
    this.setState({openModal: true});
  }

  closeModal() {
    this.setState({openModal: false});
  }

  render() {

    return (
      <div className="modal-button-cont">
        <div className={this.state.openModal ? "modal-button-modal-open" : "modal-button"} onClick={this.openModal}>BUY</div>

        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          contentLabel="Transfer Modal"
          className="modal-container">
          <BuyForm 
            closeModal={this.closeModal}/>
        </Modal>
      </div>
    );
  }
}
// account={this.props.account}
// contract={this.props.contract}

// <DrizzleConsumer props={{closeModal: this.closeModal}} component={Transfer}/>
export default BuyFormModal;
