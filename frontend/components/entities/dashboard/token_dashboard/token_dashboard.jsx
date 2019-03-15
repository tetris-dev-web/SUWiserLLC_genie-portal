import React from 'react';
import { connect } from 'react-redux';
import ToggleOptions from '../dashboard_toggle_options/toggle_options';
import TokenGraph from './token_view/token_graph';
import PriceGraph from './price_view/price_graph';
import LoginPrompt from '../login_prompt/login_prompt';
import './token_dashboard.scss';

class TokenDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.viewTypes = ["BY USER", "BY ALL", "BY PRICE"];
    this.state = {
      currentViewId: null
    };

    this.toggleView = this.toggleView.bind(this);
  }

  toggleView(currentViewId) {
    const { trackGraph } = this.props;
    const newViewId = currentViewId === this.state.currentViewId ? null : currentViewId;
    this.setState({ currentViewId: newViewId });
    trackGraph('tokenGraph', newViewId);
  }

  render() {
    let currentGraph;
    const { currentViewId } = this.state;
    const { web3, account, updateTimeAxis, trackGraph, timeAxis } = this.props;
    console.log(currentViewId, web3, account)
    switch (currentViewId) {
      case null:
        currentGraph = <div></div>;
        break;
      case 0:
      case 1:
        currentGraph = <TokenGraph
          timeAxis={timeAxis}
          currentUser={this.props.currentUser}
          currentViewType={this.viewTypes[currentViewId]}
          updateTimeAxis={updateTimeAxis}
          wait={500}/>;
        break;
      case 2:
        currentGraph = <PriceGraph
          currentUser={this.props.currentUser} />;
        break;
      default:
        break;
    }
    console.log("HELLO")
    if (this.props.currentUser) {
      return(
        <div className="token-dashboard">
          <ToggleOptions
            dashboardType="token"
            dashboardTitle="TOKEN DASHBOARD"
            dashboardDescription="The project dashboard tracks the performance of the projects providing investors a comparative framework to provide direction on which investments to focus on."
            toggleView={this.toggleView}
            currentViewId={currentViewId}
            viewTypes={this.viewTypes}
            optionIcons={[
              <svg viewBox="0 0 95 95"><g><circle cx="47.5" cy="32.1" r="23.2"/><path d="M47.5,86.1c18.2,0,32.9-6.3,32.9-10.5c0-6.9-8.5-16.8-20.5-21.2c-3.7,2.1-7.9,3.2-12.4,3.2c-4.5,0-8.7-1.2-12.4-3.2c-12,4.4-20.5,14.3-20.5,21.2C14.6,79.9,29.3,86.1,47.5,86.1z"/></g></svg>,
              <svg viewBox="0 0 100 100"><circle cx="21.6" cy="37.7" r="6.5"/><path d="M27.3,91.8V69.9c0-0.1,0-0.2,0-0.2h1c2.3,0,4.2-1.9,4.2-4.2l0,0V50.2c0-2.3-1.9-4.2-4.2-4.2H14.9c-2.3,0-4.2,1.9-4.2,4.2v15.2c0,2.3,1.9,4.2,4.2,4.2h1c0,0.1,0,0.2,0,0.2v21.9c0,1.8,1.5,3.2,3.2,3.2H24C25.8,95,27.3,93.5,27.3,91.8z"/><circle cx="50" cy="37.7" r="6.5"/><path d="M55.7,91.8V69.9c0-0.1,0-0.2,0-0.2h1c2.3,0,4.2-1.9,4.2-4.2h0V50.2c0-2.3-1.9-4.2-4.2-4.2H43.3c-2.3,0-4.2,1.9-4.2,4.2v15.2c0,2.3,1.9,4.2,4.2,4.2h1c0,0.1,0,0.2,0,0.2v21.9c0,1.8,1.5,3.2,3.2,3.2h4.9C54.3,95,55.7,93.5,55.7,91.8z"/><circle cx="78.4" cy="37.7" r="6.5"/><path d="M85.2,46H71.7c-2.3,0-4.2,1.9-4.2,4.2v15.2c0,2.3,1.9,4.2,4.2,4.2h1c0,0.1,0,0.2,0,0.2v21.9c0,1.8,1.4,3.2,3.2,3.2h4.9c1.8,0,3.2-1.4,3.2-3.2V69.9c0-0.1,0-0.2,0-0.2h1c2.3,0,4.2-1.9,4.2-4.2l0,0V50.2C89.4,47.9,87.5,46,85.2,46z"/><circle cx="50" cy="11.5" r="6.5"/><circle cx="35.8" cy="24.6" r="6.5"/><circle cx="64.2" cy="24.6" r="6.5"/></svg>,
            ]}
            />
          <div className="graph-container">
            {
              !web3 || (currentViewId === 0 && !account) ? <LoginPrompt/> :
              currentGraph
            }
          </div>
        </div>
      );
    } else {
      return (
        <div className="graph-container graph">Token Dashboard</div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    web3: state.network.web3,
    account: state.network.account
  }
}

export default connect(mapStateToProps)(TokenDashboard);


// <svg viewBox="-2.5 -2.5 30 30"><path d="M25,11.5h-2.551C21.98,6.776,18.223,3.02,13.5,2.551V0h-2v2.55C6.776,3.02,3.02,6.776,2.551,11.5H0v2h2.551  c0.469,4.723,4.226,8.48,8.949,8.949V25h2v-2.551c4.723-0.469,8.48-4.227,8.949-8.949H25V11.5z M13.5,20.431V18.41  c-0.326,0.055-0.659,0.09-1,0.09c-0.342,0-0.675-0.035-1-0.09v2.021c-3.612-0.453-6.478-3.319-6.931-6.931H6.59  c-0.055-0.326-0.09-0.659-0.09-1s0.035-0.674,0.09-1H4.569C5.022,7.888,7.888,5.022,11.5,4.569V6.59c0.325-0.055,0.658-0.09,1-0.09  c0.341,0,0.674,0.035,1,0.09V4.569c3.611,0.454,6.478,3.319,6.931,6.931H18.41c0.055,0.326,0.09,0.659,0.09,1s-0.035,0.674-0.09,1  h2.021C19.978,17.111,17.111,19.978,13.5,20.431z" /></svg>
