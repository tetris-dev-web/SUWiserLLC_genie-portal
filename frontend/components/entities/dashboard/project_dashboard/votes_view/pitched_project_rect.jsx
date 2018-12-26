import React from 'react';
import * as d3 from 'd3';

class PitchedProjectRect extends React.Component{
  constructor(props){
    super(props);
    this.setUpProject = this.setUpProject.bind(this)
  }

  componentDidUpdate(prevProps){
    if(typeof prevProps.svg === 'undefined' && typeof this.props.svg !== 'undefined'){
      this.setUpProject();
    }
  }

  setUpProject(){
    let { height, width, x, y, svg, opacity, valuation, capitalRequired, isTop, capitalRaised  } = this.props;
    console.log("Capital Raised is: ", capitalRaised);
    console.log("Capital Required is: ", capitalRequired);
      let textHeight = parseInt(y.slice(0, y.length-1)) + 8 + "%";
      // let textWidth = parseInt(x.slice(0, x.length-1)) + 10 + "%"
      // let textHeight = parseInt(y.slice(0, y.length-1));// + parseInt(y.slice(0, y.length-1))
      let textWidth = `${parseInt(x.slice(0, x.length-1)) + parseInt(width.slice(0, width.length-1))/2 - .5}%`; //- String(valuation).length *
      const color = capitalRaised < capitalRequired ? '#aa7a60' : '#61aba9';
      // debugger
       let group = svg.append('g');
       let rect = group.append('rect')
       .classed('project-sub-bar-svg', true)
       .attr('fill', color)
       .attr('width', width)
       .attr('height', height)
       .attr('x', x)
       .attr('y', y)
       .style('opacity', opacity)
       .style('stroke', 'white')
       .style('stroke-width', 2)
       .on('mouseover', () => {
         textNode.attr("display", "block");
       })
       .on('mouseout', () => {
         textNode.attr('display', 'none');
       });


       let textNode = group.append('text')
       .style("font-size", "12px")
       .style("fill", 'white')
       .attr('display', 'none')
       .text(() => {
         return isTop ? valuation : capitalRequired;
       })
       .attr('x', textWidth)
       .attr('y', textHeight)
       .attr('pointer-events', 'none');

  }

  // .style('border-width', 0, 1, 0, 1)
  // .style('border-style', 'solid')
  // .style('border-color', 'white')
  render(){
    return (
      <div className="project-sub-bar-div"></div>
    );
  }
}

export default PitchedProjectRect;
