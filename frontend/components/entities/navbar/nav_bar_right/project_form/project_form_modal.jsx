import React from 'react';
import Modal from 'react-modal';
import ProjectForm from './project_form_container';
import ModalStyle from './modal_style';
import './project_modal.scss';

class ProjectFormModal extends React.Component {
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
        <div className={this.state.isModalOpen ? "modal-button-modal-open" : "modal-button"} onClick={this.handleClick}>PITCH</div>

        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleClick}
          style={ModalStyle}
          ariaHideApp={false}
          contentLabel="Manage Modal"
          className="modal-container">
          <ProjectForm
            updateTransactionModal={this.props.updateTransactionModal}
            closeModal={this.handleClick}
            drizzleState={this.props.drizzleState} />
        </Modal>
      </div>
    );
  }
}

export default ProjectFormModal;
