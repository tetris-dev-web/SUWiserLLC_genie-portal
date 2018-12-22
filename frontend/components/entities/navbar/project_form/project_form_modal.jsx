import React from 'react';
import Modal from 'react-modal';
import ProjectForm from './project_form_container';
import ModalStyle from './modal_style';

class ProjectFormModal extends React.Component {
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
      <div className="modal-button-cont">
        <div className="modal-button" onClick={this.openModal}>Manage</div>

        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          contentLabel="Manage Modal"
          className="modal-container">
        <ProjectForm
          closeModal={this.closeModal}
          drizzleState={this.props.drizzleState}
          />
        </Modal>
      </div>
    );
  }
}

export default ProjectFormModal;
