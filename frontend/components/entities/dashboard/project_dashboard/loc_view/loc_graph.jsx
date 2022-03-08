import React, { useState, useRef, useEffect, useReducer } from "react";
import * as d3 from "d3";
import "./loc_graph.scss";
import LocGraphRect from "./loc_graph_rect";
import LocGraphCircle from "./loc_graph_circle";
import NorthAmerica from "../../../../../assets/NorthAmerica.png";
import { getLocationGraphData } from "../../../../../util/location_util";
import Loader from "../../loader/loader";
import { merge } from "lodash";
const rosyBrown = "#AB7A5E";
const lightBlue = "#5EABAA";

const LocGraph = (props) => {
  const [state, setState] = React.useState({
    projectCities: null,
    cities: null,
    continents: null,
    data: null,
    center: null,
    projects: null,
  });
  const width = 960;
  const height = 700;
  const cityNodeSide = 15;
  const continentNodeSide = 8;

  const { projectsLoaded, fetchSharedProjectGraphData } = props;

  // const prevState = useRef(state).current;
  let prevState = {
    projectCities: null,
    cities: null,
    continents: null,
    data: null,
    center: null,
    projects: null,
  };

  let simulation;

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // console.log('prevState Now:',prevState);

  const populateState = async (props) => {
    // console.log('popluateState', props, "Type of ", typeof props.projects);
    if (props !== undefined) {
      const projects2 = Object.values(props.projects);
      const { projects, cities, continents, data, center } = await getLocationGraphData(projects2);

      const newState = merge({}, state, {
        projects: projects,
        cities,
        continents,
        data,
        center,
      });
      console.log("newState=", newState);
      setState(newState);
    }
  };

  useEffect(() => {
    console.log("projectsLoaded = ", projectsLoaded);
    if (projectsLoaded) {
      populateState(props);
    } else {
      fetchSharedProjectGraphData().then((props) => {
        populateState(props);
      });
    }
    return removeDragHandlers();
  }, []);
  //
  useEffect(() => {
    if (state.data) {
      addDragHandlers();
      simulation = configureSimulation.bind(null, props)();
      console.log("configSimulation=", simulation);
      // addDragHandlers();
      simulation.on("tick", () => {
        forceUpdate();
      });
    }
  }, [state.data, props]);

  useEffect(() => {
    if (simulation !== undefined) {
      simulation
        .nodes(state.projects.concat(continents).concat(state.cities).concat([state.center]))
        .force("link", d3.forceLink(state.data).distance(20));
      simulation.alpha(1).restart();
    }
  }, [state.projects, state.cities, state.data]);

  // useEffect(()=>{
  //     addDragHandlers();
  //     const { data, projects, cities, continents, center } = state;
  //     // console.log('state or props changed ');
  //   if ((!prevState.data && data) || prevState.data !== data) {
  //     simulation = configureSimulation.bind(null, props)();
  //     console.log('configSimulation=', simulation);
  //     addDragHandlers();
  //     simulation.on("tick", () => {
  //       forceUpdate();
  //     });
  //   }

  //   if (
  //     prevState.projects !== projects ||
  //     prevState.cities !== cities ||
  //     prevState.data !== data
  //   ) {
  //     console.log('Kuangkuo=', simulation);
  //     console.log('prevState=', prevState, 'state=', state);
  //     simulation.nodes(projects.concat(continents).concat(cities).concat([center]))
  //       .force("link", d3.forceLink(data).distance(20));
  //     simulation.alpha(1).restart();
  //   }
  //   prevState = state;
  //   console.log('prevState upgraded:',prevState);
  // },[state, props])

  const configureSimulation = (props) => {
    const { data, projects, cities, continents, linksData, center } = state;
    // const { projects, cities, continents, center } = props;

    center.fx = width / 2;
    center.fy = height / 2;
    center.x = width / 2;
    center.y = height / 2;

    return (
      d3
        .forceSimulation()
        .nodes(projects.concat(continents).concat(cities).concat([center]))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("center", d3.forceCenter(width / 2, height / 2))
        // .force("radial", d3.forceRadial().radius(50).x(this.width / 2).y(this.height / 2))
        .force(
          "collide",
          d3.forceCollide().radius((d) => {
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
          }),
        )
        .force("link", d3.forceLink(data).distance(20))
    );
  };

  const createScales = () => {
    const { allProjectsValuationMinMax } = props;
    return {
      outterCircleScale: d3.scaleLinear().domain(allProjectsValuationMinMax).range([15, 30]),
    };
  };
  const removeDragHandlers = () => {
    d3.drag().on("drag", null);
  };

  const addDragHandlers = () => {
    const { projects, cities, continents } = state;

    if (projects && cities && continents) {
      const dragStart = (d) => {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      };

      const dragging = (d) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      };

      const dragEnd = (d) => {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      };

      const handleDrag = d3.drag().on("start", dragStart).on("drag", dragging).on("end", dragEnd);

      handleDrag(d3.selectAll(".loc-svg-city-node").data(cities));
      handleDrag(d3.selectAll(".loc-svg-continent-node").data(continents));
      handleDrag(d3.selectAll(".loc-svg-project-node-group").data(projects));
    }
  };

  const { data, projects, cities, continents } = state;
  if (data) {
    // const { projects, cities, continents, linksData } = this.props;
    const { outterCircleScale } = createScales();
    const links = data.map((link, idx) => (
      <line
        key={idx}
        className={`loc-svg-link ${link.source.fixed ? "invisible" : ""}`}
        x1={link.source.x}
        x2={link.target.x}
        y1={link.source.y}
        y2={link.target.y}
      ></line>
    ));

    const cityNodes = cities.map((city, idx) => (
      <LocGraphRect
        key={idx}
        className="loc-svg-city-node"
        transform={`translate(${city.x - 0.5 * cityNodeSide}, ${city.y - 0.5 * cityNodeSide})`}
        text={city.name}
      />
    ));

    const continentImages = {
      "North America": NorthAmerica,
      "South America": NorthAmerica,
      Africa: NorthAmerica,
      Europe: NorthAmerica,
      Asia: NorthAmerica,
    };

    const continentNodes = continents.map((continent, idx) => {
      return (
        <g
          key={idx}
          transform={`translate(${continent.x - 0.5 * continentNodeSide - 30}, ${
            continent.y - 0.5 * continentNodeSide - 30
          })`}
        >
          <image className="loc-svg-continent-node" href={continentImages[continent.name]} />
        </g>
      );
    });

    const projectNodes = projects.map((project, idx) => (
      <LocGraphCircle
        key={idx}
        className="loc-svg-project-node"
        transform={`translate(${project.x}, ${project.y})`}
        project={project}
        r={outterCircleScale(project.valuation)}
        fill={project.activationTime ? lightBlue : rosyBrown}
      />
    ));

    return (
      <div className="loc-graph">
        <svg className="loc-svg" preserveAspectRatio="xMinYMin meet" viewBox="0 100 1000 550">
          <g>{links}</g>
          <g>{cityNodes}</g>
          <g>{continentNodes}</g>
          <g>{projectNodes}</g>
        </svg>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default LocGraph;
