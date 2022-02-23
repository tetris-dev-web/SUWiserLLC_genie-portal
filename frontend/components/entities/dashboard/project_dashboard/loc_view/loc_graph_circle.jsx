import React, { useState } from "react";
import { connect } from "react-redux";
import { openModal } from "../../../../../actions/modal_actions";

const LocGraphCircle = (props) => {
  const { className, transform, r, fill, project, openModal } = props;

  const [showText, setShowText] = useState(false);

  const handleHover = (boolean) => {
    return () => {
      setShowText(boolean);
    };
  };

  return (
    <g
      className={`${className}-group`}
      transform={transform}
      onMouseEnter={handleHover(true)}
      onMouseLeave={handleHover(false)}
      onClick={() => openModal(project.id)}
    >
      <circle className={`${className} outter`} r={r} fill={fill}></circle>
      <circle className={`${className} inner`} r="10" fill="white"></circle>
      {showText && <text y={-r - 10}>{project.title}</text>}
    </g>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (projectId) => dispatch(openModal(projectId)),
  };
};

export default connect(null, mapDispatchToProps)(LocGraphCircle);
