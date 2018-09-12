import React from 'react';
import ProjectGraph from './project_graph';
import Modal from 'react-modal';

class ProjectDashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      openModal: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    alert('modal opened');
    this.setState({ openModal: true });
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  componentDidMount() {
    this.props.fetchProjects();
  }


  render() {
    if (this.props.currentUser) {
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
            contentLabel="Bylaws Modal"
            className="modal-container">
            <div>Modal content goes here</div>
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
