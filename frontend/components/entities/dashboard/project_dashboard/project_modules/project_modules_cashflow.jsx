import React from 'react';
import * as d3 from 'd3';

class CashFlowGraph extends React.Component {
  constructor(props) {
    super(props);
    this.w = this.props.width;
    this.h = this.props.height;

    this.startGraph = this.startGraph.bind(this);
    this.createAxes = this.createAxes.bind(this);
    this.defineScales = this.defineScales.bind(this);
    this.formatCashData = this.formatCashData.bind(this);
    // this.roundOffGraphEnds = this.roundOffGraphEnds.bind(this);
    // this.addAxis = this.addAxis.bind(this);
    this.addData = this.addData.bind(this);
    this.addText = this.addText.bind(this);
  }

  componentDidMount(){

    const {currentQuarter, actualPoints, actualAccumulatedPoints,  projectedPoints, projectedAccumulatedPoints} = this.formatCashData()

    const {xAxisScale, yAxisScale, yLinesScale,  maxValue, minValue, minExpectedValueAccuProj} = this.defineScales();

    const graph = this.startGraph();
    this.createAxes(graph, xAxisScale, yAxisScale);
    const text = this.addText(graph);

    this.addData(graph, 'actual-line', actualPoints, xAxisScale, yLinesScale); //turn these into subcomponents  after getting it working
    this.addData(graph, 'accumulated-line actual', actualAccumulatedPoints, xAxisScale, yLinesScale);
    this.addData(graph, 'expected-line', projectedPoints, xAxisScale, yLinesScale);
    this.addData(graph, 'accumulated-line expected', projectedAccumulatedPoints, xAxisScale, yLinesScale);

    // Reveal hidden text
    d3.select('#cash-graph')
      .on("mouseover", function(){ return text.style("visibility", "visible"); })
      .on("mouseout", function(){ return text.style("visibility", "hidden"); });
    }
  //

  addData(graph, cssClass, points, xAxisScale, yAxisScale) {
    const lineConstructor = d3.line()
              .x( function (d,i){
                  console.log("i : ", i)
                  return xAxisScale(i);
              })
              .y( function(d) {
                console.log("d.y: ", d.y)
                console.log("yScale: ", yAxisScale(d.y))
                return yAxisScale(d.y)
              })
              .defined(function(d){
                return d.y !== 0;
              })

    let line = lineConstructor(points)


    graph.append("g")
      .attr('class', cssClass)
      .append('path')
      .attr('d', line)

      // .filter(function(d){
      //         d.y !== 0 ? console.log("data: ", d.y) : null
      //         return d.y != 0
      //       })

    //

  }

  // addData(graph, cssClass, points, xAxisScale, yAxisScale) {
  //   const lineConstructor = (xScale, yScale) => {
  //     return d3.line().x(d=>{
  //       console.log("d.x: ", d.x)
  //       return xScale(d.x)
  //       }).y(d=>{
  //         console.log("d.y: ", d.y)
  //         console.log("yScale: ", yScale(d.y))
  //         return d.y > 0 ? yScale(d.y)
  //         : null })
  //     }
  //
  //   graph.append("g")
  //     .attr('class', cssClass)
  //     .append("path")
  //     .datum(points)
  //     .style("display", function(d) { (test if value is zero) ? "none" : "inline"; }
  //     .attr('d', lineConstructor(xAxisScale, yAxisScale));
  // }


