import React from 'react';
// import ProjectGraph from './loc_view/project_graph';
// import VotesGraph from './votes_view/votes_graph';
import ToggleOptions from '../votes_view/toggle_options';
// import { calculateAccumulatedRevenue, processCashData } from '../../../../util/project_api_util';

//Combine this with container

class ProjectDashboard extends React.Component {
  constructor(props){
    super(props);
    this.viewTypes = ["GRAPH VIEW", "VOTE VIEW", "NO VIEW"];
    this.state = {
      viewId: undefined
    };

    this.toggleView = this.toggleView.bind(this);
    this.toggleOnHoverText = this.toggleOnHoverText.bind(this);
  }

  toggleOnHoverText() {

  }

  toggleView (viewId) {
    this.setState({viewId});
  }

  componentDidMount() { //where is this being used?
    this.props.fetchProjects();
  }


  handleKeyPress(e) {
    alert('PRESSED');
  }

  render() {
    let currentGraph = <div></div>;

    switch (this.state.viewId) {
      case 0:
        break;
      case 1:
        break;
      default:
        break;
    }

    if (this.props.currentUser) {
      return (
        <div className='project-dashboard'>
          <div className="graph-container">
            {currentGraph}
          </div>
          <ToggleOptions
            viewTitle="PROJECT DASHBOARD"
            toggleView={this.toggleView}
            viewId={this.state.viewId}
            viewTypes={this.viewTypes}
            optionIcons={[
              <svg id="active" x="0px" y="0px" viewBox="0 0 288 288"><path d="M0,207l288-0.2V81H0V207z M270,98.9v90l-108,0v-90L270,98.9z" /></svg>,
              <svg id="active" x="0px" y="0px" viewBox="0 0 288 288"><path d="M0,207l288-0.2V81H0V207z M270,98.9v90l-108,0v-90L270,98.9z" /></svg>,
              <svg x="0px" y="0px" viewBox="-2.5 -2.5 30 30"><path d="M25,11.5h-2.551C21.98,6.776,18.223,3.02,13.5,2.551V0h-2v2.55C6.776,3.02,3.02,6.776,2.551,11.5H0v2h2.551  c0.469,4.723,4.226,8.48,8.949,8.949V25h2v-2.551c4.723-0.469,8.48-4.227,8.949-8.949H25V11.5z M13.5,20.431V18.41  c-0.326,0.055-0.659,0.09-1,0.09c-0.342,0-0.675-0.035-1-0.09v2.021c-3.612-0.453-6.478-3.319-6.931-6.931H6.59  c-0.055-0.326-0.09-0.659-0.09-1s0.035-0.674,0.09-1H4.569C5.022,7.888,7.888,5.022,11.5,4.569V6.59c0.325-0.055,0.658-0.09,1-0.09  c0.341,0,0.674,0.035,1,0.09V4.569c3.611,0.454,6.478,3.319,6.931,6.931H18.41c0.055,0.326,0.09,0.659,0.09,1s-0.035,0.674-0.09,1  h2.021C19.978,17.111,17.111,19.978,13.5,20.431z" /></svg>
            ]} />
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
