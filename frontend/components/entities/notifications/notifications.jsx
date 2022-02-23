import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { clearTransactionNotification } from "../../../actions/ui_actions";
import "./notification.scss";

const TransactionNotifications = (props) => {
  const { notification, clearTransactionNotification } = props;

  const clearNotification = () => {
    clearTransactionNotification();
  };

  return (
    <Modal
      isOpen={Boolean(notification.length)}
      onRequestClose={clearNotification}
      className="transaction-notification-modal"
      ariaHideApp={false}
      disableAutoFocus={true}
      style={{
        overlay: {
          zIndex: 101,
        },
      }}
    >
      <div className="transaction-notification">
        <p className="transaction-noitification-content">{`${notification}`}</p>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.ui.transactionNotification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearTransactionNotification: () => dispatch(clearTransactionNotification()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionNotifications);
