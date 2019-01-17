import React from 'react'
import * as d3 from 'd3';

class TokenGraph extends React.Component{
  constructor(props){
    super(props);

  }

  componentDidMount(){

  }

  drawChart(){


  }

  render(){
    return(
      <div className="series content graph" id='token'>
        <svg
          className="token-svg"
          preserveAspectRatio="xMinYMin meet"
          viewBox="0 0 960 500">
        </svg>
      </div>
    );
  }

}

// <g transform={`translate(0, ${this.margin.left}, ${this.margin.top})`}></g>
export default TokenGraph
