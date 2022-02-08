import React from 'react';
import  Modal  from 'react-modal';
import ProjectModal from './project_modals';



class ProjectModalStructure extends React.Component {

  render(){

    return (
      <Modal
        isOpen={this.props.ProjectModalIsOpen}
        onRequestClose={() => this.props.closeModal()}
        contentLabel="project-modal"
        className="project-modal"
        ariaHideApp={false}>

        <ProjectModal
        openProject={this.props.openProject}/>

      </Modal>
    )
  }
}


// CONTAINER
import { connect } from 'react-redux';
import { closeModal } from '../../../../../actions/modal_actions';

const mapStateToProps = state => {
  return {
    ProjectModalIsOpen: state.ui.modals.ProjectModalIsOpen,
    openProject: state.chain_data.projectGraph.projects[state.ui.modals.projectAddress]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch(closeModal())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModalStructure);
