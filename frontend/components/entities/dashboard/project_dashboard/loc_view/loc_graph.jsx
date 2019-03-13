import React from 'react';
import * as d3 from 'd3';
import './loc_graph.scss';
import LocGraphRect from './loc_graph_rect';
import LocGraphCircle from './loc_graph_circle';
import NorthAmerica from '../../../../../assets/NorthAmerica.png';
import { getLocationGraphData } from '../../../../../util/location_util';
console.log("n", NorthAmerica)
const rosyBrown = "#AB7A5E";
const lightBlue = "#5EABAA";

class LocGraph extends React.Component {
  constructor(props) {
    super(props);

    this.width = 960;
    this.height = 700;
    this.cityNodeSide = 15;
    this.continentNodeSide = 8;
    this.simulation = this.configureSimulation(this.props);
  }

  componentDidMount() {
    this.addDragHandlers();
    this.simulation.on("tick", () => {
      this.forceUpdate();
      // bypass shouldComponentUpdate
    });
    getLocationGraphData(this.props.projects).then(data => {
      console.log("data",data)
      console.log('props', this.props)
    });

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { projects, cities, continents, linksData, center } = nextProps;

    this.simulation.nodes(projects.concat(continents).concat(cities).concat([center]))
      .force("link", d3.forceLink(linksData).distance(20));
    this.simulation.alpha(1).restart();
  }

  componentDidUpdate() {
    this.addDragHandlers();
  }

  configureSimulation(props) {
    const { projects, cities, continents, linksData, center } = props;

    center.fx = this.width / 2;
    center.fy = this.height / 2;
    center.x = this.width / 2;
    center.y = this.height / 2;

    return d3.forceSimulation()
      .nodes(projects.concat(continents).concat(cities).concat([center]))
      .force("charge", d3.forceManyBody().strength(-50))
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))
      // .force("radial", d3.forceRadial().radius(50).x(this.width / 2).y(this.height / 2))
      .force("collide", d3.forceCollide().radius(d => {
        if (d.fixed) {
          // center node
          return 20;
        } else if (d.valuation) {
          // project node
          return 30;
        } else if (d.continent) {
          // city node
          return 40;
        } else {
          // continent node
          return 50;
        }
      }))
      .force("link", d3.forceLink(linksData).distance(20));
  }

  createScales() {
    const { allProjectsValuationMinMax } = this.props;
    return {
      outterCircleScale: d3.scaleLinear()
        .domain(allProjectsValuationMinMax)
        .range([15, 30]),
      // innerCircleScale: d3.scaleLinear()
      //   .domain(should be revenue)
      //   .range([15, 30]),
    };
  }

  addDragHandlers() {
    const { projects, cities, continents } = this.props;

    const dragStart = (d) => {
      if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragging = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragEnd = (d) => {
      if (!d3.event.active) this.simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    const handleDrag = d3.drag()
      .on("start", dragStart)
      .on("drag", dragging)
      .on("end", dragEnd);

    handleDrag(d3.selectAll(".loc-svg-city-node").data(cities));
    handleDrag(d3.selectAll(".loc-svg-continent-node").data(continents));
    handleDrag(d3.selectAll(".loc-svg-project-node-group").data(projects));
  }

  render() {
    const { projects, cities, continents, linksData } = this.props;
    const { outterCircleScale } = this.createScales();
    const links = linksData.map((link, idx) => (
      <line key={idx}
        className={`loc-svg-link ${link.source.fixed ? "invisible" : ""}`}
        x1={link.source.x} x2={link.target.x}
        y1={link.source.y} y2={link.target.y} ></line>
    ));

    const cityNodes = cities.map((city, idx) => (
      <LocGraphRect key={idx}
        className="loc-svg-city-node"
        transform={`translate(${city.x - .5 * this.cityNodeSide}, ${city.y - .5 * this.cityNodeSide})`}
        text={city.name} />
    ));

    const continentImages = {
      "North America": NorthAmerica,
      "South America": NorthAmerica,
      "Africa": NorthAmerica,
      "Europe": NorthAmerica,
      "Asia": NorthAmerica
    }
  
    const continentNodes = continents.map((continent, idx) => {
      return (
        <g
          key={idx}
          transform={`translate(${continent.x - .5 * this.continentNodeSide - 30}, ${continent.y - .5 * this.continentNodeSide - 30})`}>
          <image className="loc-svg-continent-node" href={continentImages[continent.name]}/>
        </g>
      );
    })

    const projectNodes = projects.map((project, idx) => (
      <LocGraphCircle key={idx}
        className="loc-svg-project-node"
        transform={`translate(${project.x}, ${project.y})`}
        project={project}
        r={outterCircleScale(project.valuation)}
        fill={project.activationTime ? lightBlue : rosyBrown} />
    ));

    return (
      <div className="loc-graph">
        <svg className="loc-svg"
          preserveAspectRatio="xMinYMin meet"
          viewBox="0 0 960 700">
          <g>{links}</g>
          <g>{cityNodes}</g>
          <g>{continentNodes}</g>
          <g>{projectNodes}</g>
        </svg>
      </div>
    );
  }
}

export default LocGraph;