  addText(graph) { //potentially make this a subcomponent
    return graph.append("text")
      .attr("x", 17)
      .attr("y", 18)
      .style("font-size", "15px")
      .style("color", "white")
      .style("fill", "white")
      .style("visibility", "hidden")
      .text('Valuation: $' + `${this.props.valuation}`);
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

  defineScales() { //make this a method
      const getGraphParameters = () => {
        const numQuarters = Object.keys(this.props.accum_projected_cashflow).length
        const minExpectedValueAccuAct = d3.min(Object.values(this.props.accum_actual_cashflow))
        const minExpectedValueAccuProj = d3.min(Object.values(this.props.accum_projected_cashflow))
        const maxExpectedValueAccuAct = d3.max(Object.values(this.props.accum_actual_cashflow))
        const maxExpectedValueAccuProj = d3.max(Object.values(this.props.accum_projected_cashflow))
        // console.log("inputs: ", minExpectedValueAccuAct, minExpectedValueAccuProj, maxExpectedValueAccuAct, maxExpectedValueAccuProj)
        let minValue, maxValue
        minExpectedValueAccuAct < minExpectedValueAccuProj ? minValue = minExpectedValueAccuAct
          : minValue = minExpectedValueAccuProj
        maxExpectedValueAccuAct > maxExpectedValueAccuProj ? maxValue = minExpectedValueAccuProj
          : maxValue = maxExpectedValueAccuProj

        return {numQuarters, minExpectedValueAccuProj, maxValue, minValue}
      }

      const {numQuarters, minExpectedValueAccuProj, maxValue, minValue} = getGraphParameters()

      const defineScale = (inputsMin, inputsMax, outputsMin, outputsMax) => {
        console.log("inputs: ", inputsMin, inputsMax, outputsMin, outputsMax)
        return d3.scaleLinear().domain([inputsMin, inputsMax]).range([outputsMin, outputsMax]);
      }

      const xAxisScale = defineScale(0, numQuarters, 3, this.w-20);
      const yAxisScale = defineScale(minValue, maxValue, this.h, 15); //add clamp?
      const yLinesScale = defineScale(minValue, maxValue, this.h/2 + 22, 0); // why is this different?


      return {xAxisScale, yAxisScale, yLinesScale,  maxValue, minValue, minExpectedValueAccuProj}
  }


  createAxes(graph,xAxisScale,yAxisScale){

    const xAxis = d3.axisBottom().scale(xAxisScale).ticks(0).tickSizeOuter(0);
    const yAxis = d3.axisRight().scale(yAxisScale).ticks(0).tickSizeOuter(0);

    const addAxis = (graph, start, dimension, end, axis) => {
      graph.append("g")
        .attr('class', 'axis')
        .attr("transform", `translate(${start}` + dimension + `${end})`)
        .call(axis);
    }

    addAxis(graph, '0,', (this.h/2), '', xAxis);
    addAxis(graph, '', 10, ',0', yAxis);
  }


  // lineConstructors(xAxisScale, yAxisScale, yLinesScale) {
  //
  //
  //   // const expectedAndActualLine = lineConstructor(xAxisScale, yLinesScale);
  //   // const expectedAccumulatedLine = lineConstructor(xAxisScale, yAxisScale); // remove the redundancy
  //   // const actualAccumulatedLine = lineConstructor(xAxisScale, yAxisScale);
  //
  //   return [
  //     expectedAndActualLine,
  //     expectedAccumulatedLine,
  //     actualAccumulatedLine
  //   ];
  // }

    // [expectedAndActualLine, expectedAccumulatedLine, actualAccumulatedLine] = createLines()

    //
    // const averageAccumulatedValue = (least + most) / 2;
    // this.roundOffGraphEnds(averageAccumulatedValue, expectedAccumulatedPoints);
    // this.roundOffGraphEnds(averageAccumulatedValue, actualAccumulatedPoints);

  // roundOffGraphEnds(averageAccumulatedValue, accumulatedPoints) {
  //   // prevents a "trailing garbage error from arising in the graph"
  //   const totalAccumulatedPoints = Object.values(accumulatedPoints).length;
  //   accumulatedPoints.unshift({ x: 0, y: averageAccumulatedValue });
  //   accumulatedPoints.push({ x: totalAccumulatedPoints, y: averageAccumulatedValue });
  // }

  formatCashData() {
    const generatePoints = (points) => {
      return points.map((val,qtr) =>{ return {x:qtr,y:val}; });
    }


    const findCurrentQuarterFromActuals = (actualCashflow) => {
      let lastQuarterCashflow
      let currentQuarter

      Object.keys(actualCashflow).forEach((key) => {
        let quarterCashflow = actualCashflow[key]
        if ((quarterCashflow - lastQuarterCashflow) === lastQuarterCashflow ) {
          currentQuarter = key-1;
        }
        lastQuarterCashflow = quarterCashflow
      })
      return currentQuarter;
    }


    const calculateMinAndMax = (values) => {
      return [d3.min(values), d3.max(values)];
    }

    // Retrieve cashflow data from props
    const {actual_cashflow, accum_actual_cashflow, projected_cashflow, accum_projected_cashflow} = this.props;


    const currentQuarter = findCurrentQuarterFromActuals(actual_cashflow);

    // Define D3 Coordinates
    const projectedPoints = generatePoints(Object.values(projected_cashflow));
    const actualPoints = generatePoints(Object.values(actual_cashflow));
    const projectedAccumulatedPoints = generatePoints(Object.values(accum_projected_cashflow));
    const actualAccumulatedPoints = generatePoints(Object.values(accum_actual_cashflow));

    return {currentQuarter, actualPoints, actualAccumulatedPoints,  projectedPoints, projectedAccumulatedPoints}

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
