import React from 'react';
import * as d3 from 'd3'

const TokenDashboardRect = (props) => {
  let { x, y, width, height, tokenData } = props;
  let { activeTokenRatio, recentTotalTokens, recentActiveTokens } = tokenData;
  let activeTokenPercentage = `${activeTokenRatio}%`;
  let inactiveTokenPercentage = `${100 - activeTokenRatio}%`;
  let inactiveTokenRatio = 100 - activeTokenRatio


  return(
      <React.Fragment>
        <svg width={width} height={height} x={0} y={0}
        style={{position:"absolute", left: "-1%", overflow: "visible"}}>
          <defs>
            <linearGradient id="Gradient1" x1="0" x2="0%" y1="0" y2="100%">
              <stop offset={inactiveTokenPercentage} stopColor={"rgba(170, 122, 96, .3)"}/>
              <stop offset={inactiveTokenPercentage} stopColor={"rgb(170, 122, 96)"}/>
              <stop offset="100%" stopColor={"rgb(170, 122, 96)"}/>
            </linearGradient>
          </defs>
          <g>
            <rect
            className="token-measure-rect"
            x={x}
            y={y}
            width={width}
            height={height}
            fill={"url(#Gradient1)"}
            rx="20"
            ry="20"
            stroke="black"
            strokeWidth=".5px" />

            <text x="0" y={`${inactiveTokenRatio/2}%`} fill="black">
              <tspan dx="125px" dy="0">
              {recentTotalTokens} total
              </tspan>
            </text>
            <text x='125px' y={`${inactiveTokenRatio/2}%`}>
              <tspan dx="0" dy="1.5em">
              tokens owned
              </tspan>
            </text>
            <text x='125px' y={`${(100 - inactiveTokenRatio)/2 + inactiveTokenRatio}%`}>
              <tspan dx="0" dy="0">
              {recentActiveTokens} active
              </tspan>
            </text>
            <text x='125px' y={`${(100 - inactiveTokenRatio)/2 + inactiveTokenRatio}%`}>
              <tspan dx="0" dy="1.5em">
              tokens
              </tspan>
            </text>

          </g>
        </svg>
      </React.Fragment>
  );
};

// <text fill="black" className="svg-rect-text" x="150px" y="30px">
// where is my text
// </text>
export default TokenDashboardRect
