import React from 'react';
import * as d3 from 'd3';
import {event as currentEvent} from 'd3-selection';

const margin = {top: 20, right: 20, bottom: 30, left: 50};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;
const citySquareSide = 23;
const continentSquareSide = 12;

class ProjectGraph extends React.Component {
  constructor(props) {
    super(props);
    this.simulation = this.simulation.bind(this);
    this.setUp = this.setUp.bind(this);
    this.formatData = this.formatData.bind(this);
    this.addDragHandlers = this.addDragHandlers.bind(this);
    this.createSVG = this.createSVG.bind(this);
    this.tickActions = this.tickActions.bind(this);
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
    };

    const extractData = () => {
      return projectKeys.reduce((data, key) => {
        const city = this.props.data[key].city;
        const continent = this.props.data[key].continent;
        const cityData = {
          title: city,
          continent
        };
        const continentData = {
          title: continent
        };

        if (!data.cities[city]) {
          data.cities[city] = cityData;
        }
        if (!data.continents[continent]) {
          data.continents[continent] = continentData;
        }
        return data;
      }, {cities: {}, continents: {}});

    };

    const data = extractData();
    return {
      cities: listData(data.cities),
      continents: listData(data.continents)
    };
  }

  setUp () {
    const projectKeys = Object.keys(this.props.data);
    const svg = this.createSVG();

    const data = this.formatData(projectKeys);
    const projects = projectKeys.map(key => {
      return this.props.data[key];
    });
    const cities = data.cities;
    const continents = data.continents;
    const circlesData = projects;
    const linksData = this.formatLinks(projects, cities, continents);
    const scales = this.createDomainScales(projects);
    const simulation = this.simulation(circlesData,continents,cities,scales.vScale);
    const link = this.drawLinks(svg, linksData);

    const node = svg.selectAll(".node")
                    .data(circlesData)
                    .enter()
                    .append('g')
                    .attr("class", "node");

    const cityNodes = svg.selectAll(".city")
                    .data(cities)
                    .enter()
                    .append('g')
                    .attr("class", "node");

    const continentNodes = svg.selectAll(".continent")
                    .data(continents)
                    .enter()
                    .append('g')
                    .attr("class", "node");

    const continentSquares = continentNodes.append('rect')
                    .attr("width",continentSquareSide)
                    .attr("height",continentSquareSide).style('fill','black')
                    .attr("rx", 3).attr("ry", 3);
    const citySquares = cityNodes.append('rect')
                    .attr("width",citySquareSide)
                    .attr("height",citySquareSide).style('fill','black')
                    .attr("rx", 3).attr("ry", 3);

    const that = this;
    const colorScale = this.createProjectColorScale();

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
      if (d.title === 'Corgi Hostel' || d.title === 'BeefInn') {
        return colorScale(100);
      }else if (d.title === "ChickInn" || d.title === "PorkInn") {
        return colorScale(50);
      }else {
        return colorScale(0);
      }
    }).on('click',(d)=>{
      that.props.openModal(d);
    }).on('mouseover', (d) => that.handleMouseOver(d,link,continentSquares,citySquares,circle))
    .on('mouseout',(d)=> that.handleMouseOut(d,link,continentSquares,citySquares,circle));

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
    });

    const circleText = this.createText(node);
    const continentText = this.createText(continentNodes);
    const cityText = this.createText(cityNodes);
    const forceLinks = d3.forceLink(linksData)
                         .id(function(d) { return d.title; })
                         .distance(60);

    simulation.force("links", forceLinks);
    this.addDragHandlers( simulation,circle,innerCircle,continentSquares,citySquares );
    simulation.on('tick', () => this.tickActions(circle, circleText,continentText,cityText, link, innerCircle, scales.vScale,continentSquares,citySquares));
  }

  createProjectColorScale(){
    return d3.scaleLinear()
     .domain([0,50,100])
     .range(["#BCC5C9","#263B6B","#AA7A60"]);
  }

  handleMouseOver(d,link,continentSquares,citySquares,projects) {
    projects.attr("opacity", (currProject) => {
      if( !(currProject === d) ){
        return 0.3;
      }
    });
    link.attr("opacity", 0.3);
    continentSquares.attr('opacity',0.3);
    citySquares.attr('opacity',0.3);
  }

  handleMouseOut(d,link,continentSquares,citySquares,projects) {
    projects.attr("opacity",1);
    link.attr("opacity", 1);
    continentSquares.attr('opacity',1);
    citySquares.attr('opacity',1);
  }

  createText(node) {
    return node.append("text")
    .style("font-size", "18px")
    .text((d) => {
      return d.title;
    });
  }

  addDragHandlers( simulation,circle,innerCircle,continentSquares,citySquares ) {
    const drag_start = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };


    const drag_drag = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const drag_end = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    const drag_handler = d3.drag()
    .on("start", drag_start)
    .on("drag", drag_drag)
    .on("end", drag_end);

    drag_handler(circle);
    drag_handler(innerCircle);
    drag_handler(continentSquares);
    drag_handler(citySquares);
  }


  simulation (nodesData,continentData,cityData, rscale) {
    const allData = nodesData.concat(continentData).concat(cityData);
    return d3.forceSimulation()
              .nodes(allData)
              .force("charge_force", d3.forceManyBody())
              .force("center_force", d3.forceCenter(width / 2, height / 2))
              .force("collide", d3.forceCollide(12).radius(function(d) {
                if (d.valuation) {
                    return rscale(Number(d.valuation)) + 5;
                  } else {
                    return 10 + 20;
                  }
                }).strength(0.5));
  }

  tickActions(circle, text,continentText,cityText, link, innerCircle, scale, continent,citySquares) {
    const that = this;
    circle
        .attr("cx", (d) => { return d.x; })
        .attr("cy", function(d) { return d.y; });
    innerCircle
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    text
        .attr("x", function(d) {
          const radius= scale(d.valuation);
          return d.x + radius;
        })
        .attr("y", function(d) { return d.y; });

    continentText
        .attr("x", function(d) {return d.x + 15; })
        .attr("y", function(d) { return d.y; });

    cityText
        .attr("x", function(d) {return d.x + 23; })
        .attr("y", function(d) { return d.y - 3; });

    link
        .attr("x1", function(d) {
          if(!d.source.valuation){
            // return d.source.x + 7.5;
            return that.computeSquareLinkEntryPts(d,true,true);
          }
          return d.source.x;
        })
        .attr("y1", function(d) {
          if(!d.source.valuation){
            return that.computeSquareLinkEntryPts(d,true,false);
          }
          return d.source.y;
        })
        .attr("x2", function(d) {
          if(!d.target.valuation){
            return that.computeSquareLinkEntryPts(d,false,true);
          }
          return d.target.x;
        })
        .attr("y2", function(d) {
          if(!d.target.valuation){
            return that.computeSquareLinkEntryPts(d,false,false);
          }
          return d.target.y;
        });

    continent
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
    citySquares
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
  }

  computeSquareLinkEntryPts( d,isSource,isX ){
    const object = isSource ? d.source : d.target;
    const startPt = isX ? object.x : object.y;
    if(object.continent){
      return startPt + citySquareSide/2;
    }
    return startPt + continentSquareSide/2;
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
      .enter();
  }

  createDomainScales( projects ) {
    const minValuation = d3.min(projects,(project)=>Number(project.valuation));
    const maxValuation = d3.max(projects,(project)=>Number(project.valuation));
    const minRevenue = d3.min(projects,(project)=>Number(project.revenue));
    const maxRevenue = d3.max(projects,(project)=>Number(project.revenue));
    return {vScale: d3.scaleLinear().domain([minValuation,maxValuation]).range([15,30]),
            rScale: d3.scaleLinear().domain([minRevenue,maxRevenue]).range([5,12])};

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
      };
    });

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

        </div>
      </div>
    );
  }
}

ProjectGraph.defaultProps = {
  chart: 'loading'
}

export default ProjectGraph;
