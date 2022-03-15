import React, { useEffect } from "react";
import * as d3 from "d3";
import "./time_axis.scss";

// CONTAINER

import { connect } from "react-redux";

const TimeAxis = (props) => {
  const { startTime, endTime } = props;
  const node = React.useRef(null);
  // const axis = node;

  const margin = { top: 20, right: 50, bottom: 30, left: 50 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  // const node = React.useRef(null)
  let axis;
  useEffect(() => {
    drawAxis();
  }, [axis]);
  const drawAxis = () => {
    console.log("inaxistimes", startTime, endTime);
    const scale = d3.scaleLinear().range([0, width]).domain([0, 4]);

    d3.select(axis).call(d3.axisBottom(scale));
  };

  return (
    <div className="time-axis">
      <svg className="time-axis-svg" viewBox="0 0 960 100" preserveAspectRatio="xMinYMin meet">
        <text transform="translate(-70, 71)" fill="white">
          QTR
        </text>
        <g
          className="time-axis-g"
          ref={(node) => (axis = node)}
          transform={`translate(${margin.left}, ${margin.top + margin.bottom})`}
        ></g>
      </svg>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    startTime: state.chain_data.timeAxis.startTime,
    endTime: state.chain_data.timeAxis.endTime,
  };
};

export default connect(mapStateToProps)(TimeAxis);
