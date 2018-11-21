import React from 'react';
import * as d3 from 'd3';

class CashFlowGraph extends React.Component {
  constructor(props) {
    super(props);
    this.w = 300;
    this.h = 200;
    this.setup = this.setup.bind(this);
    this.startGraph = this.startGraph.bind(this);
    this.formatCashData = this.formatCashData.bind(this);
    this.createAxesAndLines = this.createAxesAndLines.bind(this);
    // formatCashData helper Methods
    this.findCurrentQuarter = this.findCurrentQuarter.bind(this);
    this.calculateMinAndMax = this.calculateMinAndMax.bind(this);
    this.generatePoints = this.generatePoints.bind(this);
    // createAxesAndLines helper methods
    this.defineScale = this.defineScale.bind(this);
    this.createLine = this.createLine.bind(this);
    this.roundOffGraphEnds = this.roundOffGraphEnds.bind(this);
    // Setup graph helper methods
    this.addAxis = this.addAxis.bind(this);
    this.addData = this.addData.bind(this);
    this.addText = this.addText.bind(this);
  }

  componentDidMount() {
    this.setup();
  }

  setup() {
    const cashData = this.formatCashData();
    const { xAxis, yAxis, expectedAndActualLine, expectedAccumulatedLine,
      actualAccumulatedLine } = this.createAxesAndLines(cashData);
    const graph = this.startGraph();
    // Add axes
    this.addAxis(graph, '0,', (this.h/2), '', xAxis);
    this.addAxis(graph, '', 10, ',0', yAxis);
    // Add display text
    const text = this.addText(graph);
    // Add data
    const { expectedNetPoints, actualNetPoints,
      expectedAccumulatedPoints, actualAccumulatedPoints } = cashData;
    this.addData(graph, 'expected-line', expectedNetPoints, expectedAndActualLine);
    this.addData(graph, 'actual-line', actualNetPoints, expectedAndActualLine);
    this.addData(graph, 'accumulated-line', expectedAccumulatedPoints, expectedAccumulatedLine);
    this.addData(graph, 'accumulated-line actual', actualAccumulatedPoints, actualAccumulatedLine);
    // Reveal hidden text
    d3.select('#cash-graph')
      .on("mouseover", function(){ return text.style("visibility", "visible"); })
      .on("mouseout", function(){ return text.style("visibility", "hidden"); });
  }

  addAxis(graph, start, dimension, end, axis) {
    graph.append("g")
      .attr('class', 'axis')
      .attr("transform", `translate(${start}` + dimension + `${end})`)
      .call(axis);
  }

  addText(graph) {
    return graph.append("text")
      .attr("x", 17)
      .attr("y", 18)
      .style("font-size", "15px")
      .style("color", "white")
      .style("fill", "white")
      .style("visibility", "hidden")
      .text('Valuation: $' + `${this.props.valuation}`);
  }

  addData(graph, cssClass, points, line) {
    graph.append("g")
      .attr('class', cssClass)
      .append("path")
      .datum(points)
      .attr('d', line);
  }

  createAxesAndLines({expectedAccumulatedPoints, actualAccumulatedPoints,
    numQuarters, minExpectedValue, maxExpectedValue, minAccumulatedValue,
    maxAccumulatedValue, minAccumulatedActualValue, maxAccumulatedActualValue}) {
    // Define scales
    const xAxisScale = this.defineScale(0, numQuarters, 20, this.w-20);
    const yAxisScale = this.defineScale(minExpectedValue, maxExpectedValue, this.h-32, 15);
    const yLinesScale = this.defineScale(minExpectedValue, maxExpectedValue, this.h/2+22, this.h/2-22);

    const least = d3.min([minAccumulatedValue, minAccumulatedActualValue]);
    const most = d3.max([maxAccumulatedValue, maxAccumulatedActualValue]);
    const accumulatedYScale = this.defineScale(least, most, this.h-33, 33).clamp(true);
    // Define axes
    const xAxis = d3.axisBottom().scale(xAxisScale).ticks(0).tickSizeOuter(0);
    const yAxis = d3.axisRight().scale(yAxisScale).ticks(0).tickSizeOuter(0);
    // Create lines
    const expectedAndActualLine = this.createLine(xAxisScale, yLinesScale);
    const expectedAccumulatedLine = this.createLine(xAxisScale, accumulatedYScale);
    const actualAccumulatedLine = this.createLine(xAxisScale, accumulatedYScale);
    // I don't know why values are being added to these arrays, much less why here.
    const averageAccumulatedValue = (least + most) / 2;
    this.roundOffGraphEnds(averageAccumulatedValue, expectedAccumulatedPoints);
    this.roundOffGraphEnds(averageAccumulatedValue, actualAccumulatedPoints);
    return {
      xAxis,
      yAxis,
      expectedAndActualLine,
      expectedAccumulatedLine,
      actualAccumulatedLine
    };
  }

