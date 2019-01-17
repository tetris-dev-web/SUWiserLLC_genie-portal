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
        <div className="toggle-view-options"
          onMouseEnter={this.handleDashboardHover(true)}
          onMouseLeave={this.handleDashboardHover(false)}>
          {this.generateOptions()}
          <div className={`${dashboardType}-toggle-view-title`}>{dashboardTitle}</div>
          {
            currentViewId !== null && showCurrentViewType &&
            <div className="toggle-view-current-view">{viewTypes[currentViewId]}</div>
          }
          {
            currentViewId === null && showNextViewType !== null &&
            <div className={`${dashboardType}-toggle-view-next-view`}>{viewTypes[showNextViewType]}</div> 
          }
          {
            currentViewId === null && showDashboardDescription &&
            <div className={`${dashboardType}-toggle-view-dashboard-description`}>
              <p>{dashboardDescription}</p>
            </div> 
          }
        </div>
    );
  }
}

export default ToggleOptions;
