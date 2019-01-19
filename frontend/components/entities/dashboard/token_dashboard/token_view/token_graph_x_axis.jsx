import React from 'react';
import * as d3 from 'd3';

class TokenGraphXAxis extends React.Component  {
  componentDidMount() {
    const { xScale } = this.props;
    console.log(this.axis);
    // d3.select(this.axis).call(d3.axisBottom(xScale))
    //   .tickFormat(d3.timeFormat("%m.%y"));
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <g className="token-graph-x-axis"
        ref={node => this.axis = node}>
      </g>
    );
  }
}

export default TokenGraphXAxis;