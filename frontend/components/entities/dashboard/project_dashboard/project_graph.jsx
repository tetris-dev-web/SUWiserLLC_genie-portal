import React from 'react';
// import { data } from '../../../util/token_data_util'
import {withFauxDOM} from 'react-faux-dom'

// const CONTINENTS = [{title: "Antarctica"}, {title: "Asia"}, {title: "Africa"}, {title: "Australia"},
//  {title:"Europe"}, {title: "North America"}, {title:"South America"}];

 const margin = {top: 20, right: 20, bottom: 30, left: 50};
 const width = 960 - margin.left - margin.right;
 const height = 500 - margin.top - margin.bottom;

class ProjectGraph extends React.Component {
  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
    this.createNodes = this.createNodes.bind(this);
    this.simulation = this.simulation.bind(this);
    this.setUp = this.setUp.bind(this);
    // this.handleMousemove = this.handleMousemove.bind(this);
    // this.drawChart = this.drawChart.bind(this);
    this.createSVG = this.createSVG.bind(this);
  }

  componentDidMount(){
    this.props.fetchProjects().then(() => {
      this.setUp();
    })
  }

  getUniqueCitites(projectKeys) {

    const cities = projectKeys.reduce((cities, key) => {
      const title = this.props.data[key].city;
      const data = {
        title,
        continent: this.props.data[key].continent
      }

      if (!cities[title]) {
        cities[title] = data;
      }
      return cities;
    }, {});

    return Object.keys(cities).map(title => {
      return cities[title];
    });
  }

  setUp () {
    const projectKeys = Object.keys(this.props.data);

    const projects = projectKeys.map(key => {
      return this.props.data[key];
    })
    const cities = this.getUniqueCitites(projectKeys);
    const continents = [{title: "Antarctica"}, {title: "Asia"}, {title: "Africa"}, {title: "Australia"},
     {title:"Europe"}, {title: "North America"}, {title:"South America"}];

    const nodesData = projects.concat(continents).concat(cities);
    console.log(nodesData);
    const faux = this.props.connectFauxDOM('div', 'chart')
    const simulation = this.simulation(nodesData);
    const svg = this.createSVG(faux);
    const node = this.createNodes(svg, nodesData);
    const links = this.createLinks(projects, cities);
    const text = this.createText(svg,nodesData);

    simulation.force("links", links)
    simulation.on('tick', () => this.tickActions(node, text));
    this.props.animateFauxDOM(800)
  }


  createText(svg,nodesData) {
    return svg.selectAll('text')
    .data(nodesData)
    .enter()
    .append("text")
    .attr("dx", (d) => {d.x})
    .attr("dy", (d) => {d.y})
    .style("font-size", "18px")
    .text((d) => d.title);
  }

  simulation (nodesData) {
    return d3.forceSimulation()
              .nodes(nodesData)
              .force("charge_force", d3.forceManyBody())
              .force("center_force", d3.forceCenter(width / 2, height / 2));
  }

  drawChart(){
    this.createNodes();
  }

  tickActions(node, text) {
    //update circle positions to reflect node updates on each tick of the simulation
    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
    text
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
  }

  createSVG(faux) {
    return d3.select(faux).append('svg')
      .classed('project-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 700 500")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append('g');
  }

  createNodes(svg, nodesData) {
    // return svg.attr("class", "nodes")
    //   .selectAll("circle")
    //   .data(nodesData)
    //   .enter()
    //   .append("circle")
    //   .attr("r", 10)
    //   .attr("fill", "red");
    return svg.attr("class", "nodes")
      .selectAll("circle")
      .data(nodesData)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "red");
  }

  createLinks (projects, cities) {
    const projectCityLinks = projects.map(project => {
        return {
          source: project.title,
          target: project.city
        };
    });

    const cityContinentLinks = cities.map(city => {
      return {
        source: city.title,
        target: city.continent
      }
    })
    console.log(projectCityLinks.concat(cityContinentLinks));
    return d3.forceLink(projectCityLinks.concat(cityContinentLinks))
                        .id(function(d) { return d.title; })
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
      <div className='graph-container'>
        <div className="series content graph" id='project'>
          {this.props.chart}
        </div>
      </div>
    );
  }
}

ProjectGraph.defaultProps = {
  chart: 'loading'
}

export default withFauxDOM(ProjectGraph);
