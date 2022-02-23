import React, { useEffect } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { merge } from "lodash";
import ProjectModules from "./../project_modals/project_modals";

const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;
const citySquareSide = 15;
const continentSquareSide = 5;

//colors - should import from util
const midNightBlue = "#073444";
const lightBlue = "#5EABAA";
const midNightBlack = "#061E24";
const rosyBrown = "#AB7A5E";
const lightGrey = "#DEDBCF";
const darkGrey = "#A59A91";

const mapStateToProps = (state) => {
  return {
    projects: merge({}, state.chain_data.projects),
    caspitalBeingRaised: state.entitis.capitalBeingRaised,
  };
};

const ProjectGraph = (props) => {
  const { projectsLoaded, fetchSharedProjectGraphData, projects } = props;

  let projectClicked = null;

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!projectsLoaded) {
      fetchSharedProjectGraphData().then(() => {
        setUp();
      });
    } else {
      setUp();
    }
  }, []);

  const toggleModalonClickandPassProject = (projectClicked) => {
    if (typeof projectClicked.cashflow === "string") {
      projectClicked.cashflow = JSON.parse(projectClicked.cashflow);
      projectClicked.actual_cashflow = JSON.parse(projectClicked.actual_cashflow);
      projectClicked.accum_projected_cashflow = JSON.parse(projectClicked.accum_projected_cashflow);
      projectClicked.accum_actual_cashflow = JSON.parse(projectClicked.accum_actual_cashflow);
      projectClicked.projected_cashflow = JSON.parse(projectClicked.projected_cashflow);
    }

    if (openModal === false) {
      projectClicked = projectClicked;
      setOpenModal(true);
    } else {
      projectClicked = null;
      setOpenModal(false);
    }
  };

  const formatData = (projectKeys) => {
    const listData = (data) => {
      return Object.keys(data).map((title) => {
        return data[title];
      });
    };

    const extractData = () => {
      return projectKeys.reduce(
        (_projectData, _key) => {
          const city = projects[_key].city;
          const continent = projects[_key].continent;
          const cityData = {
            title: city,
            continent,
          };
          const continentData = {
            title: continent,
          };

          if (!_projectData.cities[city]) {
            _projectData.cities[city] = cityData;
          }
          if (!_projectData.continents[continent]) {
            _projectData.continents[continent] = continentData;
          }
          return _projectData;
        },
        { cities: {}, continents: {} },
      );
    };

    const data = extractData();
    return {
      cities: listData(data.cities),
      continents: listData(data.continents),
    };
  };

  const setUp = () => {
    const projectKeys = Object.keys(projects);
    const svg = createSVG();

    const ProjectNodeData = formatData(projectKeys);
    const projectData = projectKeys.map((key) => {
      return projects[key];
    });
    const cities = ProjectNodeData.cities;
    const continents = ProjectNodeData.continents;
    const circlesData = projectData;
    const linksData = formatLinks(projectData, cities, continents);
    const scales = createDomainScales(projectData);
    const simulation = simulation(circlesData, continents, cities, scales.vScale);
    const link = drawLinks(svg, linksData);

    const node = svg.selectAll(".node").data(circlesData).enter().append("g").attr("class", "node");

    const cityNodes = svg.selectAll(".city").data(cities).enter().append("g").attr("class", "node");

    const continentNodes = svg
      .selectAll(".continent")
      .data(continents)
      .enter()
      .append("g")
      .attr("class", "node");

    const continentSquares = continentNodes
      .append("rect")
      .attr("width", continentSquareSide)
      .attr("height", continentSquareSide)
      .style("fill", lightGrey)
      .attr("rx", 3)
      .attr("ry", 3);

    const citySquares = cityNodes
      .append("rect")
      .attr("width", citySquareSide)
      .attr("height", citySquareSide)
      .style("fill", lightGrey)
      .attr("rx", 3)
      .attr("ry", 3);

    const colorScale = createProjectColorScale();

    const circle = node
      .append("circle")
      .attr("r", (d) => {
        if (d.valuation) {
          const val = scales.vScale(Number(d.valuation));
          return val;
        } else {
          return 10;
        }
      })
      .attr("fill", (d) => {
        if (d.status === "deployed") {
          return colorScale(100);
        } else if (d.status === "inDevelopment") {
          return colorScale(55);
        } else if (d.status === "pitched") {
          return colorScale(0);
        }
      })
      .on("click", (d) => {
        toggleModalonClickandPassProject(d);
      })
      .on("mouseover", (d) => handleMouseOver(d, link, continentSquares, citySquares, circle))
      .on("mouseout", (d) => handleMouseOut(d, link, continentSquares, citySquares, circle));

    const innerCircle = node
      .append("circle")
      .attr("r", (d) => {
        if (d.revenue) {
          const val = scales.rScale(Number(d.revenue));
          return val;
        } else {
          return 10;
        }
      })
      .attr("fill", (d) => {
        if (!d.valuation) {
          return !d.continent ? lightGrey : "#263b6b";
        } else {
          return lightGrey;
        }
      })
      .on("mouseover", (d) => handleMouseOver(d, link, continentSquares, citySquares, circle))
      .on("mouseout", (d) => handleMouseOut(d, link, continentSquares, citySquares, circle));

    const circleText = createText(node);
    const continentText = createText(continentNodes);
    const cityText = createText(cityNodes);
    const forceLinks = d3
      .forceLink(linksData)
      .id(function (d) {
        return d.title;
      })
      .distance(50);

    simulation.force("links", forceLinks);
    addDragHandlers(simulation, circle, innerCircle, continentSquares, citySquares);
    simulation.on("tick", () =>
      tickActions(
        circle,
        circleText,
        continentText,
        cityText,
        link,
        innerCircle,
        scales.vScale,
        continentSquares,
        citySquares,
      ),
    );
  };

  const createProjectColorScale = () => {
    return d3.scaleLinear().domain([0, 100]).range([rosyBrown, lightBlue]);
  };

  const handleMouseOver = (d, link, continentSquares, citySquares, projects) => {
    projects.attr("opacity", (currProject) => {
      if (!(currProject === d)) {
        return 0.3;
      }
    });
    link.attr("opacity", 0.3);
    continentSquares.attr("opacity", 0.3);
    citySquares.attr("opacity", 0.3);
  };

  const handleMouseOut = (d, link, continentSquares, citySquares, projects) => {
    projects.attr("opacity", 1);
    link.attr("opacity", 1);
    continentSquares.attr("opacity", 1);
    citySquares.attr("opacity", 1);
  };

  const createText = (node) => {
    return node
      .append("text")
      .style("font-size", "12px")
      .text((d) => {
        return d.title;
      });
  };

  const addDragHandlers = (simulation, circle, innerCircle, continentSquares, citySquares) => {
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

    const drag_handler = d3
      .drag()
      .on("start", drag_start)
      .on("drag", drag_drag)
      .on("end", drag_end);

    drag_handler(circle);
    drag_handler(innerCircle);
    drag_handler(continentSquares);
    drag_handler(citySquares);
  };

  const simulation = (nodesData, continentData, cityData, rscale) => {
    const allData = nodesData.concat(continentData).concat(cityData);
    return d3
      .forceSimulation()
      .nodes(allData)
      .force("charge_force", d3.forceManyBody())
      .force("center_force", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3
          .forceCollide(50)
          .radius(function (d) {
            if (d.valuation) {
              return rscale(Number(d.valuation)) + 5;
            } else {
              return 10 + 20;
            }
          })
          .strength(2),
      );
  };

  const tickActions = (
    circle,
    text,
    continentText,
    cityText,
    link,
    innerCircle,
    scale,
    continent,
    citySquares,
  ) => {
    circle
      .attr("cx", (d) => {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      });
    innerCircle
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      });
    text
      .attr("x", function (d) {
        const radius = scale(d.valuation);
        return d.x + radius;
      })
      .attr("y", function (d) {
        return d.y;
      });

    continentText
      .attr("x", function (d) {
        return d.x + 15;
      })
      .attr("y", function (d) {
        return d.y;
      });

    cityText
      .attr("x", function (d) {
        return d.x + 23;
      })
      .attr("y", function (d) {
        return d.y - 3;
      });

    link
      .attr("x1", function (d) {
        if (!d.source.valuation) {
          // return d.source.x + 7.5;
          return computeSquareLinkEntryPts(d, true, true);
        }
        return d.source.x;
      })
      .attr("y1", function (d) {
        if (!d.source.valuation) {
          return computeSquareLinkEntryPts(d, true, false);
        }
        return d.source.y;
      })
      .attr("x2", function (d) {
        if (!d.target.valuation) {
          return computeSquareLinkEntryPts(d, false, true);
        }
        return d.target.x;
      })
      .attr("y2", function (d) {
        if (!d.target.valuation) {
          return computeSquareLinkEntryPts(d, false, false);
        }
        return d.target.y;
      });

    continent
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y;
      });
    citySquares
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y;
      });
  };

  const computeSquareLinkEntryPts = (d, isSource, isX) => {
    const object = isSource ? d.source : d.target;
    const startPt = isX ? object.x : object.y;
    if (object.continent) {
      return startPt + citySquareSide / 2;
    }
    return startPt + continentSquareSide / 2;
  };

  const createSVG = () => {
    return d3
      .select("#graph")
      .append("svg")
      .classed("project-svg", true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 700 500")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
  };

  const node = (svg, nodesData) => {
    return svg.append("g").attr("class", "nodes").selectAll(".nodes").data(nodesData).enter();
  };

  const createDomainScales = (projects) => {
    const minValuation = d3.min(projects, (project) => Number(project.valuation));
    const maxValuation = d3.max(projects, (project) => Number(project.valuation));
    const minRevenue = d3.min(projects, (project) => Number(project.revenue));
    const maxRevenue = d3.max(projects, (project) => Number(project.revenue));
    return {
      vScale: d3.scaleLinear().domain([minValuation, maxValuation]).range([15, 30]),
      rScale: d3.scaleLinear().domain([minRevenue, maxRevenue]).range([5, 12]),
    };
  };

  const formatLinks = (projects, cities, continents) => {
    const projectCityLinks = projects.map((project) => {
      return {
        source: project.title,
        target: project.city,
      };
    });

    const cityContinentLinks = cities.map((city) => {
      return {
        source: city.title,
        target: city.continent,
      };
    });

    const continentLinks = [];
    for (let i = 0; i < continents.length - 1; i++) {
      continentLinks.push({
        source: continents[i].title,
        target: continents[i + 1].title,
      });
    }

    return projectCityLinks.concat(cityContinentLinks).concat(continentLinks);
  };

  const drawLinks = (svg, linksData) => {
    return svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(linksData)
      .enter()
      .append("line")
      .attr("stroke-width", 0.5)
      .attr("stroke", lightGrey);
  };

  // let data = '';
  // if (projects) {
  //   data = Object.keys(projects).map(key => {
  //     const project = projects[key];
  //     return <li key={project.id}>{project.title} {project.created_at}</li>;
  //   });
  //
  return (
    <React.Fragment>
      <div className="series content graph" id="project">
        <div id="graph"></div>
      </div>
      <ProjectModules
        projectClicked={projectClicked}
        openModal={openModal}
        closeModalOnClick={toggleModalonClickandPassProject}
      />
    </React.Fragment>
  );
};

ProjectGraph.defaultProps = {
  chart: "loading",
};

export default connect(mapStateToProps)(ProjectGraph);
