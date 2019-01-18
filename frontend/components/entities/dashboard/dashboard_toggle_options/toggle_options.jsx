import React from 'react';
import './toggle_options.scss';

class ToggleOptions extends React.Component {
  constructor() {
    super();

    this.state = {
      showCurrentViewType: false,
      showNextViewType: null,
      showDashboardDescription: false
    };
  }

  handleDashboardHover(boolean) {
    const { currentViewId } = this.props;
    return () => {
      if (currentViewId === null) {
        this.setState({ showDashboardDescription: boolean });
      } else {
        this.setState({ showCurrentViewType: boolean });
      }
    };
  }

  handleButtonHover(nextViewType) {
    const { currentViewId } = this.props;
    return () => {
      if (currentViewId === null) {
        if (nextViewType === null) {
          this.setState({ 
            showNextViewType: nextViewType,
            showDashboardDescription: true
          });
        } else {
          this.setState({
            showNextViewType: nextViewType,
            showDashboardDescription: false
          });
        }
      }
    };
  }

  generateOptions() {
    const { toggleView, currentViewId, optionIcons, dashboardType } = this.props;

    return optionIcons.map((icon, i) => {
      switch (dashboardType) {
        case "project":
          return (
            <div key={i} className="toggle-option" onClick={() => toggleView(i)}>
              <div className={`toggle-button ${dashboardType}`}
                onMouseEnter={this.handleButtonHover(i)}
                onMouseLeave={this.handleButtonHover(null)}
                id={currentViewId === i ? "selected-button" : "unselected-button"}>
              </div>
              <div className="toggle-icon">
                {icon}
              </div>
            </div>
          );
          case "token":
          return (
            <div key={i} className="toggle-option" onClick={() => toggleView(i)}>
              <div className="toggle-icon">
                {icon}
              </div>
              <div className={`toggle-button ${dashboardType}`}
                onMouseEnter={this.handleButtonHover(i)}
                onMouseLeave={this.handleButtonHover(null)}
                id={currentViewId === i ? "selected-button" : "unselected-button"}>
              </div>
            </div>
          );
          default:
          break;
        }
      });
    }
    
  render() {
    const { currentViewId, dashboardTitle, viewTypes, dashboardDescription, dashboardType } = this.props;
    const { showCurrentViewType, showNextViewType, showDashboardDescription } = this.state;

    return (
      <div className={currentViewId === null ? `toggle-view-options-container-graph-hidden ${dashboardType}` : `toggle-view-options-container ${dashboardType}`}>
        <div className={`toggle-view-options-border-layer ${dashboardType}`}>
          <div className={`toggle-view-options ${dashboardType}`}
            onMouseEnter={this.handleDashboardHover(true)}
            onMouseLeave={this.handleDashboardHover(false)}>
            {this.generateOptions()}
            <div className={`toggle-view-title ${dashboardType}`}>{dashboardTitle}</div>
            {
              currentViewId !== null && showCurrentViewType &&
              <div className="toggle-view-current-view">{viewTypes[currentViewId]}</div>
            }
            {
              currentViewId === null && showNextViewType !== null &&
              <div className={`toggle-view-next-view ${dashboardType}`}>{viewTypes[showNextViewType]}</div> 
            }
            {
              currentViewId === null && showDashboardDescription &&
              <div className={`toggle-view-dashboard-description ${dashboardType}`}>
                <p>{dashboardDescription}</p>
              </div> 
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ToggleOptions;
