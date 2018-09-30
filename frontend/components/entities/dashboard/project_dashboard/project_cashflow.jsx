import React from 'react';
import * as d3 from 'd3';


class CashFlowGraph extends React.Component {
  constructor(props) {
    super(props);
    this.w = 300;
    this.h = 200;
    this.createSVG = this.createSVG.bind(this);
    this.createAxes = this.createAxes.bind(this);
    this.formatCashData = this.formatCashData.bind(this);
    this.setup = this.setup.bind(this);
  }

  componentDidMount(){
    this.setup();
  }

  setup(){
    const svg = this.createSVG();
    const cashData = this.formatCashData();
    const {xAxis} = this.createAxes();
    svg.append("g")
        .attr('class','axis')
        .attr("transform", "translate(0," + (this.h - 20) + ")")
        .call(xAxis);

  }

  formatCashData() {
    debugger
    const jsonCashData = JSON.parse(this.props.project.cashflow);
    const expectedNet = jsonCashData.ExpectedNet;
    const quarters = Object.keys(expectedNet);
    const valuesForQuarters = Object.values(expectedNet);
    const minValue = d3.min(valuesForQuarters);
    const maxValue = d3.max(valuesForQuarters);


    return {
      numQuarters: quarters.length,
      minValue: minValue,
      maxValue: maxValue,
    };
  }

  createAxes() {
    const xScale = d3.scaleLinear()
                     .domain([0,100])
                     .range([20, this.w-20]);

    const xAxis = d3.axisBottom()
                    .scale(xScale)
                    .ticks(0).tickSizeOuter(0);

    return {xAxis};
  }

  createSVG() {
    const svg = d3.select("#cash-graph").append('svg')
      .classed('project-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("width", this.w)
      .attr("height", this.h);
      svg.append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "black");
    return svg;
  }

  render() {
    return (
      <div id="cash-graph">
      </div>
    );
  }
}

export default CashFlowGraph;
