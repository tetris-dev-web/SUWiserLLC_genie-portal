import React from 'react';
import * as d3 from 'd3';

const TokenGraphTokenPath = ({ xScale, yScale, lineData, opacity = 1, transform}) => {
  const lineScale = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.totalTokens))
    .curve(d3.curveMonotoneX);

  return (
    <g className="token-graph-token-path"
      transform={transform}>
      <path
        d={lineScale(lineData)}
        opacity={opacity}></path>
    </g>
  );
};

export default TokenGraphTokenPath;