import React from 'react';
// import { data } from '../../../util/token_data_util'
import {withFauxDOM} from 'react-faux-dom'
import * as d3 from 'd3';
import {event as currentEvent} from 'd3-selection';

// const CONTINENTS = [{title: "Antarctica"}, {title: "Asia"}, {title: "Africa"}, {title: "Australia"},
//  {title:"Europe"}, {title: "North America"}, {title:"South America"}];

 const margin = {top: 20, right: 20, bottom: 30, left: 50};
 const width = 960 - margin.left - margin.right;
 const height = 500 - margin.top - margin.bottom;

class ProjectGraph extends React.Component {
  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
    this.createCircles = this.createCircles.bind(this);
    this.simulation = this.simulation.bind(this);
    this.setUp = this.setUp.bind(this);
    this.addDragHandlers = this.addDragHandlers.bind(this);
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

     const scales = this.createDomainScales(projects);
    const nodesData = projects.concat(continents).concat(cities);
    const faux = this.props.connectFauxDOM('div', 'chart')
    const simulation = this.simulation(nodesData);
    const svg = this.createSVG(faux);
    const linksData = this.createLinks(projects, cities);
    const circle = this.createCircles(svg, nodesData, scales.vScale, true);
    const innerCircle = this.createCircles(svg, nodesData, scales.rScale, false);
    const text = this.createText(svg,nodesData);
    const link = this.drawLinks(svg, linksData)
    const forceLinks = d3.forceLink(linksData)
                        .id(function(d) { return d.title; })


    simulation.force("links", forceLinks)
    simulation.on('tick', () => this.tickActions(circle, text, link, innerCircle));
    this.addDragHandlers( simulation,circle,innerCircle );
    this.props.animateFauxDOM(800)
  }

  addDragHandlers( simulation,circle,innerCircle ) {

    const drag_start = (d) => {
      if (!currentEvent.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    const drag_end = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    const drag_drag = (d) => {
      console.log(d3.event.x);
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    var drag_handler = d3.drag()
    .on("start", drag_start)
    .on("drag", drag_drag)
    .on("end", drag_end);

    drag_handler(circle);
    // drag_handler(innerCircle);

  }


  createText(svg,nodesData) {
    return svg.append('g')
    .selectAll('text')
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

  tickActions(circle, text, link, innerCircle) {
    //update circle positions to reflect node updates on each tick of the simulation
    circle
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
    innerCircle
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
    text
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })

    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
  }

  createSVG(faux) {
    return d3.select(faux).append('svg')
      .classed('project-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 700 500")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
  }

  createCircles(svg, nodesData, rscale, valuation) {
    return svg.append('g')
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodesData)
      .enter()
      .append("circle")
      .attr("r", (d) => {
        if (d.valuation) {
          const val = rscale(valuation ? Number(d.valuation) : Number(d.revenue));
          return val;
        } else {
          return 10;
        }
      })
      .attr("fill", valuation ? "red" : "blue");
  }

  createDomainScales( projects ) {
    const result = projects.reduce((domains, project) => {
      const valuation = Number(project.valuation);
      const revenue = Number(project.revenue);

      if (!domains.vDomain[0] || valuation < domains.vDomain[0]) {
        domains.vDomain[0] = valuation;
      }
      if (!domains.vDomain[1] || valuation > domains.vDomain[1]) {
        domains.vDomain[1] = valuation;
      }
      if (!domains.rDomain[0] || valuation < domains.rDomain[0]) {
        domains.rDomain[0] = revenue;
      }
      if (!domains.rDomain[1] || valuation > domains.rDomain[1]) {
        domains.rDomain[1] = revenue;
      }

      return domains;
    }, {rDomain: [], vDomain: []})

    return {vScale: d3.scaleLinear().domain(result.vDomain).range([8,25]),
            rScale: d3.scaleLinear().domain(result.rDomain).range([5,18])};
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

    const continentLinks = [
      {source: 'Antarctica', target: 'Africa'},
      {source: 'Africa', target: 'Asia'},
      {source: 'Asia', target: 'Australia'},
      {source: 'Australia', target: 'Europe'},
      {source: 'Europe', target: 'North America'},
      {source: 'North America', target: 'South America'},
    ]

    return projectCityLinks.concat(cityContinentLinks).concat(continentLinks);
    // return d3.forceLink(projectCityLinks.concat(cityContinentLinks))
    //                     .id(function(d) { return d.title; })
  }

  drawLinks (svg, linksData) {
    return svg.append('g')
      .attr("class", "links")
      .selectAll("line")
      .data(linksData)
      .enter()
      .append("line")
      .attr("stroke-width", 2)
      .attr("stroke", "red");
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
