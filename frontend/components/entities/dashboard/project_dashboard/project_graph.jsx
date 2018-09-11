import React from 'react';
import * as d3 from 'd3';
import {event as currentEvent} from 'd3-selection';

 const margin = {top: 20, right: 20, bottom: 30, left: 50};
 const width = 960 - margin.left - margin.right;
 const height = 500 - margin.top - margin.bottom;

class ProjectGraph extends React.Component {
  constructor(props) {
    super(props);
    this.simulation = this.simulation.bind(this);
    this.setUp = this.setUp.bind(this);
    this.formatData = this.formatData.bind(this);
    this.addDragHandlers = this.addDragHandlers.bind(this);
    this.createSVG = this.createSVG.bind(this);
  }

  componentDidMount(){
    this.props.fetchProjects().then(() => {
      this.setUp();
    });
  }

  formatData(projectKeys) {
    const listData = (data) => {
      return Object.keys(data).map(title => {
        return data[title];
      });
    }

    const extractData = () => {
      return projectKeys.reduce((data, key) => {
        const city = this.props.data[key].city;
        const continent = this.props.data[key].continent;
        const cityData = {
          title: city,
          continent
        }
        const continentData = {
          title: continent
        }

        if (!data.cities[city]) {
          data.cities[city] = cityData;
        }
        if (!data.continents[continent]) {
          data.continents[continent] = continentData;
        }
        return data;
      }, {cities: {}, continents: {}});

    }

    const data = extractData();
    return {
      cities: listData(data.cities),
      continents: listData(data.continents)
    }
  }

  setUp () {
    const projectKeys = Object.keys(this.props.data);
    const svg = this.createSVG();

    const data = this.formatData(projectKeys);
    const projects = projectKeys.map(key => {
      return this.props.data[key];
    })
    const cities = data.cities;
    const continents = data.continents;
    const nodesData = projects.concat(continents).concat(cities);
    const linksData = this.formatLinks(projects, cities, continents);
    const scales = this.createDomainScales(projects);
    var shape = d3.scaleOrdinal(d3.symbols);
    debugger


    const simulation = this.simulation(nodesData, scales.vScale);
    const link = this.drawLinks(svg, linksData);
    const node = svg.selectAll(".node")
                    .data(nodesData)
                    .enter()
                    .append('g')
                    .attr("class", "node")
    const circle = node.append("circle")
    .attr("r", (d) => {
      if (d.valuation) {
        const val = scales.vScale(Number(d.valuation));
        return val;
      } else {
        return 10;
      }
    })
    .attr("fill", (d) => {
      if (!d.valuation){
        return !d.continent ? 'black' : '#263b6b';
      }
      else {
        return '#AA7A60';
      }
    })

    const innerCircle = node.append("circle")
    .attr("r", (d) => {
      if (d.revenue) {
        const val = scales.rScale(Number(d.revenue));
        return val;
      } else {
        return 10;
      }
    })
    .attr("fill", (d) => {
      if (!d.valuation){
        return !d.continent ? 'black' : '#263b6b';
      }
      else {
        return "black";
      }
    })

    const text = node.append("text")
    .attr("dx", (d) => {d.x})
    .attr("dy", (d) => {d.y})
    .style("font-size", "18px")
    .text((d) => d.title);
    // const circle = this.createCircles(svg, nodesData, scales.vScale, true);
    // const innerCircle = this.createCircles(svg, nodesData, scales.rScale, false);
    // const text = this.createText(svg, nodesData);
    const forceLinks = d3.forceLink(linksData)
                         .id(function(d) { return d.title; })
                         .distance(50);


    simulation.force("links", forceLinks);
    this.addDragHandlers( simulation,circle,innerCircle );
    simulation.on('tick', () => this.tickActions(circle, text, link, innerCircle, scales.vScale));
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
    drag_handler(innerCircle);
  }


  // createText(svg,nodesData) {
  //   return svg.append('g')
  //   .attr("class", "text")
  //   .selectAll('text')
  //   .data(nodesData)
  //   .enter()
  //   .append("text")
  //   .attr("dx", (d) => {d.x})
  //   .attr("dy", (d) => {d.y})
  //   .style("font-size", "18px")
  //   .text((d) => d.title);
  // }

  simulation (nodesData, rscale) {
    return d3.forceSimulation()
              .nodes(nodesData)
              .force("charge_force", d3.forceManyBody())
              .force("center_force", d3.forceCenter(width / 2, height / 2))
              .force("collide", d3.forceCollide(12).radius(function(d) {
                  if (d.valuation) {
                    return rscale(Number(d.valuation)) + 5;
                  } else {
                    return 10 + 20;
                  }
                }).strength(1).iterations(100));
  }

  tickActions(circle, text, link, innerCircle, scale) {
    circle
        .attr("cx", (d) => { return d.x; })
        .attr("cy", function(d) { return d.y; });
    innerCircle
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    text
        .attr("x", function(d) {
          if (d.valuation) {
            const radius= scale(d.valuation);
            return d.x + radius;
          }
          return d.x + 10;
        })
        .attr("y", function(d) { return d.y; })

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

  node (svg, nodesData) {
    return svg.append('g')
      .attr("class", "nodes")
      .selectAll(".nodes")
      .data(nodesData)
      .enter()
  }


  // createCircles(svg, nodesData, rscale, valuation) {
  //   return svg.append('g')
  //     .attr("class", "nodes")
  //     .selectAll(".nodes")
  //     .data(nodesData)
  //     .enter()
  //     .append("circle")
  //     .attr("r", (d) => {
  //       if (d.valuation) {
  //         const val = rscale(valuation ? Number(d.valuation) : Number(d.revenue));
  //         return val;
  //       } else {
  //         return 10;
  //       }
  //     })
  //     .attr("fill", (d) => {
  //       if (!d.valuation){
  //         return !d.continent ? 'black' : '#263b6b';
  //       }
  //       else {
  //         return valuation ? '#AA7A60' : "black";
  //       }
  //     })
  // }

  createDomainScales( projects ) {
    const minRevenue = d3.min(projects,(project)=>Number(project.revenue));
    const maxRevenue = d3.max(projects,(project)=>Number(project.revenue));
    const minValuation = d3.min(projects,(project)=>Number(project.valuation));
    const maxValuation = d3.max(projects,(project)=>Number(project.valuation));

    return {vScale: d3.scaleLinear().domain([minValuation,maxValuation]).range([8,25]),
            rScale: d3.scaleLinear().domain([minRevenue,maxRevenue]).range([5,18])};
  }

  formatLinks (projects, cities, continents) {
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

    const continentLinks = [];
    for (let i = 0; i < continents.length - 1;  i++) {
      continentLinks.push({
        source: continents[i].title,
        target: continents[i+1].title
      });
    }

    return projectCityLinks.concat(cityContinentLinks).concat(continentLinks);
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

export default ProjectGraph;
