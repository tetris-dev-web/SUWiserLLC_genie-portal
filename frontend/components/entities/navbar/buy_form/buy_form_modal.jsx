import React from 'react';
import Modal from 'react-modal';

import BuyForm from './buy_form';
import ModalStyle from './modal_style';

class BuyFormModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isModalOpen: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    return (
      <div className="modal-button-cont">
        <div className={this.state.isModalOpen ? "modal-button-modal-open" : "modal-button"} onClick={this.handleClick}>BUY</div>

        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleClick}
          style={ModalStyle}
          contentLabel="Transfer Modal"
          className="modal-container">
          <BuyForm
            closeModal={this.handleClick}/>
        </Modal>
      </div>
    );
  }
}
// account={this.props.account}
// contract={this.props.contract}

// <DrizzleConsumer props={{closeModal: this.closeModal}} component={Transfer}/>
export default BuyFormModal;
