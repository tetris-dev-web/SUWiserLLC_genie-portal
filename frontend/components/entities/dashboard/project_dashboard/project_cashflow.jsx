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
    
      const x = d3.scaleLinear().range([0, 200]).domain([0,200]);
      const y = d3.scaleLinear().range([200, 0]).domain([0,200]);
      var xAxis = d3.axis().scale(x)
          .orient("bottom").ticks(5);

      var yAxis = d3.axis().scale(y)
          .orient("left").ticks(5);

      svg.append("g")
       .attr("class", "x axis")
       .call(xAxis);

       svg.append("g")
         .attr("class", "y axis")
         .call(yAxis);

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
