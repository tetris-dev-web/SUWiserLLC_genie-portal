import React from 'react';
// import TokenDashBoardRectText from '../token_dashboard_rect_text';

const TokenGraphRect = ({ width, x, backgroundHeight, totalTokensHeight, totalTokensY, activeTokensHeight, activeTokensY, earningsHeight, earningsY, className }) => {
    // if(dataHovered){
    //   const { earnings, totalTokens, activeTokens } = dataHovered;
    //   const inactiveTokenRatio = 100 - hoveredActiveTokenRatio;

    //   const hoveredTotalTokensHeight = `${hoveredTotalTokens/userMaxTokens * height}`;
    //   const hoveredTotalTokensY = `${height - hoveredTotalTokensHeight}`;
    //   const hoveredActiveTokensHeight = `${hoveredActiveTokens/userMaxTokens * height}`;
    //   const hoveredActiveTokensY = `${height - hoveredActiveTokensHeight}`;
    //   const inactiveTokenVsMaxRatio = `${hoveredActiveTokens / userMaxTokens * 100}%`;
    // }

    // if (earningsData) {
    //   const earningsPercentage = `${((earningsData.hoveredEarnings/userMaxEarnings)*100)}%`;
    //   const earningsRatio = `${((earningsData.hoveredEarnings/userMaxEarnings)*100)}`;
    //   const earningsRectY = `${height - (height * (earningsRatio/100))}`;
    // } else {
    //   const earningRectY;
    // }

    // let fillPercentage = earningsData ? earningsPercentage : hoveredTotalTokensHeight;

    // let subFillPercentage = earningsData ? inactiveTokenVsMaxRatio :inactiveTokenVsMaxRatio;

    // let subRectY = dataHovered ? hoveredTotalTokensY : earningsRectY
  return(
    <svg className={className} x={x} width={width} height={backgroundHeight}>
      <g>
        <rect
          className="token-graph-background-rect"
          width={width}
          height={backgroundHeight}
          fill={"transparent"}
          stroke="black"
          strokeWidth=".5px"
          strokeDasharray="5, 5" />
        {
          earningsHeight ?
          <rect
            className="token-graph-earnings-rect"
            width={width}
            height={earningsHeight}
            y={earningsY} />
          :
          <React.Fragment>
            <rect
              className="token-graph-total-tokens-rect"
              width={width}
              height={totalTokensHeight}
              y={totalTokensY} />
            <rect
              className="token-graph-active-tokens-rect"
              width={width}
              height={activeTokensHeight}
              y={activeTokensY} />
          </React.Fragment>
        }
      </g>
    </svg>
  );
};

export default TokenGraphRect;
