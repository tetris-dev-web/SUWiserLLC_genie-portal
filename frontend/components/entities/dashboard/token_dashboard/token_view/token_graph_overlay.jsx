import React from 'react';
import * as d3 from 'd3';
import TokenGraphSideBars from './token_graph_side_bars';

class TokenGraphOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      dataHovered: null
    };

    this.tickIntervalInPixel = this.props.width / (this.props.data.length - 1);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  
  handleMouseMove(e) {
    const { dataHovered } = this.state;
    const [x, y] = d3.clientPoint(e.currentTarget, e);
    const currentDataHovered = Math.round(x / this.tickIntervalInPixel);

    if (currentDataHovered !== dataHovered) {
      this.setState({ dataHovered: currentDataHovered });
    }
  }

  handleMouseOut() {
    this.setState({
      dataHovered: null
    });
  }

  render() {
    const { width, height, transform, data, xScale, yScaleTokens, yScaleEarnings } = this.props;
    const { dataHovered } = this.state;

    return (
      <g className="token-graph-overlay"
        transform={transform}>
        <rect className="token-graph-overlay-rect"
          width={width}
          height={height}
          onMouseMove={this.handleMouseMove}
          onMouseOut={this.handleMouseOut}
          ></rect>
        {
          dataHovered !== null &&
          <g className="token-graph-dashed-lines">
            <line
              className="total-tokens-line"
              x1="-200"
              y1={yScaleTokens(data[dataHovered].totalTokens)}
              x2={xScale(data[dataHovered].date)}
              y2={yScaleTokens(data[dataHovered].totalTokens)}></line>
            <line
              className="active-tokens-line"
              x1="-200"
              y1={yScaleTokens(data[dataHovered].activeTokens)}
              x2={xScale(data[dataHovered].date)}
              y2={yScaleTokens(data[dataHovered].activeTokens)}></line>
            <line
              className="earnings-line"
              x1={xScale(data[dataHovered].date)}
              y1={yScaleEarnings(data[dataHovered].earnings)}
              x2={width + 200}
              y2={yScaleEarnings(data[dataHovered].earnings)}></line>
            <text
              x="-70"
              y={yScaleTokens(data[dataHovered].totalTokens) - 10}>
              <tspan>{`${data[dataHovered].totalTokens} tokens held`}</tspan>
            </text>
            <text
              x="-70"
              y={yScaleTokens(data[dataHovered].activeTokens) + 25}>
              <tspan>{`${data[dataHovered].activeTokens} active tokens`}</tspan>
            </text>
            <text
              x={width + 5}
              y={yScaleEarnings(data[dataHovered].earnings) - 10}>
              <tspan>{`$${data[dataHovered].earnings} in earnings`}</tspan>
            </text>
            <line
              className="vertical-time-line"
              x1={xScale(data[dataHovered].date)}
              y1="0"
              x2={xScale(data[dataHovered].date)}
              y2={height}></line>
          </g>
        }
        <TokenGraphSideBars 
          width={100}
          x="-240"
          backgroundHeight={height}
          totalTokensHeight={dataHovered === null ? 0 : height - yScaleTokens(data[dataHovered].totalTokens)}
          totalTokensY={dataHovered === null ? height : yScaleTokens(data[dataHovered].totalTokens)}
          activeTokensHeight={dataHovered === null ? 0 : height - yScaleTokens(data[dataHovered].activeTokens)}
          activeTokensY={dataHovered === null ? height : yScaleTokens(data[dataHovered].activeTokens)}
          className={"token-graph-side-bars left"}
        />
        <TokenGraphSideBars
          width={100}
          x="1000"
          backgroundHeight={height}
          earningsHeight={dataHovered === null ? 0 : height - yScaleEarnings(data[dataHovered].earnings)}
          earningsY={dataHovered === null ? height : yScaleEarnings(data[dataHovered].earnings)}
          className={"token-graph-side-bars right"}
        />
      </g>
    );
  }
}

export default TokenGraphOverlay;