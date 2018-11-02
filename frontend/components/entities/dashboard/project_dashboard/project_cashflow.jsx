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
    const {xAxis,yAxis,expectedAndActualLine,expectedAccumulatedLine,actualAccumulatedLine} = this.createAxesAndLines(cashData);

    svg.append("g")
        .attr('class','axis')
        .attr("transform", "translate(0," + (this.h/2) + ")")
        .call(xAxis);
    svg.append("g")
        .attr('class','axis')
        .attr("transform", "translate(" + 10 + ",0)")
        .call(yAxis);

    const text = svg.append("text")
        .attr("x", 17)
        .attr("y", 18)
        .style("font-size", "15px")
        .style("color", "white")
        .style("fill", "white")
        .style("visibility", "hidden")
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
        .datum(cashData.expectedAccumulatedPoints)
        .attr('d',expectedAccumulatedLine);

    svg.append("g")
        .attr('class','accumulated-line actual')
        .append("path")
        .datum(cashData.actualAccumulatedPoints)
        .attr('d',actualAccumulatedLine);
    d3.select('#cash-graph')
    .on("mouseover", function(d){
        return text.style("visibility", "visible");
      })
    .on("mouseout", function(d){
      return text.style("visibility", "hidden");
    });

  }


  createAxesAndLines( {expectedAccumulatedPoints,actualAccumulatedPoints,numQuarters,minExpectedValue,
                      maxExpectedValue,expectedNetPoints,minAccumulated,
                      maxAccumulated,minAccumulatedActualValue,maxAccumulatedActualValue} ) {


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
    const least = d3.min([minAccumulated,minAccumulatedActualValue]);
    const most = d3.max([maxAccumulated,maxAccumulatedActualValue]);

    expectedAccumulatedPoints.unshift({x:0,y:(most+least)/2});
    expectedAccumulatedPoints.push({x:Object.values(expectedAccumulatedPoints).length,y:(most+least)/2});

    actualAccumulatedPoints.unshift({x:0,y:(most+least)/2});
    actualAccumulatedPoints.push({x:Object.values(actualAccumulatedPoints).length,y:(most+least)/2});

    const accumulatedYScale = d3.scaleLinear()
                     .domain([least,most])
                     .range([ this.h-33,33 ]).clamp(true);

    const expectedAndActualLine = d3.line()
      .x( d=>{return xAxisScale(d.x);})
      .y( d=>{return yLinesScale(d.y);});

    const expectedAccumulatedLine = d3.line()
      .x( d=>{return xAxisScale(d.x);})
      .y( d=>{return accumulatedYScale(d.y);});

    const actualAccumulatedLine = d3.line()
      .x( d=>{return xAxisScale(d.x);})
      .y( d=>{return accumulatedYScale(d.y);});
    return {xAxis,yAxis,expectedAndActualLine,expectedAccumulatedLine,actualAccumulatedLine};
  }

  formatCashData() {
    debugger
    let jsonCashData;
    if(this.props.project.cashflow.tempfile){
      jsonCashData = JSON.parse(this.props.project.cashflow.tempfile.join(""));
    }else{
      jsonCashData = JSON.parse(this.props.project.cashflow);
    }

    const expectedNet = jsonCashData.ExpectedNet;
    const actualNet = jsonCashData.Actual;
    const expectedAccumulatedData = jsonCashData.ExpectedAccumulatedGainorLoss;
    const actualAccumulatedData = jsonCashData.ActualAccumulatedGainorLoss;

    const quarters = Object.keys(expectedNet);
    const valuesForQuarters = Object.values(expectedNet);

    const minExpectedValue = d3.min(valuesForQuarters);
    const maxExpectedValue = d3.max(valuesForQuarters);
    const minAccumulatedValue = d3.min(Object.values(expectedAccumulatedData));
    const maxAccumulatedValue = d3.max(Object.values(expectedAccumulatedData));
    const minAccumulatedActualValue = d3.min(Object.values(actualAccumulatedData));
    const maxAccumulatedActualValue = d3.max(Object.values(actualAccumulatedData));

    const expectedNetPoints = Object.values(expectedNet).map( (val,idx) =>{
      return {x:idx,y:val};
    });
    const actualNetPoints = Object.values(actualNet).map( (val,idx) =>{
      return {x:idx,y:val};
    });
    const expectedAccumulatedPoints = Object.values(expectedAccumulatedData).map( (val,idx) =>{
      return {x:idx,y:val};
    });
    const actualAccumulatedPoints = Object.values(actualAccumulatedData).map( (val,idx) =>{
      return {x:idx,y:val};
    });
    // those fake points are just so the graph has a nice start and end points
    // that fall on the x axis
    // expectedAccumulatedPoints.unshift({x:0,y:(maxAccumulatedValue+minAccumulatedValue)/2});
    // expectedAccumulatedPoints.push({x:Object.values(expectedAccumulatedData).length,y:(maxAccumulatedValue+minAccumulatedValue)/2});
    //
    // actualAccumulatedPoints.unshift({x:0,y:(maxAccumulatedActualValue+minAccumulatedActualValue)/2});
    // actualAccumulatedPoints.push({x:Object.values(actualAccumulatedData).length,y:(maxAccumulatedActualValue+minAccumulatedActualValue)/2});

    const minAccumulated = d3.min(expectedAccumulatedPoints,(d)=>{return d.y;});
    const maxAccumulated = d3.max(expectedAccumulatedPoints,(d)=>{return d.y;});

    return {
      numQuarters: quarters.length,

      minExpectedValue: minExpectedValue,
      maxExpectedValue: maxExpectedValue,
      minAccumulated: minAccumulated,
      maxAccumulated: maxAccumulated,
      minAccumulatedActualValue: minAccumulatedActualValue,
      maxAccumulatedActualValue: maxAccumulatedActualValue,

      expectedNetPoints: expectedNetPoints,
      actualNetPoints: actualNetPoints,
      expectedAccumulatedPoints:expectedAccumulatedPoints,
      actualAccumulatedPoints:actualAccumulatedPoints
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
        <div className="title-wrapper">
          <h3 className="text-hidden">cashflow</h3>
        </div>
      </div>
    );
  }
}

export default CashFlowGraph;
