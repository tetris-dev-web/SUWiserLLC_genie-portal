import React, { useState } from "react";
import "./toggle_options.scss";

const ToggleOptions = (props) => {
  const {
    toggleView,
    currentView,
    dashboardTitle,
    dashboardDescription,
    dashboardType,
    optionIcons,
  } = props;

  const [state, setState] = useState({
    DashboardIsLoaded: false,
    nameOfHoveredOption: null,
    showDashboardDescription: false,
    textToShow: "",
  });

  const handleDashboardHover = () => {
    if (!state.DashboardIsLoaded) {
      setState((state) => ({
        DashboardIsLoaded: state.DashboardIsLoaded,
        nameOfHoveredOption: state.nameOfHoveredOption,
        textToShow: dashboardDescription,
        showDashboardDescription: !state.showDashboardDescription, //this is the issue
      }));
    }
  };

  const handleButtonHover = (nameOfHoveredOption) => {
    if (!state.DashboardIsLoaded && nameOfHoveredOption === "") {
      // show description when on toggle but not button
      setState((state) => ({
        DashboardIsLoaded: state.DashboardIsLoaded,
        nameOfHoveredOption: state.nameOfHoveredOption,
        showDashboardDescription: state.showDashboardDescription,
        textToShow: dashboardDescription,
      }));
    } else if (!state.DashboardIsLoaded) {
      setState((state) => ({
        DashboardIsLoaded: state.DashboardIsLoaded,
        nameOfHoveredOption: state.nameOfHoveredOption,
        showDashboardDescription: state.showDashboardDescription,
        textToShow: <p className="greenText"> {nameOfHoveredOption} </p>,
      }));
    }
  };

  const handleOnClick = () => {};

  const generateOptions = () => {
    const ToggleOption = (props) => (
      <div
        className="toggle-option"
        onClick={() => {
          toggleView(props.name);
          console.log(props, "props", currentView);
          props.name === currentView
            ? setState((state) => ({
                nameOfHoveredOption: state.nameOfHoveredOption,
                textToShow: state.textToShow,
                DashboardIsLoaded: !state.DashboardIsLoaded,
                showDashboardDescription: false,
                textToShow: "",
              }))
            : Object.keys(optionIcons).includes(currentView)
            ? "do nothing"
            : setState({
                textToShow: state.textToShow,
                nameOfHoveredOption: state.nameOfHoveredOption,
                showDashboardDescription: state.showDashboardDescription,
                DashboardIsLoaded: !state.DashboardIsLoaded,
              });
        }}
      >
        <div
          className={`toggle-button ${dashboardType}`}
          onMouseEnter={() => handleButtonHover(props.name)}
          onMouseLeave={() => handleButtonHover("")}
          id={currentView === props.name ? "selected-button" : "unselected-button"}
        ></div>
        <div className="toggle-icon">{props.icon}</div>
      </div>
    );

    let options = [];
    for (let key in optionIcons) {
      options.push(<ToggleOption key={key} name={key} icon={optionIcons[key]} />);
    }
    return options;
  };

  const { DashboardIsLoaded, nameOfHoveredOption, showDashboardDescription, textToShow } = state;

  return (
    <div
      className={
        currentView === null
          ? `toggle-view-options-container-graph-hidden ${dashboardType}`
          : `toggle-view-options-container-graph-open ${dashboardType}`
      }
    >
      <div className={`toggle-view-options-border-layer ${dashboardType}`}>
        <div
          className={`toggle-view-options ${dashboardType}`}
          onMouseEnter={() => handleDashboardHover()}
          onMouseLeave={() => handleDashboardHover()}
        >
          {generateOptions()}
        </div>
        <div className={`toggle-view-title ${dashboardType}`}>
          {dashboardTitle}
          {DashboardIsLoaded ? <div className="toggle-view-current-view"> {currentView} </div> : ""}
        </div>

        {!DashboardIsLoaded && showDashboardDescription ? (
          <div className={`toggle-view-dashboard-description ${dashboardType}`}> {textToShow} </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ToggleOptions;
