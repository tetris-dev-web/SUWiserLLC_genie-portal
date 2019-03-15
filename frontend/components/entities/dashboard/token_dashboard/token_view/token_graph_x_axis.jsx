import React from 'react';
import * as d3 from 'd3';

class TokenGraphXAxis extends React.Component  {
  drawAxis() {
    const { xScale } = this.props;
console.log(xScale)
    d3.select(this.axis)
      .call(d3.axisBottom(xScale))
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

  componentDidUpdate() {
    this.drawAxis();
  }

  render() {
    const { transform } = this.props;

    return (
      <g className="token-graph-x-axis"
        transform={transform}
        ref={node => this.axis = node}>
      </g>
    );
  }
}

export default TokenGraphXAxis;
// "%m.%y"
