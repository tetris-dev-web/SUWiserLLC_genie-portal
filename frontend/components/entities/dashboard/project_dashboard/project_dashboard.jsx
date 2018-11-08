import React from 'react';
import ProjectGraph from './project_graph';
import Modal from 'react-modal';
import ModalStyle from './modal_style';
import ProjectMap from './project_map';
import ProjectThermo from './project_thermo';
import CashFlowGraph from './project_cashflow';
import $ from 'jquery';
import DashboardModal from './dashboard_modal';
import planIconTeal from '../../../../images/icons/planIconTeal.png';
// import { editProject } from '../../../../actions/project_actions'

class ProjectDashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      openModal: false,
      projectClicked:{},
      showText:false,
      model_link: '',
      summary: ''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleTextShowing = this.toggleTextShowing.bind(this);
    this.update = this.update.bind(this);
    this.submitEditedSummary = this.submitEditedSummary.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  toggleTextShowing() {
    this.setState({ showText:!this.state.showText });
  }

  openModal(project) {
    let projectClicked = this.props.projects[project.id];
    this.setState({ openModal: true, projectClicked,summary:projectClicked.summary }, ()=>{
    if (projectClicked.model_id) {
      if(projectClicked.model_id.search('-') != -1) {
        this.setState({ model_link: "https://3dwarehouse.sketchup.com/embed.html?autostart=1&mid=" + projectClicked.model_id + "&noEmbedWatermark=true"});
      } else {
        this.setState({ model_link: "https://poly.google.com/view/" + projectClicked.model_id + "/embed" });
      }
    }
    });
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  componentDidMount() {
    this.props.fetchProjects();
  }

  update(e) {

  }

  handleKeyPress(e) {
    e.preventDefault()
    this.setState({summary: e.currentTarget.value})

  }

  submitEditedSummary(){
    this.props.editProject({id: this.state.projectClicked.id, summary: this.state.summary});
    this.setState({openModal: false});
    this.setState({summary: " " + (this.state.summary) });

  }
  //change to submitEditedChanges, submit everything? Once everything is set up

  render() {

    if (this.props.currentUser) {

      const { projectClicked,showText } = this.state;

      return (
        <div className="graph-container">
          <ProjectGraph
            openModal={this.openModal}
            closeModal={this.closeModal}
            currentUser={this.props.currentUser}
            fetchProjects={this.props.fetchProjects}
            projects={this.props.projects}
            data={this.props.projects} />
            <Modal
              isOpen={this.state.openModal}
              onRequestClose={this.closeModal}
              contentLabel="Project Graph Modal"
              style={ModalStyle}
              className="modal-container">
              <div className="black-close-modal-button close-modal-button"
                onClick={this.closeModal}>&times;</div>
              {!projectClicked.summary ? <h1 className="nodata-text">No data available</h1> :
                <React.Fragment>
                  <div className="ft-modal-header-cont">
                    <div className="ft-modal-header bylaws-header">
                      {projectClicked.title}
                    </div>
                  </div>
                  <div className="project-modal-grid" style={!projectClicked.model_id ? {"gridTemplateRows":"30px 300px 400px"} : {"gridTemplateRows":"350px 300px 400px"} }>
                    {!projectClicked.model_id ? <div></div> :
                      <div className="iframe">
                        <iframe id="iframe" src={ `${this.state.model_link}` } frameBorder="0" allowvr="yes" allow="vr; accelerometer; magnetometer; gyroscope;" allowFullScreen mozallowfullscreen="true" webkitallowfullscreen="true" ></iframe>
                      </div>
                    }
                    <div className="temp">
                      <div className="thermo-canvas-container">
                        <ProjectThermo project={projectClicked}
                                        showText={showText}
                                        toggleTextShowing={this.toggleTextShowing}/>
                      </div>
                    </div>

                    <div className="project-description">
                      <div className="project-text">
                        <textarea onChange={this.handleKeyPress} disabled={this.props.isInvestor} className="project-summary" value={this.state.summary}/>

                      </div>
                      { !this.props.currentUser.isInvestor ?
                      <button className="edit-summary-button"
                        onClick={this.submitEditedSummary}
                        style={{background: "white", color: "black", width: "60%", margin: "10px auto", padding: "0px", borderRadius: "10px", fontFamily: "'Open Sans Condensed', sans-serif"}} >
                        Edit Summary As Admin</button> : <button style={{display: 'none'}}></button>
                    }
                      <div className="bus-plan-download">
                        <a target="_blank" rel="noopener noreferrer" href={ `${projectClicked.bus_plan_link}` }>
                          <img className="planIconTeal" src={planIconTeal} width="40" alt="planIconTeal"/>
                          <i className="fas fa-file-contract">

                            <span>business plan</span>
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