  roundOffGraphEnds(averageAccumulatedValue, accumulatedPoints) {
    // prevents a "trailing garbage error from arising in the graph"
    const totalAccumulatedPoints = Object.values(accumulatedPoints).length;
    accumulatedPoints.unshift({ x: 0, y: averageAccumulatedValue });
    accumulatedPoints.push({ x: totalAccumulatedPoints, y: averageAccumulatedValue });
  }

  defineScale(startX, endX, startY, endY) {
    return d3.scaleLinear().domain([startX, endX]).range([startY, endY]);
  }

  createLine(xScale, yScale) {
    return d3.line().x(d=>{ return xScale(d.x); }).y(d=>{ return yScale(d.y); });
  }

  formatCashData() {
    // Retrieve cashflow data from props
    const { cashflow, accumulatedRevenue } = this.props.cashflow;
    // Process data for D3
    const quarters = Object.keys(cashflow).sort();
    const currentQuarter = this.findCurrentQuarter(quarters);
    const valuesForQuarters = Object.values(cashflow);
    const valuesForActualQuarters = valuesForQuarters.slice(0, currentQuarter + 1);
    const valuesForExpectedAccumulated = Object.values(accumulatedRevenue);
    const valuesForActualAccumulated = valuesForExpectedAccumulated.slice(0, currentQuarter + 1);
    // Define D3 ranges
    const [minExpectedValue,
      maxExpectedValue] = this.calculateMinAndMax(valuesForQuarters);
    const [minAccumulatedValue,
      maxAccumulatedValue] = this.calculateMinAndMax(valuesForExpectedAccumulated);
    const [minAccumulatedActualValue,
      maxAccumulatedActualValue] = this.calculateMinAndMax(valuesForActualAccumulated);
      // Define D3 Coordinates
    const expectedNetPoints = this.generatePoints(valuesForQuarters);
    const actualNetPoints = this.generatePoints(valuesForActualQuarters);
    const expectedAccumulatedPoints = this.generatePoints(valuesForExpectedAccumulated);
    const actualAccumulatedPoints = this.generatePoints(valuesForActualAccumulated);
    return {
      numQuarters: quarters.length,
      minExpectedValue, maxExpectedValue,
      minAccumulatedValue, maxAccumulatedValue,
      minAccumulatedActualValue, maxAccumulatedActualValue,
      expectedNetPoints, actualNetPoints,
      expectedAccumulatedPoints, actualAccumulatedPoints
    };
  }

  findCurrentQuarter(quarters) {
    let currentQuarter = 29;
    quarters.forEach((quarter, idx) => {
      if (quarter[2] === "A") {
        currentQuarter = idx + 1;
      }
    });
    return currentQuarter;
  }

  calculateMinAndMax(values) {
    return [d3.min(values), d3.max(values)];
  }

  generatePoints(points) {
    return points.map((val,idx) =>{ return {x:idx,y:val}; });
  }

  startGraph() {
    const graphBase = d3.select("#cash-graph").append('svg')
      .classed('project-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("width", this.w)
      .attr("height", this.h);
    graphBase.append("rect")
      .attr("width", "95%")
      .attr("height", "100%")
      .attr("fill", "black");
    return graphBase;
  }
  // too many divs
  render() {
    return (
      <div className="cashflow-graph">
        <div id="cash-graph">
          <div className="title-wrapper">
            <h3 className="text-hidden">cashflow</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default CashFlowGraph;
