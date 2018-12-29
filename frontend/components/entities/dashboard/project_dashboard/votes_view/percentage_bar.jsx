import React from 'react';
import * as d3 from 'd3'

class PercentageBar extends React.Component{
  constructor(props){
    super(props)
    this.setUp = this.setUp.bind(this)
  };

  componentDidMount(){
    console.log(this.props.svg);
      this.setUp()
  }

  componentDidUpdate(prevProps, prevState){
    console.log("Component Updating");
  }

  setUp(){
    let { pitchedProjects, width, height, x, y } = this.props
    let projectPercentages = pitchedProjects.map(project => project.voteShare).sort((a,b) => b - a);

      let svg;
      if (!this.props.svg) {
        svg = d3.select('.current-voting-cycle-container')
                     .append('svg')
                     .attr('width', "100%")
      } else {
        svg = this.props
      }

      console.log("SVG is:" ,svg);
      svg.append('rect')
      .classed('percentage-bar-svg', true)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#aa7a60')
      .attr('x', x)
      .attr('y', y)
      .style('stroke', 'white')
      .style('stroke-width', 2)

  }

  render(){
    return (
      <div className="percentage-bar-div"></div>
    );
  }
}

export default PercentageBar;
