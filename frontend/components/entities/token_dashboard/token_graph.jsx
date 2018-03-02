import React from 'react';
import { data } from '../../../util/token_data_util'

class TokenGraph extends React.Component {

  constructor(props) {
    super(props);

    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    // this.props.fetchUsers();
    // debugger
    this.drawChart();
  }

  shouldComponentUpdate() {
    return false;
  }

  drawChart() {

    // add tokens to every object of data
    const tokens = this.props.currentUser.tokens;
    for (let i = 0; i < data.length; i++) {
      data[i]["tokens"] = tokens;
    }

    const margin = { top: 20, right: 50, bottom: 30, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const parseTime = d3.timeParse("%m/%d/%Y");
    const bisectDate = d3.bisector(d => d.date).left;

    data.forEach(d => {
      d.date = parseTime(d.date);
      d.price = +d.price;
      d.balance = +d.balance;
      d.tokens = +d.tokens;
    });

    const x = d3.scaleTime().range([0, width]);
    const y1 = d3.scaleLinear().range([height, 0]);
    const y2 = d3.scaleLinear().range([height, 0]);

    x.domain([data[0].date, data[data.length - 1].date]);
    y1.domain([(data[0].price * 0.95), (data[data.length - 1].price * 1.05)]);
    y2.domain([0, (data[data.length - 1].balance * 1.5)]);

    const linePrice = d3.line()
      .x(d => x(d.date))
      .y(d => y1(d.price))
      .curve(d3.curveMonotoneX);

    const lineBalance = d3.line()
      .x(d => x(d.date))
      .y(d => y2(d.balance));

    let svg = d3.select('#token').append('svg')
      .classed('token-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 960 500")
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%m.%y")));

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', linePrice);

    // price focus
    const focus1 = svg.append('g')
      .attr('class', 'focus focus1')
      .style('display', 'none');

    focus1.append('circle')
      .classed("circle-earned", true)
      .attr('r', 4.5);

    focus1.append('line').classed('x', true);
    focus1.append('line').classed('y', true);

    focus1.append('text')
      .classed('price', true)
      .attr("transform", "translate(-75, -10)");

    // token focus
    const focus2 = svg.append('g')
      .attr('class', 'focus focus2')
      .style('display', 'none');

    focus2.append('line').classed('x', true);
    focus2.append('line').classed('y', true);

    focus2.append('text')
      .classed('balance', true)
      .attr("transform", "translate(30, -10)");

    svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', () => {
        focus1.style('display', null);
        focus2.style('display', null);
      })
      .on('mouseout', () => {
        // for now set it to the end when the user mouses off the graph
        focus1.attr("transform", "translate(860, 165.39068666140514)")
        focus1.selectAll('line.x').attr("x2", "-1720")
        focus1.selectAll('line.y').attr("y2", "284.60931333859486")

        focus2.attr("transform", "translate(860, 150)")
        focus2.selectAll('line.x').attr("x2", "2580")
        focus2.selectAll('line.y').attr("y2", "300")
      })
      .on('mousemove', mousemove);

    function mousemove() {
      let x0 = x.invert(d3.mouse(this)[0]);
      let i = bisectDate(data, x0, 1);
      let d0 = data[i - 1];
      let d1 = data[i];
      let d = x0 - d0.date > d1.date - x0 ? d1 : d0;

      d3.selectAll(".focus").selectAll('line.x, line.y')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', 0);

      // price dashed line
      focus1.selectAll('line.x').attr('x2', -x(d.date) - width);
      focus1.selectAll('line.y').attr('y2', height - y1(d.price));

      // balance dashed line
      focus2.selectAll('line.x').attr('x2', x(d.date) + width * 2);
      focus2.selectAll('line.y').attr('y2', height - y2(d.balance));

      // bar width hover for shares
      focus2.selectAll('line.y').style('stroke-width', d.tokens);

      // append text
      focus1.attr('transform', `translate(${x(d.date)}, ${y1(d.price)})`);
      focus1.select('.price').text(`price: $${d.price}`);

      focus2.attr('transform', `translate(${x(d.date)}, ${y2(d.balance)})`);
      focus2.select('.balance').text(`balance: $${d.balance}`);
    }
  }

  render() {

    return (
      <div className="series content" id='token'>
      </div>
    );
  }

};

export default TokenGraph;
