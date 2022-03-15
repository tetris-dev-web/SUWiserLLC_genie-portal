import React from "react";

const TokenGraphTokenPath = ({
  lineScale,
  lineData,
  pathType,
  opacity = 1,
  transform = "0, 0",
}) => (
  <g className={`token-graph-token-path ${pathType}`} transform={transform}>
    <path d={lineScale(lineData)} opacity={opacity}></path>
  </g>
);

export default TokenGraphTokenPath;
