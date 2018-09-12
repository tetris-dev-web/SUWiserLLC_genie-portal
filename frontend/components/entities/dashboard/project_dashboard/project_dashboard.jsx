import React from 'react';
import ProjectGraph from './project_graph';
import Modal from 'react-modal';
import ModalStyle from '../../footer/modal_style';

class ProjectDashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      openModal: false,
      projectClicked:{}
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(projectClicked) {
    this.setState({ openModal: true, projectClicked });
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  componentDidMount() {
    this.props.fetchProjects();
  }


  render() {
    if (this.props.currentUser) {
      const projectClicked = this.state.projectClicked;
      return (
        <div className="graph-container">
          <ProjectGraph
            openModal={this.openModal}
            closeModal={this.closeModal}
            currentUser={this.props.currentUser}
            fetchProjects={this.props.fetchProjects}
            data={this.props.projects} />
          <Modal
            isOpen={this.state.openModal}
            onRequestClose={this.closeModal}
            contentLabel="Project Graph Modal"
            style={ModalStyle}
            className="modal-container">
            <div className="black-close-modal-button close-modal-button"
              onClick={this.closeModal}>&times;</div>
            <div className="ft-modal-header-cont">
              <div className="ft-modal-header bylaws-header">
                {projectClicked.title} Project
              </div>
            </div>
            <div>title: {projectClicked.title}</div>
            <div>revenue: {projectClicked.revenue}</div>
            <div>valuation: {projectClicked.valuation}</div>
            <div>continent: {projectClicked.continent}</div>
            <div>city: {projectClicked.city}</div>
          </Modal>
        </div>
      );
    } else {
      return (
        <div className="graph-container graph">Project Dashboard</div>
      );
    }

  }
}

export default ProjectDashboard;
