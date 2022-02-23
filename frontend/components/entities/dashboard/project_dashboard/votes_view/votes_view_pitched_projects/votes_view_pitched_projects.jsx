import React, { useEffect } from "react";
import VotesViewPitchedProjectsRect from "./votes_view_pitched_projects_rect";
import { receiveProjectPerformanceData } from "../../../../../../actions/project_actions";
import { connect } from "react-redux";

const VotesViewPitchedProjects = (props) => {
  let minWidth = null;

  useEffect(() => {
    watchVoteChange();
  }, []);

  const processProjectData = () => {
    const {
      capitalBeingRaised,
      capitalTotal,
      pitchedProjects,
      SVGYScale,
      SVGHeightScale,
      SVGWidth,
    } = props;
    const numberOfProjects = pitchedProjects.length;
    const totalWidth = 0.6 * SVGWidth;
    const marginWidth = 0.01 * SVGWidth;
    const totalProjectWidth = totalWidth - (numberOfProjects - 1) * marginWidth;
    let projectStartX = 0.2 * SVGWidth;

    return pitchedProjects.map((project) => {
      const projectWidth = project.voteShare * totalProjectWidth;
      if (projectWidth > 0 && (!minWidth || projectWidth < minWidth)) {
        minWidth = projectWidth;
      }

      const newProject = Object.assign({}, project, {
        fill: capitalBeingRaised < project.capitalRequired ? "#aa7a60" : "#61aba9",
        marginWidth,
        projectStartX,
        projectWidth,
        projectValutionHeight: SVGHeightScale(project.valuation),
        projectValutionStartY: SVGYScale(project.valuation + capitalTotal - capitalBeingRaised),
        projectCapitalRequiredHeight: SVGHeightScale(project.capitalRequired),
        projectCapitalRequiredStartY: SVGYScale(
          project.capitalRequired + capitalTotal - capitalBeingRaised,
        ),
        projectRectCenter: projectStartX + projectWidth / 2,
      });

      projectStartX += marginWidth + projectWidth;
      return newProject;
    });
  };

  const watchVoteChange = () => {
    const { votingInstance, receiveProject } = props;

    votingInstance.VoteChange().watch((error, event) => {
      receiveProject({ id: Number(event.args.projectId), votes: Number(event.args.totalVotes) });
    });
  };

  const {
    selectedProject,
    SVGWidth,
    toggleSelectedProject,
    voteShiftTool,
    SVGYScale,
    circleScale,
    margin,
  } = props;

  const rects = processProjectData().map((project, idx) => {
    project.projectWidth = project.projectWidth > 0 ? project.projectWidth : minWidth / 3;
    return (
      <VotesViewPitchedProjectsRect
        key={idx}
        transform={`translate(263, 0)`}
        project={project}
        SVGWidth={SVGWidth}
        SVGYScale={SVGYScale}
        circleScale={circleScale}
        selectedProject={selectedProject}
        toggleSelectedProject={toggleSelectedProject}
        voteShiftTool={voteShiftTool}
      />
    );
  });
  // console.log(rects, "RECTS")
  return (
    <g className="votes-view-pitched-projects" transform={"translate(0, 0)"}>
      <text className="votes-view-percentage-breakdown" transform={"translate(303, 220)"}>
        leading project ---
      </text>
      {rects}
      <text className="votes-view-percentage-breakdown" transform={"translate(675, 220)"}>
        {" "}
        projects by vote %
      </text>
    </g>
  );
};

/// CONTAINER
const mapStateToProps = (state) => {
  return {
    votingInstance: state.network.votingInstance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveProject: (project) => dispatch(receiveProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VotesViewPitchedProjects);
