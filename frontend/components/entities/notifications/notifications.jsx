import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { clearTransactionNotification } from '../../../actions/ui_actions';
import './notification.scss';

class TransactionNotifications extends React.Component {
  constructor (props) {
    super(props);
    this.clearNotification = this.clearNotification.bind(this);
  }

  clearNotification () {
    this.props.clearTransactionNotification();
  }

  render () {
    const { notification } = this.props;
    return (
      <Modal
        isOpen={Boolean(notification.length)}
        onRequestClose={this.clearNotification}
        className="transaction-notification-modal"
        ariaHideApp={false}
        disableAutoFocus={true}
        style={
          {
            overlay : {
              zIndex          : 101
            }
          }
        }
      >
      <div className='transaction-notification'>
        <p className='transaction-noitification-content'>{`${notification}`}</p>
      </div>
      </ Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    notification: state.ui.transactionNotification
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearTransactionNotification: () => dispatch(clearTransactionNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionNotifications);
