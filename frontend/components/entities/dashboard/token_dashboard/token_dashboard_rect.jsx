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
    console.log(this.state);
    this.props.tokenRect && this.setState({ tokenSquareHovered: true });
  }
  handleMouseLeave(){
    this.props.tokenRect && this.setState({ tokenSquareHovered: false });
  }

  render(){
    let { x, y, width, height, tokenData, color, opaqueColor, id } = this.props;
    if(tokenData){
      var { hoveredActiveTokenRatio, hoveredTotalTokens, hoveredActiveTokens } = tokenData;
      var activeTokenPercentage = `${hoveredActiveTokenRatio}%`;
      var inactiveTokenPercentage = `${100 - hoveredActiveTokenRatio}%`;
      var inactiveTokenRatio = 100 - hoveredActiveTokenRatio
    }

    return(
      <React.Fragment>
        <svg width={width} height={height} x={0} y={0}
        style={{position:"absolute", left: "-1%", overflow: "visible"}}>
          { tokenData &&
            (<defs>
            <linearGradient id={id} x1="0" x2="0%" y1="0" y2="100%">
              <stop offset={inactiveTokenPercentage} stopColor={opaqueColor}/>
              <stop offset={inactiveTokenPercentage} stopColor={color}/>
              <stop offset="100%" stopColor={color}/>
            </linearGradient>
          </defs>)
        }
          <g>
            <rect
            className="token-measure-rect"
            x={x}
            y={y}
            width={width}
            height={height}
            fill={tokenData ? `url(#${id})` : color}
            rx="20"
            ry="20"
            stroke="black"
            strokeWidth=".5px"
            onMouseEnter={this.handleMouseOver}
            onMouseLeave={this.handleMouseLeave} />
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
