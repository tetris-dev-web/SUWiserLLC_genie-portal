import React from 'react';

import ToggleOptions from './dashboard_toggle_options/toggle_options';

import LoginPrompt from './login_prompt/login_prompt';

import './dashboard_graph.scss';

class DashboardGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: null
    };
    this.toggleView = this.toggleView.bind(this);
  }

  componentDidMount(){
    this.props.fetchStartAndEndTimes();
  }

  toggleView(currentView) {
    const newView = currentView === this.state.currentView ? null : currentView;
    this.setState({ currentView: newView })

    const dashboardIsClosed = newView === null? true : false

    this.props.graphsNeedingAxis.includes(newView)? //"VOTE VIEW" | "BY ALL" | "BY USER"?
      this.props.showAxis(true, dashboardIsClosed, this.props.dashboardType)
      : this.props.showAxis(false, dashboardIsClosed, this.props.dashboardType)
  }

  render() {
    let currentGraph;
    const { currentView } = this.state;
    const { web3, account } = this.props;


    currentView === null ?
          currentGraph = <div></div>
        : currentGraph = this.props.graphs[currentView]

    if (this.props.currentUser) {
      return(
        <div className={`dashboard-${this.props.dashboardType}`}>
          <ToggleOptions
            dashboardType={this.props.dashboardType}
            dashboardTitle={this.props.dashboardTitle}
            dashboardDescription={this.props.dashboardDescription}
            toggleView={this.toggleView}
            currentView={currentView}
            viewOptions={this.props.viewOptions}
            optionIcons={this.props.optionIcons}
            />
          <div className="graph-container">
            {
              !web3 || (currentView === 0 && !account) ?
                <LoginPrompt />
                : currentGraph
            }
          </div>
        </div>
      );
    } else {
      return (
        <div className="graph-container graph">{this.props.dashboardTitle}</div>
      );
    }
  }
}

//CONTAINER
import { connect } from 'react-redux';
import { fetchStartAndEndTimes } from '../../../actions/chain_actions/time_axis_actions';

const mapStateToProps = state => {
  return {
    web3: state.network.web3,
    account: state.network.account
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchStartAndEndTimes: () => dispatch(fetchStartAndEndTimes())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(DashboardGraph);


// <svg viewBox="-2.5 -2.5 30 30"><path d="M25,11.5h-2.551C21.98,6.776,18.223,3.02,13.5,2.551V0h-2v2.55C6.776,3.02,3.02,6.776,2.551,11.5H0v2h2.551  c0.469,4.723,4.226,8.48,8.949,8.949V25h2v-2.551c4.723-0.469,8.48-4.227,8.949-8.949H25V11.5z M13.5,20.431V18.41  c-0.326,0.055-0.659,0.09-1,0.09c-0.342,0-0.675-0.035-1-0.09v2.021c-3.612-0.453-6.478-3.319-6.931-6.931H6.59  c-0.055-0.326-0.09-0.659-0.09-1s0.035-0.674,0.09-1H4.569C5.022,7.888,7.888,5.022,11.5,4.569V6.59c0.325-0.055,0.658-0.09,1-0.09  c0.341,0,0.674,0.035,1,0.09V4.569c3.611,0.454,6.478,3.319,6.931,6.931H18.41c0.055,0.326,0.09,0.659,0.09,1s-0.035,0.674-0.09,1  h2.021C19.978,17.111,17.111,19.978,13.5,20.431z" /></svg>
