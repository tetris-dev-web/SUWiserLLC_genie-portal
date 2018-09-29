import React from 'react';
import * as d3 from 'd3';


class CashFlowGraph extends React.Component {
  constructor(props) {
    super(props);
    this.createSVG = this.createSVG.bind(this);
    this.setup = this.setup.bind(this);
  }

  componentDidMount(){
    this.setup();
  }

  setup(){
    const svg = this.createSVG();
    const node = svg.selectAll(".node")
      .data([1,2,3,4,5])
      .enter()
      .append('g')
      .attr("class", "node");
    node.append('rect')
      .attr("width",3)
      .attr("height",10).style('fill','red')
      .attr("x", (d)=>{
        return (d+10)*3;})
      .attr("y", 40);

  }

  createSVG() {
    return d3.select("#cash-graph").append('svg')
      .classed('project-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("width", 300)
      .attr("height", 200);
  }

  render() {
    return (
      <div id="cash-graph">

      </div>
    );
  }
}

export default CashFlowGraph;
