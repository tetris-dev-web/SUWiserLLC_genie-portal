import React, { useEffect } from "react";
import * as d3 from "d3";

const TokenGraphXAxis = (props) => {
  const { xScale, transform } = props;

  const drawAxis = () => {
    console.log(xScale);
    d3.select(axis).call(d3.axisBottom(xScale));
  };

  useEffect(() => {
    drawAxis();
  }, []);

  return <g className="token-graph-x-axis" transform={transform} ref={(node) => (axis = node)}></g>;
};
export default TokenGraphXAxis;
// "%m.%y"
