import React from 'react';
import Modal from 'react-modal';
import './transaction_modal.scss';
import { connect } from 'react-redux';
import { updateTransactionModal } from  '../../../../../actions/ui_actions';

class TransactionModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { isOpen, title, message, updateTransactionModal } = this.props;

    return (
      <Modal
        className='transaction_modal'
        isOpen={isOpen}
        onRequestClose={() => updateTransactionModal({ isOpen: false })}
        >
        <div className='form_content'>
          <h1 className='form_content_title'>{title}</h1>
          <p className='form_content_message'>{message}</p>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  const { title, message, isOpen } = state.ui.transactionModal;
  return {
    title,
    message,
    isOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTransactionModal: modalInfo => dispatch(updateTransactionModal(modalInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionModal);
