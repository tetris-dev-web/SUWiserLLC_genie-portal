import React from 'react';
import ProjectGraph from './project_graph';
import VotesView from './votes_view/votes_view';
import ToggleOptions from './toggle_options';
import { calculateAccumulatedRevenue, processCashData } from '../../../../util/project_api_util';
import './project_dashboard.scss';

class ProjectDashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      showText:false,
      viewId: 1
    };
    // this.openModal = this.openModal.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.toggleTextShowing = this.toggleTextShowing.bind(this);
    this.watchProjectPitch = this.watchProjectPitch.bind(this);
    this.filterPitchedProjects = this.filterPitchedProjects.bind(this);
  }

  toggleTextShowing() {
    this.setState({ showText:!this.state.showText });
  }

  toggleView (viewId) {
    this.setState({viewId});
  }

  componentDidMount() {
    this.watchProjectPitch();
  }

  watchProjectPitch() {
    this.props.crowdsaleInstance.ProjectPitch().watch((error, event) => {
      const address = event.args.projectAddress;
      const title = event.args.name;
      const project = this.props.projects[title];
      project.instance = this.props.projectContract.at(address);

      this.props.receiveProject(project);
    });
  }

  filterPitchedProjects () {
    return Object.keys(this.props.projects).reduce((pitchedProjects, projectTitle) => {
      const project = this.props.projects[projectTitle];
      if (project.instance) {
        pitchedProjects[projectTitle] = project;
      }
      return pitchedProjects;
    }, {});
  }

  handleKeyPress(e) {
    alert('PRESSED');
  }

  render() {
    if (this.props.currentUser) {
      return (
        <div className='project-dashboard'>
          <div className="graph-container">
            { this.state.viewId === 1 ?
              <ProjectGraph
                showText = {this.state.showText}
                currentUser={this.props.currentUser}
                crowdsaleInstance={this.props.crowdsaleInstance}
                projectContract={this.props.projectContract}
                fetchProjects={this.props.fetchProjects}
                data={this.filterPitchedProjects()} /> :
              <VotesView />
            }
          </div>
          <ToggleOptions toggleView={this.toggleView} />
        </div>
      );
    } else {
      return (
        <div className="graph-container graph">Project Dashboard</div>
      );
    }

  }
}

// Add this in after fullstack refactoring of cashflow
// <CashFlowGraph
//   cashflow={projectClicked.cashflow}
//   valuation={projectClicked.valuation}
//   currentQuarter={projectClicked.currentQuarter}
//   accumulatedRevenue={projectClicked.accumulatedRevenue} />

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
