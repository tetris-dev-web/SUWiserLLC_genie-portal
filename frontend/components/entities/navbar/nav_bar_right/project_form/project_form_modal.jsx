import React from "react";
import Modal from "react-modal";
import ProjectForm from "./project_form_container";
import ModalStyle from "./modal_style";
// import './project_modal.scss';

const ProjectFormModal = (props) => {
  const { updateTransactionModal, drizzleState } = props;

  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="modal-button-cont">
      <div
        className={isModalOpen ? "modal-button-modal-open" : "modal-button"}
        onClick={handleClick}
      >
        PITCH
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClick}
        style={ModalStyle}
        ariaHideApp={false}
        contentLabel="Manage Modal"
        className="modal-container"
      >
        <ProjectForm
          updateTransactionModal={updateTransactionModal}
          closeModal={handleClick}
          drizzleState={drizzleState}
        />
      </Modal>
    </div>
  );
};

export default ProjectFormModal;
