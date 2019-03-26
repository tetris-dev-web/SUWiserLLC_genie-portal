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
    this.viewTypes = ["VOTE VIEW", "LOCATION VIEW"];
    this.state = {
      currentViewId: null
    };

    this.toggleView = this.toggleView.bind(this);
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
      // case 0:
      // break;
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
          <div className="graph-container"
            ref={node => this.graphContainer = node}>
            {!web3 && currentViewId !== null ? <LoginPrompt/> : currentGraph}
          </div>
          <ToggleOptions
            dashboardType="project"
            dashboardTitle="PROJECT DASHBOARD"
            dashboardDescription="The project dashboard tracks the performance of the projects providing investors a comparative framework to provide direction on which investments to focus on."
            toggleView={this.toggleView}
            currentViewId={currentViewId}
            viewTypes={this.viewTypes}
            optionIcons={[
              <svg id="active" viewBox="0 0 288 288"><path d="M0,207l288-0.2V81H0V207z M270,98.9v90l-108,0v-90L270,98.9z" /></svg>,
              <svg viewBox="-2.5 -2.5 30 30"><path d="M25,11.5h-2.551C21.98,6.776,18.223,3.02,13.5,2.551V0h-2v2.55C6.776,3.02,3.02,6.776,2.551,11.5H0v2h2.551  c0.469,4.723,4.226,8.48,8.949,8.949V25h2v-2.551c4.723-0.469,8.48-4.227,8.949-8.949H25V11.5z M13.5,20.431V18.41  c-0.326,0.055-0.659,0.09-1,0.09c-0.342,0-0.675-0.035-1-0.09v2.021c-3.612-0.453-6.478-3.319-6.931-6.931H6.59  c-0.055-0.326-0.09-0.659-0.09-1s0.035-0.674,0.09-1H4.569C5.022,7.888,7.888,5.022,11.5,4.569V6.59c0.325-0.055,0.658-0.09,1-0.09  c0.341,0,0.674,0.035,1,0.09V4.569c3.611,0.454,6.478,3.319,6.931,6.931H18.41c0.055,0.326,0.09,0.659,0.09,1s-0.035,0.674-0.09,1  h2.021C19.978,17.111,17.111,19.978,13.5,20.431z" /></svg>
            ]} />
        </div>
      );
    // } else {
    //   return (
    //     <div className="graph-container graph">Project Dashboard</div>
    //   );
    // }

  }
}
// <svg id="active" viewBox="0 0 288 288"><path d="M0,207l288-0.2V81H0V207z M270,98.9v90l-108,0v-90L270,98.9z" /></svg>,

const mapStateToProps = state => {
  return {
    web3: state.network.web3
  }
}

export default connect(mapStateToProps)(ProjectDashboard);
