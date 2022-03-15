import React from "react";
import Modal from "react-modal";
import "./transaction_modal.scss";
import { connect } from "react-redux";
import { updateTransactionModal } from "../../../actions/ui_actions";

const TransactionModal = (props) => {
  const { isOpen, title, message, updateTransactionModal } = props;

  return (
    <Modal
      className="transaction_modal"
      isOpen={isOpen}
      onRequestClose={() => updateTransactionModal({ isOpen: false })}
      style={{
        overlay: {
          zIndex: 100,
        },
      }}
    >
      <div className="form_content">
        <h1 className="form_content_title">{title}</h1>
        <p className="form_content_message">{message}</p>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { title, message, isOpen } = state.ui.transactionModal;
  return {
    title,
    message,
    isOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTransactionModal: (modalInfo) => dispatch(updateTransactionModal(modalInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionModal);
