import React from 'react';
// import { data } from '../../../util/token_data_util'

class ProjectGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
    };

    this.drawChart = this.drawChart.bind(this);
    this.createNodes = this.createNodes.bind(this);

    // this.handleMousemove = this.handleMousemove.bind(this);
    // this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount(){
    this.createSVG();
    this.drawChart();
  }

  drawChart(){
    this.createNodes();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  createSVG() {
      this.svg = d3.select('svg');

      d3.select('#project').append('svg')
        .classed('project-svg', true)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 700 500")
        .append('g');
  }

  createNodes() {
    // debugger
    // if (this.state.data) {
    //   var node = svg.append("g")
    //     .attr("class", "nodes")
    //     .selectAll("circle")
    //     .data(this.state.data)
    //     .enter()
    //     .append("circle")
    //     .attr("r", 10)
    //     .attr("fill", red);
    // }
  }

  render() {

    let data = '';
    if (this.state.data) {
      data = this.state.data.map(d => {
        return <li key={d.id}>{d.title} {d.created_at}</li>;
      });
    }

    return (
      <div className="series content graph" id='project'>

      </div>
    );
  }

}

export default ProjectGraph;
