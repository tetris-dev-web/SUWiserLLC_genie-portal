import React from 'react';
import * as d3 from 'd3';

class TokenGraphOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      showDashedLines: false,
      dataHovered: null
    };

    this.tickIntervalInPixel = this.props.width / (this.props.data.length - 1);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseEnter() {
    this.setState({ showDashedLines: true });
  }
  
  handleMouseMove(e) {
    const { showDashedLines, dataHovered } = this.state;
    if (showDashedLines) {
      const [x, y] = d3.clientPoint(e.currentTarget, e);
      const currentDataHovered = Math.round(x / this.tickIntervalInPixel);
      if (currentDataHovered !== dataHovered) {
        this.setState({ dataHovered: currentDataHovered });
      }
    }
  }

  handleMouseOut() {
    this.setState({ 
      showDashedLines: false,
      dataHovered: null
    });
  }

  render() {
    const { width, height, transform, data, xScale, yScaleTokens, yScaleEarnings } = this.props;
    const { showDashedLines, dataHovered } = this.state;

    return (
      <g className="token-graph-overlay"
        transform={transform}>
        <rect className="token-graph-overlay-rect"
          width={width}
          height={height}
          onMouseEnter={this.handleMouseEnter}
          onMouseMove={this.handleMouseMove}
          onMouseOut={this.handleMouseOut}
          ></rect>
        {
          showDashedLines && dataHovered !== null &&
          <g className="token-graph-dashed-lines">
            <text
              x="-50"
              y={yScaleTokens(data[dataHovered].totalTokens) - 10}>
              <tspan>{`${data[dataHovered].totalTokens}`}</tspan>
            </text>
            <line
              className="total-tokens-line"
              x1="-200"
              y1={yScaleTokens(data[dataHovered].totalTokens)}
              x2={xScale(data[dataHovered].date)}
              y2={yScaleTokens(data[dataHovered].totalTokens)}></line>
            <text
              x="-50"
              y={yScaleTokens(data[dataHovered].activeTokens) - 10}>
              <tspan>{`${data[dataHovered].activeTokens}`}</tspan>
            </text>
            <line
              className="active-tokens-line"
              x1="-200"
              y1={yScaleTokens(data[dataHovered].activeTokens)}
              x2={xScale(data[dataHovered].date)}
              y2={yScaleTokens(data[dataHovered].activeTokens)}></line>
          </g>
        }
      </g>
    );
  }
}

export default TokenGraphOverlay;