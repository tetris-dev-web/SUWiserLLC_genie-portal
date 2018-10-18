import React from 'react';
import ProjectGraph from './project_graph';
import Modal from 'react-modal';
import ModalStyle from './modal_style';
import ProjectMap from './project_map';
import ProjectThermo from './project_thermo';
import CashFlowGraph from './project_cashflow';
import $ from 'jquery';

class ProjectDashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      openModal: false,
      projectClicked:{},
      showText:false,
      model_link: '',
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleTextShowing = this.toggleTextShowing.bind(this);
    this.update = this.update.bind(this);
  }

  toggleTextShowing() {
    this.setState({ showText:!this.state.showText });
  }

  openModal(projectClicked) {
    this.setState({ openModal: true, projectClicked });
    if(projectClicked.model_id.search('-') != -1) {
      this.setState({ model_link: "https://3dwarehouse.sketchup.com/embed.html?autostart=1&mid=" + projectClicked.model_id });
    } else {
      this.setState({ model_link: "https://poly.google.com/view/" + projectClicked.model_id + "/embed" });
    }
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  componentDidMount() {
    this.props.fetchProjects();
    // var head = $("#document").contents().find("head");
    // var css = '<style type="text/css">' +
    // 'a img{visibility:hidden}; ' +
    // '</style>';
    //
    // $(head).append(css);
    //
    // console.log('mounted')
  }

  update(e) {

  }


  render() {

    if (this.props.currentUser) {
      const { projectClicked,showText } = this.state;
      debugger
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
              {!projectClicked.summary ? <h1 className="nodata-text">No data available</h1> :
                <React.Fragment>
                  <div className="ft-modal-header-cont">
                    <div className="ft-modal-header bylaws-header">
                      {projectClicked.title}
                    </div>
                  </div>
                  <div className="project-modal-grid">
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
                        <div className="project-summary"
                           >
                          {projectClicked.summary}
                        </div>
                      </div>
                      <div className="bus-plan-download">
                        <a target="_blank" href={ `${projectClicked.bus_plan_link}` }>
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
