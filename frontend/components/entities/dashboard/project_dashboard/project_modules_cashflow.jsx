import React from 'react';
import * as d3 from 'd3';

class CashFlowGraph extends React.Component {
  constructor(props) {
    super(props);
    this.w = this.props.width;
    this.h = this.props.height;

    this.setup = this.setup.bind(this);
    this.startGraph = this.startGraph.bind(this);
    // this.formatCashData = this.formatCashData.bind(this);
    this.createAxesAndLines = this.createAxesAndLines.bind(this);
    // formatCashData helper Methods
    // this.findCurrentQuarter = this.findCurrentQuarter.bind(this);
    // this.calculateMinAndMax = this.calculateMinAndMax.bind(this);
    // this.generatePoints = this.generatePoints.bind(this);
    // createAxesAndLines helper methods
    this.defineScales = this.defineScales.bind(this);
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
    // const {actual_cashflow, accum_actual_cashflow, projected_cashflow, accum_projected_cashflow} = this.props;
    // console.log("ActCashflow: ",this.props.actual_cashflow)
    //
    // const cashflowVariables = [
    //   actual_cashflow,
    //   accum_actual_cashflow,
    //   projected_cashflow,
    //   accum_projected_cashflow
    // ]
    //
    // console.log("variables: ",cashflowVariables)

    const [xAxisScale, yAxisScale, yLinesScale] = this.defineScales()

    const {xAxis,
            yAxis,
            expectedAndActualLine,
            expectedAccumulatedLine,
            actualAccumulatedLine } = this.createAxesAndLines(xAxisScale,
                                                              yAxisScale,
                                                              yLinesScale);
    //
    // const graph = this.startGraph();
    // // Add axes
    // this.addAxis(graph, '0,', (this.h/2), '', xAxis);
    // this.addAxis(graph, '', 10, ',0', yAxis);
    // // Add display text
    // const text = this.addText(graph);
    // // Add data
    // const { expectedNetPoints, actualNetPoints,
    //   expectedAccumulatedPoints, actualAccumulatedPoints } = cashData;
    // this.addData(graph, 'expected-line', expectedNetPoints, expectedAndActualLine);
    // this.addData(graph, 'actual-line', actualNetPoints, expectedAndActualLine);
    // this.addData(graph, 'accumulated-line', expectedAccumulatedPoints, expectedAccumulatedLine);
    // this.addData(graph, 'accumulated-line actual', actualAccumulatedPoints, actualAccumulatedLine);
    // // Reveal hidden text
    // d3.select('#cash-graph')
    //   .on("mouseover", function(){ return text.style("visibility", "visible"); })
    //   .on("mouseout", function(){ return text.style("visibility", "hidden"); });
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


  defineScales() { //make this a method

      const getGraphParameters = () => {
        const numQuarters = d3.max(Object.keys(this.props.actual_cashflow))
        const minExpectedValueAct = d3.min(Object.values(this.props.actual_cashflow))
        const minExpectedValueProj = d3.min(Object.values(this.props.projected_cashflow))
        const maxExpectedValueAct = d3.min(Object.values(this.props.actual_cashflow))
        const maxExpectedValueProj = d3.min(Object.values(this.props.projected_cashflow))

        let minExpectedValue, maxExpectedValue
        minExpectedValueAct < minExpectedValueProj? minExpectedValue = minExpectedValueAct
          : minExpectedValue = minExpectedValueProj
        maxExpectedValueAct > maxExpectedValueProj? maxExpectedValue = maxExpectedValueAct
          : minExpectedValue = maxExpectedValueProj

        return [numQuarters, minExpectedValue, maxExpectedValue]
      }

      const [numQuarters, minExpectedValue, maxExpectedValue] = getGraphParameters()

      const defineScale = (inputsMin, inputsMax, outputsMin, outputsMax) => {
        return d3.scaleLinear().domain([inputsMin, inputsMax]).range([outputsMin, outputsMax]);
      }

      const xAxisScale = defineScale(0, numQuarters, 20, this.w-20);
      const yAxisScale = defineScale(minExpectedValue, maxExpectedValue, this.h-32, 15);
      const yLinesScale = defineScale(minExpectedValue, maxExpectedValue, this.h/2+22, this.h/2-22); // why is this different?

      return [xAxisScale, yAxisScale, yLinesScale]
    }





  createAxesAndLines(xAxisScale,
                        yAxisScale,
                        yLinesScale) {




    // const least = d3.min([minAccumulatedValue, minAccumulatedActualValue]);
    // const most = d3.max([maxAccumulatedValue, maxAccumulatedActualValue]);
    // const accumulatedYScale = this.defineScale(least, most, this.h-33, 33).clamp(true);


    //
    // // Define axes
    // const xAxis = d3.axisBottom().scale(xAxisScale).ticks(0).tickSizeOuter(0);
    // const yAxis = d3.axisRight().scale(yAxisScale).ticks(0).tickSizeOuter(0);
    // // Create lines
    // const expectedAndActualLine = this.createLine(xAxisScale, yLinesScale);
    // const expectedAccumulatedLine = this.createLine(xAxisScale, accumulatedYScale);
    // const actualAccumulatedLine = this.createLine(xAxisScale, accumulatedYScale);
    // // I don't know why values are being added to these arrays, much less why here.
    // const averageAccumulatedValue = (least + most) / 2;
    // this.roundOffGraphEnds(averageAccumulatedValue, expectedAccumulatedPoints);
    // this.roundOffGraphEnds(averageAccumulatedValue, actualAccumulatedPoints);

    const xAxis = null,
          yAxis = null,
          expectedAndActualLine = null,
          expectedAccumulatedLine = null,
          actualAccumulatedLine = null

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



  createLine(xScale, yScale) {
    return d3.line().x(d=>{ return xScale(d.x); }).y(d=>{ return yScale(d.y); });
  }

  // formatCashData() {
  //   // Retrieve cashflow data from props
  //   const {actual_cashflow, accum_actual_cashflow, projected_cashflow, accum_projected_cashflow} = this.props;
  //   // Process data for D3
  //   const quarters = Object.keys(actual_cashflow).sort();
  //   // const currentQuarter = this.findCurrentQuarter(quarters);
  //   // const valuesForQuarters = Object.values(cashflow);
  //   // const valuesForActualQuarters = valuesForQuarters.slice(0, currentQuarter + 1);
  //   // const valuesForExpectedAccumulated = Object.values(accumulatedRevenue);
  //   // const valuesForActualAccumulated = valuesForExpectedAccumulated.slice(0, currentQuarter + 1);
  //   // Define D3 ranges //should be done in context
  //   // const [minActValue,
  //   //   maxActValue] = this.calculateMinAndMax(actual_cashflow);
  //   // const [minAccumulatedActValue,
  //   //   maxAccumulatedActValue] = this.calculateMinAndMax(accum_actual_cashflow);
  //   // const [minAccumuProjValue,
  //   //   maxAccumuProjValue] = this.calculateMinAndMax(valuesForActualAccumulated);
  //     // Define D3 Coordinates
  //
  //   // const expectedNetPoints = this.generatePoints(valuesForQuarters);
  //   // const actualNetPoints = this.generatePoints(valuesForActualQuarters);
  //   // const expectedAccumulatedPoints = this.generatePoints(valuesForExpectedAccumulated);
  //   // const actualAccumulatedPoints = this.generatePoints(valuesForActualAccumulated);
  //   return {
  //     numQuarters: quarters.length,
  //     minExpectedValue, maxExpectedValue,
  //     minAccumulatedValue, maxAccumulatedValue,
  //     minAccumulatedActualValue, maxAccumulatedActualValue,
  //     expectedNetPoints, actualNetPoints,
  //     expectedAccumulatedPoints, actualAccumulatedPoints
  //   };
  // }

  // findCurrentQuarter(quarters) {
  //   let currentQuarter = 29;
  //   quarters.forEach((quarter, idx) => {
  //     if (quarter[2] === "A") {
  //       currentQuarter = idx + 1;
  //     }
  //   });
  //   return currentQuarter;
  // }

  // calculateMinAndMax(values) {
  //   return [d3.min(values), d3.max(values)];
  // }

  // generatePoints(points) {
  //   return points.map((val,qtr) =>{ return {x:qtr,y:val}; });
  // }

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
