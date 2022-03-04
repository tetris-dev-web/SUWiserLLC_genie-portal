import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import VotesViewCapitalRaised from "./votes_view_capital_raised/votes_view_capital_raised";
import VotesViewPitchedProjects from "./votes_view_pitched_projects/votes_view_pitched_projects";
import VoteShiftTool from "./vote_shift_tool";
import Loader from "../../loader/loader";
import "./votes_graph.scss";
import { merge } from "lodash";

const VotesGraph = (props) => {
  const [state, setState] = useState({
    selectedProject: null,
    componentVisible: "invisible",
    voteViewOpen: false,
  });

  const margin = { top: 20, right: 50, bottom: 30, left: 50 };
  const SVGWidth = (960 - margin.left - margin.right) * 0.5;
  const SVGHeight = 600 * 0.5;
  const timeWidth = (960 - margin.left - margin.right) * 0.5;
  const { wait, projectsLoaded, fetchSharedProjectGraphData } = props;

  let voteShiftTool;

  useEffect(() => {

    setTimeout(() => {
      setState(merge({}, state, { componentVisible: "" }));
    }, wait);

    if (!projectsLoaded) {
      fetchSharedProjectGraphData();
    }
console.log("1");
    props.fetchCapitalHistory(props.crowdsaleInstance);
console.log("2");
    watchProjectPitch();
    watchTokenPurchase();
console.log("3");

  }, []);

  const watchProjectPitch = () => {
    //event listener for pitched projects // get project from database and integrate into store
    const { projectFactoryInstance, projectContract } = props;
    projectFactoryInstance.ProjectPitch().watch((error, event) => {
      const address = event.args.projectAddress;
      // const id = event.args.projectId;
      props.fetchProject(address);
    });
  };

  const watchTokenPurchase = () => {
    console.log("watching purchase");
    props.crowdsaleInstance.TokenPurchase().watch((error, event) => {
      props.receiveTokenPurchase({
        blockNumber: event.blockNumber,
        value: Number(event.args.value),
      });
      props.notifyTransactionCompletion({
        notification: "Your token purchase transaction has been mined to the blockchain.",
      });
    });
  };

  const createScales = () => {
    const {
      capitalBeingRaised,
      capitalDeployed,
      capitalTotal,
      pitchedProjectsValuationMinMax,
      allProjectsValuationMinMax,
    } = props;
    const { startTime, endTime } = props;
    return {
      SVGHeightScale: d3
        .scaleLinear()
        .range([0, SVGHeight])
        .domain([
          0,
          capitalDeployed + Math.max(pitchedProjectsValuationMinMax[1], capitalBeingRaised),
        ]),
      SVGYScale: d3
        .scaleLinear()
        .range([SVGHeight, 0])
        .domain([
          0,
          capitalDeployed + Math.max(pitchedProjectsValuationMinMax[1], capitalBeingRaised),
        ]),
      SVGTimeXScale: d3.scaleLinear().domain([startTime, endTime]).range([0, timeWidth]),
      circleScale: d3.scaleLinear().domain(allProjectsValuationMinMax).range([5, 10]),
    };
  };

  const dataHasLoaded = () => {
    return props.lineData;
  };

  const renderGraph = () => {
    const { SVGHeightScale, SVGYScale, SVGTimeXScale, circleScale } = createScales();
    const { selectedProject, componentVisible } = state;
    const { startTime, endTime } = props;
    let button;
    if (!state.voteViewOpen) {
      button = (
        <button
          className="voteBreakDownButtonOpen bounceOnHover"
          onClick={() => setState(merge({}, state, { voteViewOpen: !state.voteViewOpen }))}
        >
          projects under consideration
        </button>
      );
    } else if (selectedProject) {
      button = "";
    } else {
      button = (
        <button
          className="voteBreakDownButtonClose bounceOnHover"
          onClick={() => setState(merge({}, state, { voteViewOpen: !state.voteViewOpen }))}
        >
          X
        </button>
      );
    }

    return (
      <div className={`votes-graph ${componentVisible}`}>
        <div className="vote-shift-tool-container" ref={(node) => (voteShiftTool = node)}>
          {selectedProject && <VoteShiftTool selectedProject={selectedProject.address} />}
        </div>
        {button}

        <svg className="votes-view-svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 960 300">
          <VotesViewCapitalRaised
            {...props}
            {...state}
            margin={margin}
            SVGYScale={SVGYScale}
            SVGHeightScale={SVGHeightScale}
            SVGTimeXScale={SVGTimeXScale}
            circleScale={circleScale}
            startTime={startTime}
            endTime={endTime}
          />

          {!state.voteViewOpen ? (
            ""
          ) : (
            <VotesViewPitchedProjects
              {...props}
              {...state}
              margin={margin}
              SVGYScale={SVGYScale}
              SVGHeightScale={SVGHeightScale}
              SVGWidth={SVGWidth}
              circleScale={circleScale}
              voteShiftTool={voteShiftTool}
              toggleSelectedProject={(selectedProject) =>
                setState(merge({}, state, { selectedProject }))
              }
            />
          )}
        </svg>
      </div>
    );
  };

  return dataHasLoaded() ? renderGraph() : <Loader />;
};

export default VotesGraph;
