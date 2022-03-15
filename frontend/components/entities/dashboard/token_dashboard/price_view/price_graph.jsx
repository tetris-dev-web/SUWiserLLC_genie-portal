import React, { useEffect } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import "./price_graph.scss";

const PriceGraph = (props) => {
  const { data } = props;
  let margin, width, height, bisectDate, x, y1, y2, linePrice, lineBalance;
  let svg, focus1, focus2;
  useEffect(() => {
    drawChart();
  }, []);

  useEffect(() => {
    updateData(props);
    transition(500);
  }, [props]);

  const drawChart = () => {
    margin = { top: 20, right: 50, bottom: 30, left: 50 };
    width = 960 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
    bisectDate = d3.bisector((d) => d.date).left;

    x = d3.scaleTime().range([0, width]);
    y1 = d3.scaleLinear().range([height, 0]);
    y2 = d3.scaleLinear().range([height, 0]);

    x.domain([data[0].date, data[data.length - 1].date]);
    y1.domain([data[0].price * 0.9, data[data.length - 1].price * 1.1]);
    y2.domain([0, data[data.length - 1].balance * 1.5]);

    linePrice = d3
      .line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y1(d.price);
      })
      .curve(d3.curveMonotoneX);

    lineBalance = d3
      .line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y2(d.balance);
      });

    svg = d3
      .select(".price-graph")
      .append("svg")
      .classed("token-svg", true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 960 500")
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg
      .append("g")
      .attr("class", "x x-axis")
      .attr("transform", `translate(0, ${this.height})`)
      .call(d3.axisBottom(this.x).tickFormat(d3.timeFormat("%m.%y")));

    svg.append("path").datum(data).attr("class", "line").attr("d", this.linePrice);

    // price focus
    focus1 = this.svg.append("g").attr("class", "focus focus1").style("display", "none");

    focus1.append("circle").classed("circle-earnings", true).attr("r", 4.5);

    focus1.append("line").classed("x", true);
    focus1.append("line").classed("y", true);

    focus1.append("text").classed("price", true).attr("transform", "translate(-100, -10)");

    focus1.append("text").classed("earnings", true).attr("transform", "translate(-35, -40)");

    // token focus
    focus2 = this.svg.append("g").attr("class", "focus focus2").style("display", "none");

    focus2.append("line").classed("x", true);
    focus2.append("line").classed("y", true);

    focus2.append("text").classed("balance", true).attr("transform", "translate(40, -10)");

    focus2.append("text").classed("tokens", true).attr("transform", "translate(-5, 40)rotate(90)");

    overlay = svg
      .append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", () => {
        focus1.style("display", null);
        focus2.style("display", null);
      })
      .on("mouseout", () => {
        focus1.style("display", "none");
        focus2.style("display", "none");
      })
      .on("mousemove", handleMousemove);
  };

  const handleMousemove = () => {
    const overlay0 = overlay._groups[0][0];

    let x0 = x.invert(d3.mouse(overlay0)[0]);
    let i = bisectDate(data, x0, 1);
    let d0 = data[i - 1];
    let d1 = data[i];
    let d = x0 - d0.date > d1.date - x0 ? d1 : d0;

    d3.selectAll(".focus")
      .selectAll("line.x, line.y")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", 0);

    // price dashed line
    focus1.selectAll("line.x").attr("x2", -this.x(d.date) - this.width);
    focus1.selectAll("line.y").attr("y2", this.height - this.y1(d.price));

    // toggle if all or user to remove earnings and tokens
    if (d.earnings) {
      focus1.selectAll(".circle-earnings").attr("r", d.earnings / 20);
      // .style("fill", "none")
      // .style("stroke-dasharray", "3 3");
      focus1.select(".earnings").text(`earnings: $${d.earnings}`);
      focus2.select(".tokens").text(`${d.tokens} tokens`);
    } else {
      focus1.selectAll(".circle-earnings").attr("r", 8);
      // .style("fill", "black")
      // .style("stroke-dasharray", 0);
      focus1.select(".earnings").text("");
      focus2.select(".tokens").text("");
    }

    // balance dashed line
    focus2.selectAll("line.x").attr("x2", x(d.date) + width * 2);
    focus2.selectAll("line.y").attr("y2", height - y2(d.balance));

    // bar width hover for shares
    focus2.selectAll("line.y").style("stroke-width", d.tokens);

    // append text
    focus1.attr("transform", `translate(${x(d.date)}, ${y1(d.price)})`);
    focus1.select(".price").text(`price: $${d.price}`);
    focus2.attr("transform", `translate(${x(d.date)}, ${y2(d.balance)})`);
    focus2.select(".balance").text(`balance: $${d.balance}`);
  };

  const updateData = (props) => {
    x.domain([data[0].date, data[data.length - 1].date]);
    y1.domain([data[0].price * 0.9, data[data.length - 1].price * 1.1]);
    y2.domain([0, data[data.length - 1].balance * 1.5]);
    d3.select(".line").datum(data);
  };

  const transition = (duration) => {
    d3.select(".x-axis")
      .transition()
      .duration(duration)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m.%y")));

    d3.select(".line").transition().duration(duration).attr("d", linePrice);
  };

  return <div className="price-graph"></div>;
};

export default React.memo(PriceGraph);
