import React from 'react';
import TokenDashBoardRectText from './token_dashboard_rect_text';

class TokenDashboardRect extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let { x, y, width, height, tokenData, color, opaqueColor, earningsData, className, userMaxTokens, userMaxEarnings, projectIndex } = this.props;

    if(tokenData){
      var { hoveredActiveTokenRatio, hoveredTotalTokens, hoveredActiveTokens } = tokenData;
      var inactiveTokenRatio = 100 - hoveredActiveTokenRatio;

      var hoveredTotalTokensHeight = `${hoveredTotalTokens/userMaxTokens * height}`;
      var hoveredTotalTokensY = `${height - hoveredTotalTokensHeight}`;
      var hoveredActiveTokensHeight = `${hoveredActiveTokens/userMaxTokens * height}`;
      var hoveredActiveTokensY = `${height - hoveredActiveTokensHeight}`;
      var inactiveTokenVsMaxRatio = `${hoveredActiveTokens / userMaxTokens * 100}%`;
    }

    if (earningsData) {
      var earningsPercentage = `${((earningsData.hoveredEarnings/userMaxEarnings)*100)}%`;
      var earningsRatio = `${((earningsData.hoveredEarnings/userMaxEarnings)*100)}`;
      var earningsRectY = `${height - (height * (earningsRatio/100))}`;
    } else {
      var earningRectY;
    }

    let fillPercentage = earningsData ? earningsPercentage : hoveredTotalTokensHeight;

    let subFillPercentage = earningsData ? inactiveTokenVsMaxRatio :inactiveTokenVsMaxRatio;

    let subRectY = tokenData ? hoveredTotalTokensY : earningsRectY

    return(
      <React.Fragment>
        <svg width={width} height={height} x={0} y={0}
        className={className}>
          <g>
            <rect
                  className="token-measure-rect"
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={"transparent"}
                  rx="20"
                  ry="20"
                  stroke="black"
                  strokeWidth=".5px"
                  strokeDasharray="5, 5" />
                {
                  projectIndex &&
            <rect
                  fill={earningsData ? color : opaqueColor}
                  width={width}
                  height={fillPercentage}
                  x={x}
                  y={subRectY}
                  rx="20"
                  ry="20"/>
                }
            {
              tokenData && projectIndex &&
              (
                <rect
                      fill={color}
                      width={width}
                      height={subFillPercentage}
                      x={x}
                      y={tokenData ? hoveredActiveTokensY : height - fillPercentage}
                      rx="20"
                      ry="20"/>
              )
            }
            {
              tokenData && projectIndex &&
              (
                <TokenDashBoardRectText
                inactiveTokenRatio={inactiveTokenRatio}
                hoveredActiveTokens={hoveredActiveTokens}
                hoveredTotalTokens={hoveredTotalTokens} />
              )
            }

            {
              earningsData && projectIndex &&
              (
                  <TokenDashBoardRectText
                  earningsData={earningsData} />
              )
            }
          </g>
        </svg>
      </React.Fragment>
    );
  }
}

export default TokenDashboardRect;
