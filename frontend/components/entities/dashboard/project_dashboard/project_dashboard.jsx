import React from 'react';
import ProjectGraph from './project_graph';
import Modal from 'react-modal';
import ModalStyle from '../../footer/modal_style';
import ProjectMap from './project_map';
import ProjectThermo from './project_thermo';
import CashFlowGraph from './project_cashflow';

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
      const sketchfab_link = "https://sketchfab.com/models/" + projectClicked.model_id + "/embed";
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
              {!projectClicked.summary ? <h1>No data available</h1> :
                <React.Fragment>
                  <div className="ft-modal-header-cont">
                    <div className="ft-modal-header bylaws-header">
                      {projectClicked.title}
                    </div>
                  </div>
                  <div className="project-modal-grid">
                    <div className="iframe">
                        <div className="sketchfab-embed-wrapper">
                          <iframe width="374" height="300" src={ `${sketchfab_link}` } frameBorder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

                        </div>
                    </div>
                    <div className="temp">
                      <h3>Capital Required</h3>
                      <div className="thermo-canvas-container">
                        <ProjectThermo project={projectClicked} />
                      </div>
                    </div>

                    <div className="project-description">
                      <div className="project-text">
                        <h1>{projectClicked.title}</h1>
                        <div className="project-summary">
                          {projectClicked.summary}
                        </div>
                      </div>
                      <div className="bus-plan-download">
                        <a target="_blank" href={ `${projectClicked.bus_plan_link}` }>
                          <i className="fas fa-file-contract">
                            business plan
                          </i>
                        </a>
                      </div>
                    </div>

                    <div className="cashflow-graph">
                      <CashFlowGraph project={projectClicked} />
                    </div>

                    <div className="project-map">
                      <ProjectMap projectClicked={ projectClicked } />
                    </div>
                    <div className="project-overlays">overlays</div>
                  </div>
                </React.Fragment>
              }
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
