import React from 'react';
import TokenDashBoardRectText from './token_dashboard_rect_text';

class TokenDashboardRect extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tokenSquareHovered: false,
      earningsSquareHovered: false
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseOver(){
    this.props.tokenRect && this.setState({ tokenSquareHovered: true });
    console.log(this.state);
  }
  handleMouseLeave(){
    this.props.tokenRect && this.setState({ tokenSquareHovered: false });
  }

  render(){
    let { x, y, width, height, tokenData, color, opaqueColor, id, earningsData, className, userMaxTokens, userMaxEarnings } = this.props;
    if(tokenData){
      var { hoveredActiveTokenRatio, hoveredTotalTokens, hoveredActiveTokens } = tokenData;
      var activeTokenPercentage = `${hoveredActiveTokenRatio}%`;
      var inactiveTokenPercentage = `${100 - hoveredActiveTokenRatio}%`;
      var inactiveTokenRatio = 100 - hoveredActiveTokenRatio;

      var hoveredTotalTokensHeight = `${hoveredTotalTokens/userMaxTokens * height}`;
      var hoveredTotalTokensY = `${height - hoveredTotalTokensHeight}`;
      var hoveredActiveTokensHeight = `${hoveredActiveTokens/userMaxTokens * height}`;
      var hoveredActiveTokensY = `${height - hoveredActiveTokensHeight}`;
      var inactiveTokenVsMaxRatio = `${hoveredActiveTokens / userMaxTokens * 100}%`;
    }

    if (earningsData) {
      var earningsPercentage = `${((earningsData.hoveredEarnings/userMaxEarnings)*100)}%`
      var earningsRatio = `${((earningsData.hoveredEarnings/userMaxEarnings)*100)}`
      var earningsRectY = `${height - (height * (earningsRatio/100))}`
      console.log(earningsPercentage);
    }

    let fillPercentage = earningsData ? earningsPercentage : hoveredTotalTokensHeight

    let subFillPercentage = earningsData ? inactiveTokenVsMaxRatio :inactiveTokenVsMaxRatio

    return(
      <React.Fragment>
        <svg width={width} height={height} x={0} y={0}
        className={className}>
          {
          //   false &&
          //   (<defs>
          //   <linearGradient id={id} x1="0" x2="0%" y1="0" y2="100%">
          //     <stop offset={fillPercentage} stopColor={opaqueColor}/>
          //     <stop offset={fillPercentage} stopColor={color}/>
          //     <stop offset="100%" stopColor={color}/>
          //   </linearGradient>
          // </defs>)
        }
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
            onMouseEnter={this.handleMouseOver}
            onMouseLeave={this.handleMouseLeave} />
            {
              //console.log(parseInt(fillPercentage.slice(0,fillPercentage.length-1)))
            }
            {
              <rect fill={earningsData ? color : opaqueColor} width={width} height={fillPercentage} x={x} y={tokenData ? hoveredTotalTokensY : earningsRectY} rx="20" ry="20"/>
            }
            {
              tokenData &&
              (
                <rect fill={color} width={width} height={subFillPercentage} x={x} y={tokenData ? hoveredActiveTokensY : height - fillPercentage} rx="20" ry="20"/>
              )
            }
            {
              // this.state.tokenSquareHovered &&
              tokenData &&
              (
                <TokenDashBoardRectText
                inactiveTokenRatio={inactiveTokenRatio}
                hoveredActiveTokens={hoveredActiveTokens}
                hoveredTotalTokens={hoveredTotalTokens} />
              )
            }

            {
              earningsData &&
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
};

// <text fill="black" className="svg-rect-text" x="150px" y="30px">
// where is my text
// </text>
export default TokenDashboardRect
