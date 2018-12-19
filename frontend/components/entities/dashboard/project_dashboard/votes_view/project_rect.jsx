import React from 'react';
import * as d3 from 'd3';

class ProjectRect extends React.Component{
  constructor(props){
    super(props);
    this.setUpProject = this.setUpProject.bind(this)
  }

  componentDidUpdate(prevProps){
    if(typeof prevProps.svg === 'undefined' && typeof this.props.svg !== 'undefined'){
      console.log('setup')
      this.setUpProject();
    }
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
       .style('stroke', 'white')
       .style('stroke-width', 2)
       // .style('border-width', 0, 1, 0, 1)
       // .style('border-style', 'solid')
       // .style('border-color', 'white')
  }

  render(){
    return (
      <div className="project-sub-bar-div"></div>
    );
  }
}

export default ProjectRect;
