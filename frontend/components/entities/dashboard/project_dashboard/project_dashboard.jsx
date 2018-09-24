import React from 'react';
import ProjectGraph from './project_graph';
import Modal from 'react-modal';
import ModalStyle from '../../footer/modal_style';
import ProjectMap from './project_map';

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
                {projectClicked.title}
              </div>
            </div>

            <div className="project-modal-grid">
                <div className="iframe">iframe</div>

                <div className="temp">temp</div>

                <div className="project-description">description</div>

                <div className="cashflow-graph">cash graph</div>

                <div className="project-map">
                  <ProjectMap />
                </div>
                <div className="project-overlays">overlays</div>
            </div>

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


//
// <div className="ft-modal-body bylaws-body">
//   <div className="ft-img-cont">
//
//   </div>
//   {!projectClicked.cashflow ? <h1>NO INFO AVAILABLE</h1> :
//   (<div className="ft-el-cont">
//     <h1 className="ft-el-header">{projectClicked.title}</h1>
//     <p><strong>Title: </strong>{projectClicked.title}</p>
//     <p><strong>Continent: </strong>{projectClicked.continent} </p>
//     <p><strong>City: </strong>{projectClicked.city} </p>
//     <p><strong>Valuation: </strong>{projectClicked.valuation} </p>
//     <p><strong>Revenue: </strong>{projectClicked.revenue} </p>
//   </div>)}
//   <div className="ft-img-cont">
//   </div>
// </div>

export default ProjectDashboard;
