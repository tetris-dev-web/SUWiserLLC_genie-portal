import React from 'react';
import './toggle_options.scss';

class ToggleOptions extends React.Component {
  constructor() {
    super();

    this.state = {
      showCurrentViewType: false,
      showNextViewType: null,
      showDashboardInstruction: false
    };

  }

  handleDashboardHover(boolean) {
    const { currentViewId } = this.props;
    return () => {
      if (currentViewId === null) {
        this.setState({ showDashboardInstruction: boolean });
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
            showDashboardInstruction: true
          });
        } else {
          this.setState({
            showNextViewType: nextViewType,
            showDashboardInstruction: false
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
            <div key={i} className='toggle-option' onClick={() => toggleView(i)}>
              <div className='toggle-button'
                onMouseEnter={this.handleButtonHover(i)}
                onMouseLeave={this.handleButtonHover(null)}
                id={currentViewId === i ? 'selected-button' : 'unselected-button'}>
              </div>
              <div className='toggle-icon'>
                {icon}
              </div>
            </div>
          );
          case "token":
          return (
            <div key={i} className='toggle-option' onClick={() => toggleView(i)}>
              <div className='toggle-icon'>
                {icon}
              </div>
              <div className='toggle-button'
                id={currentViewId === i ? 'selected-button' : 'unselected-button'}>
              </div>
            </div>
          );
          default:
          break;
        }
      });
    }
    
    render() {
      const { currentViewId, viewTitle, viewTypes } = this.props;
      const { showCurrentViewType, showNextViewType, showDashboardInstruction } = this.state;

      return (
        <div className={currentViewId === null ? "toggle-view-options-container-graph-hidden" : "toggle-view-options-container"}>
          <div className='toggle-view-options'
            onMouseEnter={this.handleDashboardHover(true)}
            onMouseLeave={this.handleDashboardHover(false)}>
            {this.generateOptions()}
            <div className="toggle-view-title">{viewTitle}</div>
            {
              currentViewId !== null && showCurrentViewType &&
              <div className="toggle-view-current-view">{viewTypes[currentViewId]}</div>
            }
            {
              currentViewId === null && showNextViewType !== null &&
              <div className="toggle-view-next-view">{viewTypes[showNextViewType]}</div> 
            }
            {
              currentViewId === null && showDashboardInstruction &&
              <div className="toggle-view-dashboard-instruction">
                <p>
                  The project dashboard tracks
                  the performance of the projects
                  providing investors a comparative 
                  framework to provide direction on 
                  which investments to focus on.
                </p>
              </div> 
            }
          </div>
        </div>
    );
  }
}

export default ToggleOptions;
