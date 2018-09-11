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
    this.createCircles = this.createCircles.bind(this);
    this.simulation = this.simulation.bind(this);
    this.setUp = this.setUp.bind(this);
    this.addDragHandlers = this.addDragHandlers.bind(this);
    // this.handleMousemove = this.handleMousemove.bind(this);
    this.createSVG = this.createSVG.bind(this);
  }

  componentDidMount(){
    this.props.fetchProjects().then(() => {
      this.setUp();
    });
  }

  getUniqueCitites(projectKeys) {

    const cities = projectKeys.reduce((cities, key) => {
      const title = this.props.data[key].city;
      const data = {
        title,
        continent: this.props.data[key].continent
      };

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
    });
    const cities = this.getUniqueCitites(projectKeys);
    const continents = [{title: "Antarctica"}, {title: "Asia"}, {title: "Africa"}, {title: "Australia"},
     {title:"Europe"}, {title: "North America"}, {title:"South America"}];

     const faux = this.props.connectFauxDOM('div', 'chart');
     const svg = this.createSVG();
     const linksData = this.createLinks(projects, cities);
     const link = this.drawLinks(svg, linksData);
     const scales = this.createDomainScales(projects);
     const nodesData = projects.concat(continents).concat(cities);
     const simulation = this.simulation(nodesData);

     const nodes = this.createNodes(svg,nodesData);
     const circle = this.createCircles(nodes,scales.vScale, true);
     const innerCircle = this.createCircles(nodes, scales.rScale, false);
     const text = this.createText(nodes);

     const forceLinks = d3.forceLink(linksData)
                        .id(function(d) { return d.title; })
                        .distance(50);


    simulation.force("links", forceLinks);
    this.addDragHandlers( simulation,circle,innerCircle );
    simulation.on('tick', () => this.tickActions(circle,text,link, innerCircle,scales.vScale));
    this.props.animateFauxDOM(800);
  }

  addDragHandlers( simulation,circle,innerCircle ) {

    const drag_start = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }


    const drag_drag = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    const drag_end = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    const drag_handler = d3.drag()
    .on("start", drag_start)
    .on("drag", drag_drag)
    .on("end", drag_end);

    drag_handler(circle);
  }

  createText(nodes) {
    return nodes.append("text")
      .attr("x", (d)=>{
        return d.x;
      })
      .attr("y", (d)=>{
        return d.y;
      })
      .text((d) => d.title);
  }

  simulation (nodesData) {
    return d3.forceSimulation()
              .nodes(nodesData)
              .force("charge_force", d3.forceManyBody())
              .force("center_force", d3.forceCenter(width / 2, height / 2));
  }


  tickActions(circle,text, link, innerCircle,scale) {
    //update circle positions to reflect node updates on each tick of the simulation
    circle
        .attr("cx", (d) => { return d.x; })
        .attr("cy", function(d) { return d.y; });
    innerCircle
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    text
        .attr("x", function(d) {
          if(d.valuation) {
            const radius = scale(d.valuation);
            return d.x + radius;
          }else return d.x + 10;
        })
        .attr("y", function(d) { return d.y; });

    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
  }

  createSVG() {
    return d3.select("#graph").append('svg')
      .classed('project-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 700 500")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
  }

  createNodes(svg, nodesData) {
    return svg.selectAll("node")
      .data(nodesData)
      .enter()
      .append('g')
      .attr('class','node');
  }

  createCircles(nodes, rscale, valuation) {
    const circles = nodes.append("circle")
    .attr("r", (d) => {
      if (d && d.valuation) {
        const val = rscale(valuation ? Number(d.valuation) : Number(d.revenue));
        return val;
      } else {
        return 10;
      }
    })
    .attr("fill", (d) => {
      if (d && !d.valuation){
        return !d.continent ? 'black' : '#263b6b';
      }
      else {
        return valuation ? '#AA7A60' : "black";
      }
    });

    return circles;
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
      .attr("stroke", "black");
  }

  render() {
    let data = '';
    if (this.props.data) {
      data = Object.keys(this.props.data).map(key => {
        const project = this.props.data[key];
        return <li key={project.id}>{project.title} {project.created_at}</li>;
      });
    }

    return (
      <div className='graph-container'>
        <div className="series content graph" id='project'>
          <div id="graph"></div>
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
