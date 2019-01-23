import React from 'react';
// import { data } from '../../../util/token_data_util'
import * as d3 from 'd3';
import TokenDashboardRect from './token_dashboard_rect';

class TokenGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectIndex: null,
      tokenData: null,
      earningsData: null
     }

    this.handleMousemove = this.handleMousemove.bind(this);
    this.drawChart = this.drawChart.bind(this);
    this.calculateTokenData = this.calculateTokenData.bind(this);
    this.calculateEarningsData = this.calculateEarningsData.bind(this);
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
    return true;
  }

  drawChart() {
    const { data } = this.props;

    this.margin = { top: 20, right: 50, bottom: 30, left: 50 };
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.bisectDate = d3.bisector(d => d.date).left;

    this.x = d3.scaleTime().range([0, this.width]);
    this.y1 = d3.scaleLinear().range([this.height, 0]);
    this.y2 = d3.scaleLinear().range([this.height, 0]);

    this.x.domain([data[0].date, data[data.length - 1].date]);
    this.y1.domain([(data[0].price * 0.9), (data[data.length - 1].price * 1.1)]);
    this.y2.domain([0, (data[data.length - 1].balance * 1.5)]);

    this.linePrice = d3.line()
      .x(function(d) { return this.x(d.date); }.bind(this))
      .y(function(d) { return this.y1(d.price); }.bind(this))
      .curve(d3.curveMonotoneX);

    this.lineBalance = d3.line()
      .x(function(d) { return this.x(d.date); }.bind(this))
      .y(function(d) { return this.y2(d.balance); }.bind(this));

    this.svg = d3.select('#token').append('svg')
      .classed('token-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 960 500")
      .append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.svg.append('g')
      .attr('class', 'x x-axis')
      .attr('transform', `translate(0, ${this.height})`)
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
      .classed("circle-earnings", true)
      .attr('r', 4.5);

    this.focus1.append('line').classed('x', true);
    this.focus1.append('line').classed('y', true);

    this.focus1.append('text')
      .classed('price', true)
      .attr("transform", "translate(-100, -10)");

    this.focus1.append('text')
      .classed('earnings', true)
      .attr("transform", "translate(-35, -40)");

    // token focus
    this.focus2 = this.svg.append('g')
      .attr('class', 'focus focus2')
      .style('display', 'none');

    this.focus2.append('line').classed('x', true);
    this.focus2.append('line').classed('y', true);

    this.focus2.append('text')
      .classed('balance', true)
      .attr("transform", "translate(40, -10)");

    this.focus2.append('text')
      .classed('tokens', true)
      .attr("transform", "translate(-5, 40)rotate(90)");

    this.overlay = this.svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', this.width)
      .attr('height', this.height)
      .on('mouseover', () => {
        this.focus1.style('display', null);
        this.focus2.style('display', null);
      })
      .on('mouseout', () => {
        this.setState({ projectIndex: null })
        this.focus1.style('display', 'none');
        this.focus2.style('display', 'none');
      })
      .on('mousemove', this.handleMousemove);
  }

  handleMousemove() {
    const overlay = this.overlay._groups[0][0];
    const { data } = this.props;

    let x0 = this.x.invert(d3.mouse(overlay)[0]);
    let i = this.bisectDate(data, x0, 1);
    // console.log("this.bisectDate(data) aka i is: ", i);
    let d0 = data[i - 1];
    let d1 = data[i];
    let d = x0 - d0.date > d1.date - x0 ? d1 : d0;

    let projectIndex = x0 - d0.date > d1.date - x0 ? i : i-1;
    // console.log("x0 - d0.date: ", new Date(x0 - d0.date).toDateString());
    // console.log("d1.date - x0: ", new Date(d1.date - x0).toDateString());
    // console.log("x0: ", x0);
    // console.log("d1.date: ", d1.date);
    // console.log("d0.date: ", d0.date);
    this.setState({projectIndex: projectIndex})
    // console.log(projectIndex);
    if(this.state.projectIndex){
      this.calculateTokenData();
      this.calculateEarningsData();
    }

    d3.selectAll(".focus").selectAll('line.x, line.y')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', 0);

    // price dashed line
    this.focus1.selectAll('line.x').attr('x2', -this.x(d.date) - this.width);
    this.focus1.selectAll('line.y').attr('y2', this.height - this.y1(d.price));

    // toggle if all or user to remove earnings and tokens
    if (d.earnings) {
      this.focus1.selectAll(".circle-earnings")
        .attr("r", d.earnings / 20);
        // .style("fill", "none")
        // .style("stroke-dasharray", "3 3");
      this.focus1.select('.earnings').text(`earnings: $${d.earnings}`);
      this.focus2.select('.tokens').text(`${d.tokens} tokens`);
    } else {
      this.focus1.selectAll(".circle-earnings")
        .attr("r", 8);
        // .style("fill", "black")
        // .style("stroke-dasharray", 0);
      this.focus1.select('.earnings').text("");
      this.focus2.select('.tokens').text("");
    }

    // balance dashed line
    this.focus2.selectAll('line.x').attr('x2', this.x(d.date) + this.width * 2);
    this.focus2.selectAll('line.y').attr('y2', this.height - this.y2(d.balance));

    // bar width hover for shares
    this.focus2.selectAll('line.y').style('stroke-width', d.tokens);

    // append text
    this.focus1.attr('transform', `translate(${this.x(d.date)}, ${this.y1(d.price)})`);
    this.focus1.select('.price').text(`price: $${d.price}`);
    this.focus2.attr('transform', `translate(${this.x(d.date)}, ${this.y2(d.balance)})`);
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

  calculateTokenData(){
    let { data } = this.props;
    let { projectIndex } = this.state
    console.log(projectIndex);
    // projectIndex = projectIndex || data.length-1;
    if(projectIndex){
      let hoveredActiveTokens = data[projectIndex].active_tokens;
      let hoveredTotalTokens = data[projectIndex].tokens;
      let hoveredActiveTokenRatio = (hoveredActiveTokens / hoveredTotalTokens) * 100;
      let tokenData = { hoveredActiveTokenRatio, hoveredActiveTokens, hoveredTotalTokens };
      this.setState({tokenData})
      return tokenData

    }
    // return `${activeTokenRatio}%`;

  }

  calculateEarningsData(){
    let { data } = this.props;
    let { projectIndex } = this.state;

    if(projectIndex){
      let hoveredEarnings = data[projectIndex].earnings;
      let totalEarnings = data[data.length-1].earnings;
      let earningsData = { hoveredEarnings, totalEarnings };
      console.log(earningsData);
      this.setState({earningsData})
      return earningsData
    }
  }

  render() {
    return (
      <div className="series content graph" id='token'>
        <TokenDashboardRect
                        x={0}
                        y={0}
                        width={100}
                        height={this.height ? this.height : 430}
                        tokenData={this.state.tokenData}
                        color={"rgba(170, 122, 96, 1)"}
                        opaqueColor={"rgba(170, 122, 96, .3)"}
                        tokenRect={true}
                        id="Gradient1"/>
        <TokenDashboardRect
          x={window.innerWidth-90}
          y={0}
          width={100}
          height={430}
          color={"rgba(97, 171, 169, 1)"}
          opaqueColor={"rgba(97, 171, 169, .3)"}
          id="Gradient2"
          earningsData={this.state.earningsData} />
      </div>
  );
  }

}

export default TokenGraph;
