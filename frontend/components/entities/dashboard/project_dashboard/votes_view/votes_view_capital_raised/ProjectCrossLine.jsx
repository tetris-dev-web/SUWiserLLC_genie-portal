import React from "react";
import colors from "../../../../../../util/_variables.scss";

const ProjectCrossLine = ({ x1, y1, x2, y2, opacity, transform }) => (
  <line
    className="ProjectCrossLine"
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    transform={transform}
    opacity={opacity}
  ></line>
);

export default ProjectCrossLine;
