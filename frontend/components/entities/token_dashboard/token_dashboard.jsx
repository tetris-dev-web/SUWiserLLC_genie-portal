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
        "price": 73.22,

      },
      {
        "date": "3/1/18",
        "price": 74.85,
      },
      {
        "date": "4/1/18",
        "price": 72.85,
      },
      {
        "date": "5/1/18",
        "price": 73.85,
      },
      {
        "date": "6/1/18",
        "price": 69.85,
      },
    ]

    const margin = { top: 20, right: 50, bottom: 30, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const parseTime = d3.timeParse("%m/%d/%Y");
    const bisectDate = d3.bisector(d => d.date).left;

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
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 960 500")
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg.append('g')
      .attr('class', 'x axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%m.%y")));

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', linePrice);

    const focus = svg.append('g')
      .attr('class', 'focus');
      // .style('display', 'none');

    focus.append('circle')
      .classed("circle-earned", true)
      .attr('r', 4.5);

    focus.append('line')
      .classed('x', true);

    focus.append('line')
      .classed('y', true);

    focus.append('text')
      .classed('price', true)
      .attr("transform", "translate(-75, 0)")
      .attr('dy', '.35em');

    svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', () => {
        focus.style('display', null);
        // focus1.style('display', null);
      })
      .on('mouseout', () => {
        // only hide share-amount focus
        // focus0.style('display', 'none')
        // focus1.style('display', 'none')
      })
      .on('mousemove', mousemove);

    d3.selectAll('.overlay')
      .style('fill', 'none')
      .style('pointer-events', 'all');

    function mousemove() {
      let x0 = x.invert(d3.mouse(this)[0]);
      let i = bisectDate(data, x0, 1);
      let d0 = data[i - 1];
      let d1 = data[i];
      let d = x0 - d0.date > d1.date - x0 ? d1 : d0;

      d3.selectAll(".focus").selectAll('line.x')
        .attr('x1', 0)
        .attr('x2', -x(d.date))
        .attr('y1', 0)
        .attr('y2', 0);

      d3.selectAll(".focus").selectAll('line.y')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0);

      focus.select('line.y')
        .attr('y2', height - y(d.price));

      focus.attr('transform', `translate(${x(d.date)}, ${y(d.price)})`);
      focus.select('.price').text(`price: $${d.price}`);
    }
  }

  // hover() {
  //
  // }

  render() {

    return (
      <div className="series content" id='token'>
      </div>
    );
  }

};

export default TokenDashboard;
