import React from 'react';
// import { Route, NavLink } from 'react-router-dom';

class TokenDashboard extends React.Component {

  componentDidMount() {
    // this.props.fetchUsers();
    this.drawChart();
  }

  shouldComponentUpdate() {
    return false;
  }

  drawChart() {
    const data = [
      {
        "date": "12/1/17",
        "price": 67.20,
      },
      {
        "date": "1/1/18",
        "price": 70.43,
      },
      {
        "date": "2/1/18",
        "price": 78.22,

      },
      {
        "date": "3/1/18",
        "price": 74.85,
      },
    ]

    const margin = { top: 20, right: 50, bottom: 30, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const parseTime = d3.timeParse("%m/%d/%Y");

    data.forEach(d => {
      d.date = parseTime(d.date);
      d.price = +d.price;
    });

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain([data[0].date, data[data.length - 1].date]);
    y.domain([(data[0].price * 0.95), (data[data.length - 1].price * 1.05)]);

    const linePrice = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.price))
      .curve(d3.curveMonotoneX);

    let svg = d3.select('#token').append('svg')
      .classed('token-svg', true)
      // .attr('width', width)
      // .attr('height', height)
      .attr('width', "75%")
      .attr('height', "75%")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 960 500")
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg.append('g')
      .attr('class', 'x axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%m.%d.%y")));

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', linePrice);
  }

  render() {

    return (
      <div className="series content" id='token'>
      </div>
    );
  }

};

export default TokenDashboard;
