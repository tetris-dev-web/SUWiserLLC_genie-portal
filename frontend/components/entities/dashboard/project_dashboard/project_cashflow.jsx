import React from 'react';
import * as d3 from 'd3';


class CashFlowGraph extends React.Component {
  constructor(props) {
    super(props);
    this.w = 300;
    this.h = 200;
    this.createSVG = this.createSVG.bind(this);
    this.createAxesAndLine = this.createAxesAndLine.bind(this);
    this.formatCashData = this.formatCashData.bind(this);
    this.setup = this.setup.bind(this);
  }

  componentDidMount(){
    this.setup();
  }

  setup(){
    const svg = this.createSVG();
    const cashData = this.formatCashData();
    const {xAxis,yAxis,valueLine} = this.createAxesAndLine(cashData);
    svg.append("g")
        .attr('class','axis')
        .attr("transform", "translate(0," + (this.h - 20) + ")")
        .call(xAxis);
    svg.append("g")
        .attr('class','axis')
        .attr("transform", "translate(" + 10 + ",0)")
        .call(yAxis);

    svg.append("g")
        .attr('class','value-line')
        .append("path")
        .datum(cashData.valuePoints)
        .attr('d',valueLine);

  }


  createAxesAndLine( {numQuarters,minValue,maxValue} ) {
    const xScale = d3.scaleLinear()
                     .domain([0,numQuarters])
                     .range([20, this.w-20]);

    const xAxis = d3.axisBottom()
                    .scale(xScale)
                    .ticks(0).tickSizeOuter(0);

    const yScale = d3.scaleLinear()
                     .domain([minValue,maxValue])
                     .range([this.h-32,15]);

    const yAxis = d3.axisRight()
                    .scale(yScale)
                    .ticks(0).tickSizeOuter(0);

    const valueLine = d3.line()
      .x( d=>{return xScale(d.x);})
      .y( d=>{return yScale(d.y);});

    return {xAxis,yAxis,valueLine};
  }

  formatCashData() {
    debugger
    const jsonCashData = JSON.parse(this.props.project.cashflow);
    const expectedNet = jsonCashData.ExpectedNet;
    const quarters = Object.keys(expectedNet);
    const valuesForQuarters = Object.values(expectedNet);
    const minValue = d3.min(valuesForQuarters);
    const maxValue = d3.max(valuesForQuarters);
    const valuePoints = Object.values(expectedNet).map( (val,idx) =>{
      return {x:idx,y:val};
    });

    return {
      numQuarters: quarters.length,
      minValue: minValue,
      maxValue: maxValue,
      valuePoints: valuePoints,
    };
  }
  createSVG() {
    const svg = d3.select("#cash-graph").append('svg')
      .classed('project-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("width", this.w)
      .attr("height", this.h);
      svg.append("rect")
      .attr("width", "95%")
      .attr("height", "100%")
      .attr("fill", "black");
    return svg;
  }

  render() {
    return (
      <div id="cash-graph">
        <h3>cashflow</h3>
      </div>
    );
  }
}

export default CashFlowGraph;
