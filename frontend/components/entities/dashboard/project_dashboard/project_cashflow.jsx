import React from 'react';
import * as d3 from 'd3';


class CashFlowGraph extends React.Component {
  constructor(props) {
    super(props);
    this.w = 300;
    this.h = 200;
    this.createSVG = this.createSVG.bind(this);
    this.setup = this.setup.bind(this);
  }

  componentDidMount(){
    this.setup();
  }

  setup(){
    const svg = this.createSVG();
    svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "pink");
    const xScale = d3.scaleLinear()
                     .domain([0,100])
                     .range([20, this.w-20]);

    const xAxis = d3.axisBottom()
                    .scale(xScale).ticks(5);

    svg.append("g")
        .call(xAxis);

  }

  createSVG() {
    return d3.select("#cash-graph").append('svg')
      .classed('project-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("width", this.w)
      .attr("height", this.h);
  }

  render() {
    return (
      <div id="cash-graph">
      </div>
    );
  }
}

export default CashFlowGraph;
