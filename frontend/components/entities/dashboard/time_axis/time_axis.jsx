import React from 'react';
import * as d3 from 'd3';
import './time_axis.scss';

class TimeAxis extends React.Component  {
  constructor(props) {
    super(props);

    // this.state = {
    //   startTime: 0,
    //   endTime: 100
    // }

    this.margin = { top: 20, right: 50, bottom: 30, left: 50 };
    this.width = (960 - this.margin.left - this.margin.right);
    this.height = (500 - this.margin.top - this.margin.bottom);
  }


  drawAxis() {

    const { startTime, endTime } = this.props;
    console.log("inaxistimes", startTime, endTime);
    const scale = d3.scaleLinear()
    .range([0, this.width])
    .domain([0, 4])

    d3.select(this.axis)
      .call(d3.axisBottom(scale))
      // .ticks(d3.timeMinute.every(5))
      // .tickFormat(d3.timeFormat('%a %d')));
      // .tickFormat("-"));
      // .ticks(10, "s"))
      // .tickFormat()
      // .tickFormat(d3.timeFormat("%m.%y")));
  }


  componentDidMount() {
    this.drawAxis();
  }


  render() {
    return (
      <div className='time-axis'>
        <svg className='time-axis-svg' viewBox="0 0 960 100" preserveAspectRatio="xMinYMin meet">
          <text transform="translate(-70, 71)">QTR</text>
          <g className="time-axis-g"
            ref={node => this.axis = node}
            transform={`translate(${this.margin.left}, ${this.margin.top + this.margin.bottom})`}>
          </g>
        </svg>
      </div>
    );
  }
}

// CONTAINER

import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    startTime: state.chain_data.timeAxis.startTime,
    endTime: state.chain_data.timeAxis.endTime
  }
}


export default connect(mapStateToProps)(TimeAxis);
