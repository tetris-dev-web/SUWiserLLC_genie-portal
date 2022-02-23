import React, { useEffect } from "react";
import * as d3 from "d3";

const CashFlowGraph = (props) => {
  const { valuation, cashflow, accumulatedRevenue } = props;
  const w = 300;
  const h = 200;

  useEffect(() => {
    setup();
  }, []);

  const setup = () => {
    const cashData = formatCashData();
    const { xAxis, yAxis, expectedAndActualLine, expectedAccumulatedLine, actualAccumulatedLine } =
      createAxesAndLines(cashData);
    const graph = startGraph();
    // Add axes
    addAxis(graph, "0,", h / 2, "", xAxis);
    addAxis(graph, "", 10, ",0", yAxis);
    // Add display text
    const text = addText(graph);
    // Add data
    const {
      expectedNetPoints,
      actualNetPoints,
      expectedAccumulatedPoints,
      actualAccumulatedPoints,
    } = cashData;
    addData(graph, "expected-line", expectedNetPoints, expectedAndActualLine);
    addData(graph, "actual-line", actualNetPoints, expectedAndActualLine);
    addData(graph, "accumulated-line", expectedAccumulatedPoints, expectedAccumulatedLine);
    addData(graph, "accumulated-line actual", actualAccumulatedPoints, actualAccumulatedLine);
    // Reveal hidden text
    d3.select("#cash-graph")
      .on("mouseover", function () {
        return text.style("visibility", "visible");
      })
      .on("mouseout", function () {
        return text.style("visibility", "hidden");
      });
  };

  const addAxis = (graph, start, dimension, end, axis) => {
    graph
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${start}` + dimension + `${end})`)
      .call(axis);
  };

  const addText = (graph) => {
    return graph
      .append("text")
      .attr("x", 17)
      .attr("y", 18)
      .style("font-size", "15px")
      .style("color", "white")
      .style("fill", "white")
      .style("visibility", "hidden")
      .text("Valuation: $" + `${valuation}`);
  };

  const addData = (graph, cssClass, points, line) => {
    graph.append("g").attr("class", cssClass).append("path").datum(points).attr("d", line);
  };

  const createAxesAndLines = ({
    expectedAccumulatedPoints,
    actualAccumulatedPoints,
    numQuarters,
    minExpectedValue,
    maxExpectedValue,
    minAccumulatedValue,
    maxAccumulatedValue,
    minAccumulatedActualValue,
    maxAccumulatedActualValue,
  }) => {
    // Define scales
    const xAxisScale = defineScale(0, numQuarters, 20, w - 20);
    const yAxisScale = defineScale(minExpectedValue, maxExpectedValue, h - 32, 15);
    const yLinesScale = defineScale(minExpectedValue, maxExpectedValue, h / 2 + 22, h / 2 - 22);

    const least = d3.min([minAccumulatedValue, minAccumulatedActualValue]);
    const most = d3.max([maxAccumulatedValue, maxAccumulatedActualValue]);
    const accumulatedYScale = defineScale(least, most, h - 33, 33).clamp(true);
    // Define axes
    const xAxis = d3.axisBottom().scale(xAxisScale).ticks(0).tickSizeOuter(0);
    const yAxis = d3.axisRight().scale(yAxisScale).ticks(0).tickSizeOuter(0);
    // Create lines
    const expectedAndActualLine = createLine(xAxisScale, yLinesScale);
    const expectedAccumulatedLine = createLine(xAxisScale, accumulatedYScale);
    const actualAccumulatedLine = createLine(xAxisScale, accumulatedYScale);
    // I don't know why values are being added to these arrays, much less why here.
    const averageAccumulatedValue = (least + most) / 2;
    roundOffGraphEnds(averageAccumulatedValue, expectedAccumulatedPoints);
    roundOffGraphEnds(averageAccumulatedValue, actualAccumulatedPoints);
    return {
      xAxis,
      yAxis,
      expectedAndActualLine,
      expectedAccumulatedLine,
      actualAccumulatedLine,
    };
  };

  const roundOffGraphEnds = (averageAccumulatedValue, accumulatedPoints) => {
    // prevents a "trailing garbage error from arising in the graph"
    const totalAccumulatedPoints = Object.values(accumulatedPoints).length;
    accumulatedPoints.unshift({ x: 0, y: averageAccumulatedValue });
    accumulatedPoints.push({ x: totalAccumulatedPoints, y: averageAccumulatedValue });
  };

  const defineScale = (startX, endX, startY, endY) => {
    return d3.scaleLinear().domain([startX, endX]).range([startY, endY]);
  };

  const createLine = (xScale, yScale) => {
    return d3
      .line()
      .x((d) => {
        return xScale(d.x);
      })
      .y((d) => {
        return yScale(d.y);
      });
  };

  const formatCashData = () => {
    // Process data for D3
    console.log("Graph Cashflow is: ", cashflow);
    const quarters = Object.keys(cashflow)
      .map(Number)
      .sort((a, b) => a - b);
    const currentQuarter = findCurrentQuarter(quarters);
    const valuesForQuarters = Object.values(cashflow);
    const valuesForActualQuarters = valuesForQuarters.slice(0, currentQuarter + 1);
    const valuesForExpectedAccumulated = Object.values(accumulatedRevenue);
    const valuesForActualAccumulated = valuesForExpectedAccumulated.slice(0, currentQuarter + 1);
    // Define D3 ranges
    const [minExpectedValue, maxExpectedValue] = calculateMinAndMax(valuesForQuarters);
    const [minAccumulatedValue, maxAccumulatedValue] = calculateMinAndMax(
      valuesForExpectedAccumulated,
    );
    const [minAccumulatedActualValue, maxAccumulatedActualValue] = calculateMinAndMax(
      valuesForActualAccumulated,
    );
    // Define D3 Coordinates
    const expectedNetPoints = generatePoints(valuesForQuarters);
    const actualNetPoints = generatePoints(valuesForActualQuarters);
    const expectedAccumulatedPoints = generatePoints(valuesForExpectedAccumulated);
    const actualAccumulatedPoints = generatePoints(valuesForActualAccumulated);
    return {
      numQuarters: quarters.length,
      minExpectedValue,
      maxExpectedValue,
      minAccumulatedValue,
      maxAccumulatedValue,
      minAccumulatedActualValue,
      maxAccumulatedActualValue,
      expectedNetPoints,
      actualNetPoints,
      expectedAccumulatedPoints,
      actualAccumulatedPoints,
    };
  };

  const findCurrentQuarter = (quarters) => {
    const { cashflow } = props;
    let currentQuarter;
    quarters.some((quarter) => {
      if (!cashflow[quarter.toString()]["isActuals"]) {
        currentQuarter = quarter;
        return !cashflow[quarter.toString()]["isActuals"];
      }
    });
    return currentQuarter;
  };

  const calculateMinAndMax = (values) => {
    return [d3.min(values), d3.max(values)];
  };

  const generatePoints = (points) => {
    return points.map((val, idx) => {
      return { x: idx, y: val };
    });
  };

  const startGraph = () => {
    const graphBase = d3
      .select("#cash-graph")
      .append("svg")
      .classed("project-svg", true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("width", w)
      .attr("height", h);
    graphBase.append("rect").attr("width", "95%").attr("height", "100%").attr("fill", "black");
    return graphBase;
  };

  return (
    <div id="cash-graph">
      <div className="title-wrapper">
        <h3 className="text-hidden">cashflow</h3>
      </div>
    </div>
  );
};

export default CashFlowGraph;
