import React from 'react';
import * as d3 from 'd3';

class ProjectSubBar extends React.Component{
  constructor(props){
    super(props);

    this.setUpProject = this.setUpProject.bind(this)
  }

  setUpProject(){
    let { height, width, x, y, svg, opacity  } = this.props;
    svg.append('rect')
    .classed('project-sub-bar-svg', true)
    .attr('fill', '#aa7a60')
    .attr('width', width)
    .attr('height', height)
    .attr('x', x)
    .attr('y', y)
    .style('opacity', opacity)
    // d3.select('.project-sub-bar-div')
    // .append('svg')
    // .attr('width', width)
    // .attr('height', height)
    // .attr('transform', 'translate(0,70%)')
    // .style('opacity', this.props.opacity)
  }

  componentDidUpdate(prevProps){
    if(typeof prevProps.svg === 'undefined' && typeof this.props.svg !== 'undefined'){
      this.setUpProject();
    }
  }


  render(){
    return (
      <div className="project-sub-bar-div"></div>
    );
  }
}

export default ProjectSubBar;
