import React from "react";

const VotesViewPitchedProjectsCircle = (props) => {
  const [state, setState] = React.useState({
    r: 8,
  });

  const { cx, cy, r, opacity, project, openModal, selectedProject } = props;
  console.log("projects", project);
  console.log("openModalFunction", openModal);

  console.log("projects", project.id);

  let i = 0;

  if (project.id === 3 && i === 0) {
    openModal(project.id);
    i += 1;
  }

  return (
    <g className={`"votes-view-project-circle" ${selectedProject ? "" : "hidden"} `}>
      <circle
        fill="#61aba9"
        cx={cx}
        cy={cy}
        r={state.r}
        y="90"
        stroke="white"
        strokeWidth=".7px"
        opacity={opacity}
        onClick={() => openModal(project.id)}
        onMouseOver={() => setState({ r: 12 })}
        onMouseLeave={() => setState({ r: 8 })}
      ></circle>
      <text
        x={cx}
        y={cy + 5}
        fill="white"
        textAnchor="middle"
        stroke="#51c5cf"
        strokeWidth=".2px"
        dy=".005em"
      >
        i
      </text>
    </g>
  );
};

// CONTAINER
import { connect } from "react-redux";
import { openModal } from "../../../../../../actions/modal_actions";

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (projectId) => dispatch(openModal(projectId)),
  };
};

export default connect(null, mapDispatchToProps)(VotesViewPitchedProjectsCircle);
