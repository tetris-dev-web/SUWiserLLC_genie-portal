import React from 'react';
import { connect } from 'react-redux';
import LocGraphContainer from './loc_view/loc_graph_container';
import VotesGraphContainer from './votes_view/votes_graph_container';
import ToggleOptions from '../dashboard_toggle_options/toggle_options';
import { calculateAccumulatedRevenue, processCashData } from '../../../../util/project_api_util';
import './project_dashboard.scss';

//Combine this with container

class ProjectDashboard extends React.Component {
  constructor(props){
    super(props);
    this.viewTypes = ["GRAPH VIEW", "VOTE VIEW", "LOCATION VIEW"];
    this.state = {
      currentViewId: null
    };

    this.toggleView = this.toggleView.bind(this);
    this.watchProjectPitch = this.watchProjectPitch.bind(this);
  }

  toggleView (currentViewId) {
    const { trackGraph } = this.props;
    const newViewId = currentViewId === this.state.currentViewId ? null : currentViewId;
    trackGraph('projectGraph', newViewId === 0);
    this.setState({currentViewId: newViewId});

    if (currentViewId === this.state.currentViewId) {
      this.graphContainer.style.minHeight = "0";
    } else {
      this.graphContainer.style.minHeight = "50vh";
    }
  }

  componentDidMount() {
    this.watchProjectPitch();
  }

  watchProjectPitch () { //event listener for pitched projects // get project from database and integrate into store
    const { projectFactoryInstance, projectContract } = this.props;
    projectFactoryInstance.ProjectPitch().watch((error, event) => {
      const address = event.args.projectAddress;
      const id = event.args.projectId;
      this.props.fetchProject(projectFactoryInstance, projectContract, id, address);
    });
  }

  handleKeyPress(e) {
    alert('PRESSED');
  }

  render() {
    const { currentViewId } = this.state;
    let currentGraph;

    switch (currentViewId) {
      case null:
        currentGraph = <div></div>;
        break;
      case 0:
        currentGraph = <VotesGraphContainer
          timeAxis={this.props.timeAxis}
          updateTimeAxis={this.props.updateTimeAxis}
          wait={500} />;
        break;
      case 1:
        currentGraph = <LocGraphContainer />;
        break;
      default:
        break;
    }
    const { web3 } = this.props;
    // if (this.props.currentUser) {
      return (
        <div className="project-dashboard">
          <ToggleOptions
            dashboardType="project"
            dashboardTitle="PROJECT DASHBOARD"
            dashboardDescription="The project dashboard tracks the performance of the projects providing investors a comparative framework to provide direction on which investments to focus on."
            toggleView={this.toggleView}
            currentViewId={currentViewId}
            viewTypes={this.viewTypes}
            optionIcons={
                           
            } />
          <div className="graph-container"
            ref={node => this.graphContainer = node}>
            {!web3 && currentViewId !== null ? <LoginPrompt/> : currentGraph}
          </div>
        </div>
      );

  }
}

const mapStateToProps = state => {
  return {
    web3: state.network.web3
  }
}

export default connect(mapStateToProps)(ProjectDashboard);
