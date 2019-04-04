import React from 'react';
import './toggle_options.scss';

class ToggleOptions extends React.Component {
  constructor() {
    super();

    this.state = {
      DashboardIsLoaded: false,
      nameOfHoveredOption: null,
      showDashboardDescription: false,
      textToShow: ""
    };
    this.generateOptions = this.generateOptions.bind(this);
    this.handleDashboardHover = this.handleDashboardHover.bind(this);
    this.handleButtonHover = this.handleButtonHover.bind(this);
  }

  handleDashboardHover() {
    if (!this.state.DashboardIsLoaded){
      this.setState({
        textToShow: this.props.dashboardDescription,
        showDashboardDescription: !this.state.showDashboardDescription //this is the issue
      });
    }
  }

  handleButtonHover(nameOfHoveredOption) {
    if(!this.state.DashboardIsLoaded && nameOfHoveredOption === "" ){
      // show description when on toggle but not button
      this.setState({
        textToShow: this.props.dashboardDescription
      })
    } else if (!this.state.DashboardIsLoaded) {
      this.setState({
        textToShow: (<p className="greenText"> {nameOfHoveredOption} </p>),
      });
    }

  }

  handleOnClick(){

  }

  generateOptions() {

    const ToggleOption = (props) => (


      <div className="toggle-option" onClick={() => {
        this.props.toggleView(props.name)
        console.log(props, "props", this.props.currentView);
        props.name === this.props.currentView?
          this.setState({DashboardIsLoaded: !this.state.DashboardIsLoaded, showDashboardDescription: false, textToShow: "" })
            : Object.keys(this.props.optionIcons).includes(this.props.currentView) ?
                "do nothing"
                : this.setState({DashboardIsLoaded: !this.state.DashboardIsLoaded})
        }}>
        <div className={`toggle-button ${this.props.dashboardType}`}
          onMouseEnter={() => this.handleButtonHover(props.name)}
          onMouseLeave={() => this.handleButtonHover("")}
          id={this.props.currentView === props.name ? "selected-button" : "unselected-button"}>
        </div>
        <div className="toggle-icon">
          {props.icon}
        </div>
      </div>
    )

      let options = [];
      for(let key in this.props.optionIcons){
          options.push(<ToggleOption
                          key={key}
                          name={key}
                          icon={this.props.optionIcons[key]}
                           />);}
      return options;

    }

  render() {
    const { currentView, dashboardTitle, dashboardDescription, dashboardType } = this.props;
    const { DashboardIsLoaded, generateOptions, textToShow, showDashboardDescription } = this.state;
    console.log("loading text", DashboardIsLoaded, showDashboardDescription)
    return (
      <div className={currentView === null ? `toggle-view-options-container-graph-hidden ${dashboardType}` : `toggle-view-options-container-graph-open ${dashboardType}`}>
        <div className={`toggle-view-options-border-layer ${dashboardType}`}>
          <div className={`toggle-view-options ${dashboardType}`}
            onMouseEnter={() => this.handleDashboardHover()}
            onMouseLeave={() => this.handleDashboardHover()}>

            { this.generateOptions() }

          </div>
          <div className={`toggle-view-title ${dashboardType}`}>
            {dashboardTitle}
            {DashboardIsLoaded?
              <div className="toggle-view-current-view"> {currentView} </div> : ""}
          </div>

        </div>
        {!DashboardIsLoaded && showDashboardDescription?
          <div className={`toggle-view-dashboard-description ${dashboardType}`}> {textToShow} </div> : ""}
      </div>
    );
  }
}

export default ToggleOptions;
