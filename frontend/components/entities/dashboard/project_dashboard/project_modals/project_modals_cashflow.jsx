import React, { useEffect } from "react";
import * as d3 from "d3";

const CashFlowGraph = (props) => {
  const { width, height, valuation, accum_projected_cashflow, accum_actual_cashflow } = props;
  const w = width;
  const h = height;

  const populateData = () => {
    const {
      currentQuarter,
      actualPoints,
      actualAccumulatedPoints,
      projectedPoints,
      projectedAccumulatedPoints,
    } = formatCashData();

    const { xAxisScale, yAxisScale, yLinesScale, maxValue, minValue, minExpectedValueAccuProj } =
      defineScales();

    const graph = startGraph();
    createAxes(graph, xAxisScale, yAxisScale);
    const text = addText(graph);

    addData(graph, "actual-line", actualPoints, xAxisScale, yLinesScale); //turn these into subcomponents  after getting it working
    addData(graph, "accumulated-line actual", actualAccumulatedPoints, xAxisScale, yLinesScale);
    addData(graph, "expected-line", projectedPoints, xAxisScale, yLinesScale);
    addData(
      graph,
      "accumulated-line expected",
      projectedAccumulatedPoints,
      xAxisScale,
      yLinesScale,
    );

    // Reveal hidden text
    d3.select("#cash-graph")
      .on("mouseover", function () {
        return text.style("visibility", "visible");
      })
      .on("mouseout", function () {
        return text.style("visibility", "hidden");
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

  const addData = (graph, cssClass, points, xAxisScale, yAxisScale) => {
    const lineConstructor = d3
      .line()
      .x(function (d, i) {
        return xAxisScale(i);
      })
      .y(function (d) {
        return yAxisScale(d.y);
      })
      .defined(function (d) {
        return d.y !== 0;
      });

    let line = lineConstructor(points);

    graph.append("g").attr("class", cssClass).append("path").attr("d", line);
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

  const defineScales = () => {
    const getGraphParameters = () => {
      const numQuarters = Object.keys(accum_projected_cashflow).length;
      const minExpectedValueAccuAct = d3.min(Object.values(accum_actual_cashflow));
      const minExpectedValueAccuProj = d3.min(Object.values(accum_projected_cashflow));
      const maxExpectedValueAccuAct = d3.max(Object.values(accum_actual_cashflow));
      const maxExpectedValueAccuProj = d3.max(Object.values(accum_projected_cashflow));
      let minValue, maxValue;
      minExpectedValueAccuAct < minExpectedValueAccuProj
        ? (minValue = minExpectedValueAccuAct)
        : (minValue = minExpectedValueAccuProj);
      maxExpectedValueAccuAct > maxExpectedValueAccuProj
        ? (maxValue = minExpectedValueAccuProj)
        : (maxValue = maxExpectedValueAccuProj);

      return { numQuarters, minExpectedValueAccuProj, maxValue, minValue };
    };

    const { numQuarters, minExpectedValueAccuProj, maxValue, minValue } = getGraphParameters();

    const defineScale = (inputsMin, inputsMax, outputsMin, outputsMax) => {
      return d3.scaleLinear().domain([inputsMin, inputsMax]).range([outputsMin, outputsMax]);
    };

    const xAxisScale = defineScale(0, numQuarters, 3, w - 20);
    const yAxisScale = defineScale(minValue, maxValue, h, 15); //add clamp?
    const yLinesScale = defineScale(minValue, maxValue, h / 2 + 22, 0); // why is this different?

    return { xAxisScale, yAxisScale, yLinesScale, maxValue, minValue, minExpectedValueAccuProj };
  };

  const createAxes = (graph, xAxisScale, yAxisScale) => {
    const xAxis = d3.axisBottom().scale(xAxisScale).ticks(0).tickSizeOuter(0);
    const yAxis = d3.axisRight().scale(yAxisScale).ticks(0).tickSizeOuter(0);

    const addAxis = (graph, start, dimension, end, axis) => {
      graph
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${start}` + dimension + `${end})`)
        .call(axis);
    };

    addAxis(graph, "0,", h / 2, "", xAxis);
    addAxis(graph, "", 10, ",0", yAxis);
  };

  const formatCashData = () => {
    const generatePoints = (points) => {
      return points.map((val, qtr) => {
        return { x: qtr, y: val };
      });
    };

    const findCurrentQuarterFromActuals = (actualCashflow) => {
      let lastQuarterCashflow;
      let currentQuarter;

      Object.keys(actualCashflow).forEach((key) => {
        let quarterCashflow = actualCashflow[key];
        if (quarterCashflow - lastQuarterCashflow === lastQuarterCashflow) {
          currentQuarter = key - 1;
        }
        lastQuarterCashflow = quarterCashflow;
      });
      return currentQuarter;
    };

    const calculateMinAndMax = (values) => {
      return [d3.min(values), d3.max(values)];
    };
    const { actual_cashflow, accum_actual_cashflow, projected_cashflow, accum_projected_cashflow } =
      props;
    // Retrieve cashflow data from props
    const currentQuarter = findCurrentQuarterFromActuals(actual_cashflow);

    // Define D3 Coordinates
    const projectedPoints = generatePoints(Object.values(projected_cashflow));
    const actualPoints = generatePoints(Object.values(actual_cashflow));
    const projectedAccumulatedPoints = generatePoints(Object.values(accum_projected_cashflow));
    const actualAccumulatedPoints = generatePoints(Object.values(accum_actual_cashflow));

    return {
      currentQuarter,
      actualPoints,
      actualAccumulatedPoints,
      projectedPoints,
      projectedAccumulatedPoints,
    };
  };

  useEffect(() => {
    populateData();
  }, []);

  return (
    <div className="cashflow-graph">
      <div id="cash-graph">
        <div className="title-wrapper">
          <h3 className="text-hidden">cashflow</h3>
        </div>
      </div>
    </div>
  );
};

export default CashFlowGraph;
