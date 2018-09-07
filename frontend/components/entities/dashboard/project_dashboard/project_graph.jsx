import React from 'react';
// import { data } from '../../../util/token_data_util'
import {withFauxDOM} from 'react-faux-dom'

class ProjectGraph extends React.Component {
  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
    this.createNodes = this.createNodes.bind(this);

    // this.handleMousemove = this.handleMousemove.bind(this);
    // this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount(){
    // this.createSVG();
    // this.drawChart();

    const faux = this.props.connectFauxDOM('div', 'chart')
    d3.select(faux)
      .append('div')
      .html('Hello World!')
    this.props.animateFauxDOM(800)
  }

  drawChart(){
    this.createNodes();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  createSVG() {
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    this.svg = d3.select('#project').append('svg')
      .classed('project-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 700 500")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
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
    if (this.props.data) {
      // debugger
      data = Object.keys(this.props.data).map(key => {
        const project = this.props.data[key];
        return <li key={project.id}>{project.title} {project.created_at}</li>;
      });
    }

    return (
      <div className="series content graph" id='project'>

        {this.props.chart}
      </div>
    );
  }

}

ProjectGraph.defaultProps = {
  chart: 'loading'
}

export default withFauxDOM(ProjectGraph);
