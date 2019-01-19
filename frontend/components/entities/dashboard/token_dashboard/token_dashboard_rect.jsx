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
  }
  handleMouseLeave(){
    this.props.tokenRect && this.setState({ tokenSquareHovered: false });
  }

  render(){
    let { x, y, width, height, tokenData, color, opaqueColor } = this.props;
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
              <stop offset={inactiveTokenPercentage} stopColor={opaqueColor}/>
              <stop offset={inactiveTokenPercentage} stopColor={color}/>
              <stop offset="100%" stopColor={color}/>
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
            strokeWidth=".5px"
            onMouseEnter={this.handleMouseOver}
            onMouseLeave={this.handleMouseLeave} />
            {
              this.state.tokenSquareHovered && (
                <TokenDashBoardRectText
                inactiveTokenRatio={inactiveTokenRatio}
                recentActiveTokens={recentActiveTokens}
                recentTotalTokens={recentTotalTokens} />
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
