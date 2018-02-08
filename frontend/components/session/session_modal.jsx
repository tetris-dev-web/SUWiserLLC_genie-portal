import React from 'react';
import Modal from 'react-modal';

import SessionForm from './session_form';
import ModalStyle from './modal_style';

class SessionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      signIn: false,
      type: props.type
    };

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
    this.props.clearSessionErrors();
  }

  render() {

    return (
      <div className="session-button-cont">
        <button className="session-button" onClick={this.openModal}>
          {this.props.type}
        </button>

        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          contentLabel="Session Modal"
          className="session-form-container">

          <SessionForm
            type={this.state.type}
            login={this.props.login}
            signup={this.props.signup}
            errors={this.props.errors}
            clearSessionErrors={this.props.clearSessionErrors}
            closeModal={this.closeModal} />

        </Modal>
      </div>
    );
  }
}

export default SessionModal;
