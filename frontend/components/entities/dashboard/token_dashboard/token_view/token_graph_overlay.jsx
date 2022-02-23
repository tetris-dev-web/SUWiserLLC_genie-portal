import React, { useState } from "react";
import * as d3 from "d3";
import TokenGraphSideBar from "./token_graph_side_bar";

const TokenGraphOverlay = (props) => {
  const { width, height, transform, data, xScale, yScaleTokens, yScaleEarnings } = props;

  const [indexHovered, setIndexHovered] = useState(null);
  const tickIntervalInPixel = width / (data.length - 1);

  const handleMouseMove = (e) => {
    const [x, y] = d3.clientPoint(e.currentTarget, e);
    const currentindexHovered = Math.round(x / tickIntervalInPixel);

    if (currentindexHovered !== indexHovered) {
      setIndexHovered(currentindexHovered);
    }
  };

  const handleMouseOut = () => {
    setIndexHovered(null);
  };

  // make this a function, bitch
  const TokenGraphLeftBar = (
    <TokenGraphSideBar
      width={100}
      x="-240"
      backgroundHeight={height}
      onHoverOverlaySubRects={
        indexHovered === null
          ? null
          : [
              {
                height: height - yScaleTokens(data[indexHovered].totalTokens),
                y: yScaleTokens(data[indexHovered].totalTokens),
                className: "token-graph-total-tokens-rect",
              },
              {
                height: height - yScaleTokens(data[indexHovered].activeTokens),
                y: yScaleTokens(data[indexHovered].activeTokens),
                className: "token-graph-active-tokens-rect",
              },
            ]
      }
      onHoverSideBarSubRects={[
        {
          height: height - yScaleTokens(data[data.length - 1].totalTokens),
          y: yScaleTokens(data[data.length - 1].totalTokens),
          className: "token-graph-total-tokens-rect",
          text: `Total Tokens: ${data[data.length - 1].totalTokens}`,
        },
        {
          height: height - yScaleTokens(data[data.length - 1].activeTokens),
          y: yScaleTokens(data[data.length - 1].activeTokens),
          className: "token-graph-active-tokens-rect",
          text: `Active Tokens: ${data[data.length - 1].activeTokens}`,
        },
      ]}
      side="left"
    />
  );
  // make this a function, bitch
  const TokenGraphRightBar = (
    <TokenGraphSideBar
      width={100}
      x="1000"
      backgroundHeight={height}
      onHoverOverlaySubRects={
        indexHovered === null
          ? null
          : [
              {
                height: height - yScaleEarnings(data[indexHovered].earnings),
                y: yScaleEarnings(data[indexHovered].earnings),
                className: "token-graph-earnings-rect",
              },
            ]
      }
      onHoverSideBarSubRects={[
        {
          height: height - yScaleEarnings(data[data.length - 1].earnings),
          y: yScaleEarnings(data[data.length - 1].earnings),
          className: "token-graph-earnings-rect",
          text: `Earnings: $${data[data.length - 1].earnings}`,
        },
      ]}
      side="right"
    />
  );
  // console.log('TokenGraphOverlay props = ', props, 'indexHovered=', indexHovered);
  return (
    <g className="token-graph-overlay" transform={transform}>
      <rect
        className="token-graph-overlay-rect"
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      ></rect>
      {indexHovered !== null && (
        <g className="token-graph-dashed-lines">
          <line
            className="total-tokens-line"
            x1="-200"
            y1={yScaleTokens(data[indexHovered].totalTokens)}
            x2={xScale(data[indexHovered].date)}
            y2={yScaleTokens(data[indexHovered].totalTokens)}
          ></line>
          <line
            className="active-tokens-line"
            x1="-200"
            y1={yScaleTokens(data[indexHovered].activeTokens)}
            x2={xScale(data[indexHovered].date)}
            y2={yScaleTokens(data[indexHovered].activeTokens)}
          ></line>
          <line
            className="earnings-line"
            x1={xScale(data[indexHovered].date)}
            y1={yScaleEarnings(data[indexHovered].earnings)}
            x2={width + 200}
            y2={yScaleEarnings(data[indexHovered].earnings)}
          ></line>
          <text x="-70" y={yScaleTokens(data[indexHovered].totalTokens) - 10}>
            <tspan>{`${data[indexHovered].totalTokens} tokens held`}</tspan>
          </text>
          <text x="-70" y={yScaleTokens(data[indexHovered].activeTokens) + 25}>
            <tspan>{`${data[indexHovered].activeTokens} active tokens`}</tspan>
          </text>
          <text x={width + 5} y={yScaleEarnings(data[indexHovered].earnings) - 10}>
            <tspan>{`$${data[indexHovered].earnings} in earnings`}</tspan>
          </text>
          <line
            className="vertical-time-line"
            x1={xScale(data[indexHovered].date)}
            y1="0"
            x2={xScale(data[indexHovered].date)}
            y2={height}
          ></line>
        </g>
      )}
      {TokenGraphLeftBar}
      {TokenGraphRightBar}
    </g>
  );
};

export default TokenGraphOverlay;
