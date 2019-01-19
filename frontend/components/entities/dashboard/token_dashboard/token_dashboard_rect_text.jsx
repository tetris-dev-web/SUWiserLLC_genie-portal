import React from 'react';

const TokenDashBoardRectText = (props) => {
   let { inactiveTokenRatio, recentActiveTokens, recentTotalTokens } = props
   
  return (
    <g>
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
  );
};

export default TokenDashBoardRectText;
