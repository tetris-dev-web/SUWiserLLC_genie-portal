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
    this.createCircles = this.createCircles.bind(this);
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

     const rscale = this.createDomainScale(projects);
    const nodesData = projects.concat(continents).concat(cities);
    const faux = this.props.connectFauxDOM('div', 'chart')
    const simulation = this.simulation(nodesData);
    const svg = this.createSVG(faux);
    const linksData = this.createLinks(projects, cities);
    const circle = this.createCircles(svg, nodesData, rscale);
    const text = this.createText(svg,nodesData);
    const link = this.drawLinks(svg, linksData)
    const forceLinks = d3.forceLink(linksData)
                        .id(function(d) { return d.title; })


    simulation.force("links", forceLinks)
    simulation.on('tick', () => this.tickActions(circle, text, link));
    this.props.animateFauxDOM(800)
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

  tickActions(circle, text, link) {
    //update circle positions to reflect node updates on each tick of the simulation
    circle
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

  createCircles(svg, nodesData, rscale) {
    return svg.append('g')
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodesData)
      .enter()
      .append("circle")
      .attr("r", (d) => {
        if (d.valuation) {
          const val = rscale(Number(d.valuation));
          console.log(d.valuation)
          return val;
        } else {
          return 10;
        }
      })
      .attr("fill", "red");
  }

  createDomainScale( projects ) {
    const domain = projects.reduce((domain, project) => {
      const valuation = Number(project.valuation);

      if (!domain[0] || valuation < domain[0]) {
        domain[0] = valuation;
      }
      if (!domain[1] || valuation > domain[1]) {
        domain[1] = valuation;
      }

      return domain;
    }, [])

    return d3.scaleLinear().domain(domain).range([5,25]);
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
