import React from 'react';
import * as d3 from 'd3';


class CashFlowGraph extends React.Component {
  constructor(props) {
    super(props);
    this.w = 300;
    this.h = 200;
    this.createSVG = this.createSVG.bind(this);
    this.createAxesAndLines = this.createAxesAndLines.bind(this);
    this.formatCashData = this.formatCashData.bind(this);
    this.setup = this.setup.bind(this);
  }

  componentDidMount(){
    this.setup();
  }

  setup(){
    const svg = this.createSVG();
    const cashData = this.formatCashData();
    const {xAxis,yAxis,expectedAndActualLine,accumulatedLine} = this.createAxesAndLines(cashData);

    svg.append("g")
        .attr('class','axis')
        .attr("transform", "translate(0," + (this.h/2) + ")")
        .call(xAxis);
    svg.append("g")
        .attr('class','axis')
        .attr("transform", "translate(" + 10 + ",0)")
        .call(yAxis);
    svg.append("text")
        .attr("x", 17)
        .attr("y", 18)
        .style("font-size", "15px")
        .style("color", "white")
        .style("fill", "white")
        .text('Valuation: $' + `${this.props.project.valuation}`);

    svg.append("g")
        .attr('class','expected-line')
        .append("path")
        .datum(cashData.expectedNetPoints)
        .attr('d',expectedAndActualLine);

    svg.append("g")
        .attr('class','actual-line')
        .append("path")
        .datum(cashData.actualNetPoints)
        .attr('d',expectedAndActualLine);

    svg.append("g")
        .attr('class','accumulated-line')
        .append("path")
        .datum(cashData.accumulatedPoints)
        .attr('d',accumulatedLine);

  }


  createAxesAndLines( {accumulatedPoints,numQuarters,minExpectedValue,
                      maxExpectedValue,expectedNetPoints,minAccumulated,
                      maxAccumulated} ) {
    const xAxisScale = d3.scaleLinear()
                     .domain([0,numQuarters])
                     .range([20, this.w-20]);

    const xAxis = d3.axisBottom()
                    .scale(xAxisScale)
                    .ticks(0).tickSizeOuter(0);

    const yAxisScale = d3.scaleLinear()
                     .domain([minExpectedValue,maxExpectedValue])
                     .range([this.h-32,15]);

    const yAxis = d3.axisRight()
                    .scale(yAxisScale)
                    .ticks(0).tickSizeOuter(0);

    const yLinesScale = d3.scaleLinear()
                     .domain([minExpectedValue,maxExpectedValue])
                     .range([ this.h/2+22,this.h/2-22 ]);

    const yAccumulatedScale = d3.scaleLinear()
                     .domain([minAccumulated,maxAccumulated])
                     .range([ this.h-22,22 ]).clamp(true);
              debugger
    const expectedAndActualLine = d3.line()
      .x( d=>{return xAxisScale(d.x);})
      .y( d=>{return yLinesScale(d.y);});

    const accumulatedLine = d3.line()
      .x( d=>{return xAxisScale(d.x);})
      .y( d=>{return yAccumulatedScale(d.y);});

    return {xAxis,yAxis,expectedAndActualLine,accumulatedLine};
  }

  formatCashData() {
    const jsonCashData = JSON.parse(this.props.project.cashflow);

    const expectedNet = jsonCashData.ExpectedNet;
    const actualNet = jsonCashData.Actual;
    const accumulatedData = jsonCashData.AccumulatedGainorLoss;

    const quarters = Object.keys(expectedNet);
    const valuesForQuarters = Object.values(expectedNet);
    const minExpectedValue = d3.min(valuesForQuarters);
    const maxExpectedValue = d3.max(valuesForQuarters);
    const minAccumulatedValue = d3.min(Object.values(accumulatedData));
    const maxAccumulatedValue = d3.max(Object.values(accumulatedData));

    const expectedNetPoints = Object.values(expectedNet).map( (val,idx) =>{
      return {x:idx,y:val};
    });
    const actualNetPoints = Object.values(actualNet).map( (val,idx) =>{
      return {x:idx,y:val};
    });
    const accumulatedPoints = Object.values(accumulatedData).map( (val,idx) =>{
      return {x:idx,y:val};
    });
    accumulatedPoints.unshift({x:0,y:(maxAccumulatedValue+minAccumulatedValue)/2});
    accumulatedPoints.push({x:Object.values(accumulatedData).length,y:(maxAccumulatedValue+minAccumulatedValue)/2});

    const minAccumulated = d3.min(accumulatedPoints,(d)=>{return d.y;});
    const maxAccumulated = d3.max(accumulatedPoints,(d)=>{return d.y;});

    return {
      numQuarters: quarters.length,
      minExpectedValue: minExpectedValue,
      maxExpectedValue: maxExpectedValue,
      minAccumulated: minAccumulated,
      maxAccumulated: maxAccumulated,
      expectedNetPoints: expectedNetPoints,
      actualNetPoints: actualNetPoints,
      accumulatedPoints:accumulatedPoints
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
