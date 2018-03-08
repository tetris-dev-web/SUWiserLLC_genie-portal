import React from 'react';
// import { data } from '../../../util/token_data_util'

class TokenGraph extends React.Component {

  constructor(props) {
    super(props);

    this.handleMousemove = this.handleMousemove.bind(this);
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    // this.props.fetchUsers();
    this.drawChart();
  }

  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps);
    this.transition(500);
  }

  shouldComponentUpdate() {
    return false;
  }

  drawChart() {


    const { currentUser, data } = this.props;
    if (this.props.currentUser) {
      // add tokens to every object of data
      for (let i = 0; i < data.length; i++) {
        data[i]["tokens"] = currentUser.tokens;
      }
    }


    const margin = { top: 20, right: 50, bottom: 30, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const bisectDate = d3.bisector(d => d.date).left;

    this.x = d3.scaleTime().range([0, width]);
    this.y1 = d3.scaleLinear().range([height, 0]);
    this.y2 = d3.scaleLinear().range([height, 0]);

    this.x.domain([data[0].date, data[data.length - 1].date]);
    this.y1.domain([(data[0].price * 0.9), (data[data.length - 1].price * 1.1)]);
    this.y2.domain([0, (data[data.length - 1].balance * 1.5)]);

    this.linePrice = d3.line()
      // .x(d => this.x(d.date))
      // .y(d => this.y1(d.price))
      .x(function(d) { return this.x(d.date); }.bind(this))
      .y(function(d) { return this.y1(d.price); }.bind(this))
      .curve(d3.curveMonotoneX);

    this.lineBalance = d3.line()
      // .x(d => this.x(d.date))
      // .y(d => this.y2(d.balance));
      .x(function(d) { return this.x(d.date); }.bind(this))
      .y(function(d) { return this.y2(d.balance); }.bind(this));

    this.svg = d3.select('#token').append('svg')
      .classed('token-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 960 500")
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.svg.append('g')
      .attr('class', 'x axis x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(this.x)
        .tickFormat(d3.timeFormat("%m.%y")));

    this.svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', this.linePrice);

    // price focus
    this.focus1 = this.svg.append('g')
      .attr('class', 'focus focus1')
      .style('display', 'none');

    this.focus1.append('circle')
      .classed("circle-earned", true)
      .attr('r', 4.5);

    this.focus1.append('line').classed('x', true);
    this.focus1.append('line').classed('y', true);

    this.focus1.append('text')
      .classed('price', true)
      .attr("transform", "translate(-75, -10)");

    // token focus
    this.focus2 = this.svg.append('g')
      .attr('class', 'focus focus2')
      .style('display', 'none');

    this.focus2.append('line').classed('x', true);
    this.focus2.append('line').classed('y', true);

    this.focus2.append('text')
      .classed('balance', true)
      .attr("transform", "translate(30, -10)");

    this.testSvg = this.svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', () => {
        this.focus1.style('display', null);
        this.focus2.style('display', null);
      })
      .on('mouseout', () => {
        // for now set it to the end when the user mouses off the graph
        // focus1.attr("transform", "translate(860, 165.39068666140514)")
        // focus1.selectAll('line.x').attr("x2", "-1720")
        // focus1.selectAll('line.y').attr("y2", "284.60931333859486")
        //
        // focus2.attr("transform", "translate(860, 150)")
        // focus2.selectAll('line.x').attr("x2", "2580")
        // focus2.selectAll('line.y').attr("y2", "300")
      })
      .on('mousemove', this.handleMousemove);
      // .on('mousemove', () => {
      //   // debugger
      //   this.handleMousemove();
      // });

    // const mousemove = () => {
    //   // debugger
    //   let x0 = this.x.invert(d3.mouse(this)[0]);
    //   let i = bisectDate(data, x0, 1);
    //   let d0 = data[i - 1];
    //   let d1 = data[i];
    //   let d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    //
    //   d3.selectAll(".focus").selectAll('line.x, line.y')
    //     .attr('x1', 0)
    //     .attr('x2', 0)
    //     .attr('y1', 0)
    //     .attr('y2', 0);
    //
    //   // price dashed line
    //   focus1.selectAll('line.x').attr('x2', -x(d.date) - width);
    //   focus1.selectAll('line.y').attr('y2', height - y1(d.price));
    //
    //   // balance dashed line
    //   focus2.selectAll('line.x').attr('x2', x(d.date) + width * 2);
    //   focus2.selectAll('line.y').attr('y2', height - y2(d.balance));
    //
    //   // bar width hover for shares
    //   focus2.selectAll('line.y').style('stroke-width', d.tokens);
    //
    //   // append text
    //   focus1.attr('transform', `translate(${x(d.date)}, ${y1(d.price)})`);
    //   focus1.select('.price').text(`price: $${d.price}`);
    //
    //   focus2.attr('transform', `translate(${x(d.date)}, ${y2(d.balance)})`);
    //   focus2.select('.balance').text(`balance: $${d.balance}`);
    // }
  }

  handleMousemove() {
     debugger;
    // this.x.invert should refer to the class
    // d3.mouse(this) needs to refer to rect, not the class
    let x0 = this.x.invert(d3.mouse(this.testSvg)[0]);
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
    this.focus1.selectAll('line.x').attr('x2', -x(d.date) - width);
    this.focus1.selectAll('line.y').attr('y2', height - y1(d.price));

    // balance dashed line
    this.focus2.selectAll('line.x').attr('x2', x(d.date) + width * 2);
    this.focus2.selectAll('line.y').attr('y2', height - y2(d.balance));

    // bar width hover for shares
    this.focus2.selectAll('line.y').style('stroke-width', d.tokens);

    // append text
    this.focus1.attr('transform', `translate(${x(d.date)}, ${y1(d.price)})`);
    this.focus1.select('.price').text(`price: $${d.price}`);

    this.focus2.attr('transform', `translate(${x(d.date)}, ${y2(d.balance)})`);
    this.focus2.select('.balance').text(`balance: $${d.balance}`);
  }

  updateData(props) {
    const { data } = props;
    this.x.domain([data[0].date, data[data.length - 1].date]);
    this.y1.domain([(data[0].price * 0.9), (data[data.length - 1].price * 1.1)]);
    this.y2.domain([0, (data[data.length - 1].balance * 1.5)]);
    d3.select('.line').datum(data);
  }

  transition(duration) {
    d3.select('.x-axis')
      .transition()
      .duration(duration)
      .call(d3.axisBottom(this.x)
        .tickFormat(d3.timeFormat("%m.%y")));

    d3.select('.line')
      .transition()
      .duration(duration)
      .attr('d', this.linePrice);
  }

  render() {

    return (
      <div className="series content" id='token'>
      </div>
    );
  }

};

export default TokenGraph;
