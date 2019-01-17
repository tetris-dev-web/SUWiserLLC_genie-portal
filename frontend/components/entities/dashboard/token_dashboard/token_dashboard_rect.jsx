import React from 'react';
import * as d3 from 'd3'

const TokenDashboardRect = (props) => {
  let { x, y, width, height, activeTokenRatio } = props;
  return(
    <svg width={width} height={height} x={0} y={0}
    style={{position:"absolute", left: "1%"}}>
      <defs>
        <linearGradient id="Gradient1" x1="0" x2="0%" y1="0" y2="100%">
        <stop offset={activeTokenRatio} stopColor={"white"}/>
        <stop offset={activeTokenRatio} stopColor={"rgb(97, 171, 169)"}/>
        <stop offset="90%" stopColor={"rgb(97, 171, 169)"}/>
        </linearGradient>
      </defs>
      <rect
          className="token-measure-rect"
          x={x}
          y={y}
          width={width}
          height={height}
          fill={"url(#Gradient1)"}
          rx="0"
          ry="0"
          stroke="black"
          strokeWidth="1px" />
      </svg>
  );
};

export default TokenDashboardRect
