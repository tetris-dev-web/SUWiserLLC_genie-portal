import React from 'react';
import * as d3 from 'd3'

const TokenDashboardRect = (props) => {
  let { x, y, width, height } = this.props;
  return(
    <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="15"
        ry="15"
        fill="rgb(97, 171, 169)" />
  );
};

export default TokenDashboardRect
