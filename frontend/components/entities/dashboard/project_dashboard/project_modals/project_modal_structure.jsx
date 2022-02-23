import React from "react";
import Modal from "react-modal";
import ProjectModal from "./project_modals";

const ProjectModalStructure = (props) => {
  const { ProjectModalIsOpen, closeModal, openProject } = props;
  return (
    <Modal
      isOpen={ProjectModalIsOpen}
      onRequestClose={() => closeModal()}
      contentLabel="project-modal"
      className="project-modal"
      ariaHideApp={false}
    >
      <ProjectModal openProject={openProject} />
    </Modal>
  );
};

// CONTAINER
import { connect } from "react-redux";
import { closeModal } from "../../../../../actions/modal_actions";

const mapStateToProps = (state) => {
  return {
    ProjectModalIsOpen: state.ui.modals.ProjectModalIsOpen,
    openProject: state.chain_data.projectGraph.projects[state.ui.modals.projectAddress],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch(closeModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModalStructure);
