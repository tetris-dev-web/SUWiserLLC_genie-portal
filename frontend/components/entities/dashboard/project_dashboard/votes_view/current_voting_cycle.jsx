import React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import VoteShiftTool from "./vote_shift_tool";
import { merge } from "lodash";

const VotesView2 = (props) => {
  const { maxValuation, capitalRaised, scalingConstant } = props;

  const [state, setState] = React.useState({
    showVoteShiftTool: false,
    selectedProject: null,
  });

  let svg;

  useEffect(() => {
    svg = d3
      .select(".votes-view")
      .append("svg")
      .classed("votes-view-svg", true)
      .attr("width", "100%")
      .attr("height", maxValuation / scalingConstant);

    svg
      .append("g")
      .append("rect")
      .classed("current-cycle-capital", true)
      .attr("width", "100%")
      .attr("height", capitalRaised / scalingConstant)
      .attr("fill", "#aa7a60")
      .style("opacity", 0.5);

    svg
      .append("text")
      .text(() => {
        return this.formatNumber(capitalRaised);
      })
      .style("fill", "#fff")
      .style("font-size", "18px")
      .style("text-anchor", "start")
      .attr("x", "4%")
      .attr("y", "30%");

    svg
      .append("text")
      .text("capital being")
      .style("fill", "#fff")
      .style("font-size", "18px")
      // .style('text-anchor', 'end')
      .attr("x", "90%")
      .attr("y", "40%")
      .append("tspan")
      .text("raised")
      .attr("dy", "1.2em")
      // .attr('text-anchor', 'middle')
      .attr("dx", "-3em")
      .style("fill", "#fff")
      .style("font-size", "18px")
      // .attr('x', '90%')
      // .attr('y', '40%')
      .text("raised");

    setUp();
  }, [props]);

  const formatNumber = (number) => {
    return `$ ${Number(number / 1000.0).toLocaleString()} k`;
  };

  const setUp = () => {
    const projects = processProjectData();

    const valuationRect = svg.selectAll(".valuation-rect").remove();
    valuationRect
      .data(projects)
      .enter()
      .append("rect")
      .attr("class", "valuation-rect")
      .attr("width", (project) => `${project.projectWidth}%`)
      .attr("height", (project) => project.projectValutionHeight)
      .attr("fill", (project) => project.fill)
      .attr("x", (project) => `${project.projectStartX}%`)
      .attr("y", (project) => project.projectValutionStartY)
      .attr("opacity", 0.3)
      // .style("stroke", "white")
      // .style("stroke-width", 2)
      .on("mouseover", handleMouseOver())
      .on("mouseout", handleMouseOut())
      .on("click", handleClick);

    const capRequiredRect = svg.selectAll(".capital-required-rect").remove();
    capRequiredRect
      .data(projects)
      .enter()
      .append("rect")
      .attr("class", "capital-required-rect")
      .attr("width", (project) => `${project.projectWidth}%`)
      .attr("height", (project) => project.projectCapitalRequiredHeight)
      .attr("fill", (project) => project.fill)
      .attr("x", (project) => `${project.projectStartX}%`)
      .attr("y", (project) => project.projectCapitalRequiredStartY)
      .attr("opacity", 1)
      // .style("stroke", "white")
      // .style("stroke-width", 2)
      .on("mouseover", handleMouseOver())
      .on("mouseout", handleMouseOut())
      .on("click", handleClick);

    const votePercentageRect = svg.selectAll(".vote-percentage-rect").remove();
    votePercentageRect
      .data(projects)
      .enter()
      .append("rect")
      .attr("class", "vote-percentage-rect")
      .attr("width", (project) => `${project.projectWidth + 1}%`)
      .attr("height", 30)
      .attr("fill", (project) => project.fill)
      .attr("x", (project) => `${project.projectStartX - 0.5}%`)
      .attr("y", capitalRaised / props.scalingConstant);
    // .style("stroke", "white")
    // .style("stroke-width", 2);

    const votePercentageText = svg.selectAll(".vote-percentage-text").remove();
    votePercentageText
      .data(projects)
      .enter()
      .append("text")
      .attr("class", "vote-percentage-text")
      .attr("x", (project) => `${project.projectRectCenter}%`)
      .attr("y", capitalRaised / props.scalingConstant + 20)
      .style("font-size", "18px")
      .style("fill", "#fff")
      .style("text-anchor", "middle")
      .text((project) => `${project.voteShare * 100}%`);
  };

  const processProjectData = () => {
    const { pitchedProjects } = props;
    const numberOfProjects = pitchedProjects.length;
    const percentOfScreen = 60;
    const projectWidthPercentage = percentOfScreen - (numberOfProjects - 1);
    let projectStartX = 20;

    return pitchedProjects.map((project) => {
      const projectWidth = project.voteShare * projectWidthPercentage;
      const newProject = Object.assign({}, project, {
        projectStartX,
        projectWidth,
        fill: capitalRaised < project.capitalRequired ? "#aa7a60" : "#61aba9",
        projectValutionHeight: (project.valuation - project.capitalRequired) / scalingConstant,
        projectValutionStartY: (capitalRaised - project.valuation) / scalingConstant,
        projectCapitalRequiredHeight: project.capitalRequired / scalingConstant,
        projectCapitalRequiredStartY: (capitalRaised - project.capitalRequired) / scalingConstant,
        projectRectCenter: projectStartX + projectWidth / 2,
      });
      projectStartX += 1 + projectWidth;
      return newProject;
    });
  };

  const handleMouseOver = () => {
    const appendTextToRect = (textContent, textFill, textSize, textX, textY) => {
      svg
        .append("text")
        .attr("class", "rect-text")
        .attr("x", textX)
        .attr("y", textY)
        .attr("pointer-events", "none")
        .style("font-size", textSize)
        .style("fill", textFill)
        .style("text-anchor", "middle")
        .text(textContent);
    };

    const appendOutLines = (outlineX, outlineY, outlineWidth, outlineHeight) => {
      svg
        .append("rect")
        .attr("class", "rect-outline")
        .attr("x", outlineX)
        .attr("y", outlineY)
        .attr("width", outlineWidth)
        .attr("height", outlineHeight)
        .style("fill", "#fff");
    };

    return (project) => {
      appendTextToRect(
        project.valuation,
        project.fill,
        "12px",
        `${project.projectRectCenter}%`,
        project.projectValutionStartY + 15,
      );
      appendTextToRect(
        project.capitalRequired,
        "white",
        "12px",
        `${project.projectRectCenter}%`,
        project.projectCapitalRequiredStartY + 15,
      );
      appendTextToRect(
        "valution",
        project.fill,
        "12px",
        `${project.projectRectCenter}%`,
        project.projectValutionStartY - 7,
      );
      appendTextToRect(
        "capital needs",
        "white",
        "12px",
        `${project.projectRectCenter}%`,
        project.projectCapitalRequiredStartY - 7,
      );
      appendTextToRect(
        project.title,
        "#aa7a60",
        "15px",
        `${project.projectRectCenter}%`,
        (-(maxValuation - capitalRaised) / scalingConstant) * 1.5,
      );
      appendOutLines(
        `${project.projectStartX}%`,
        project.projectValutionStartY,
        `${project.projectWidth}%`,
        2,
      );
      appendOutLines(
        `${project.projectStartX + project.projectWidth}%`,
        project.projectValutionStartY,
        2,
        project.valuation / scalingConstant,
      );
      appendOutLines(
        `${project.projectStartX + project.projectWidth}%`,
        capitalRaised / scalingConstant,
        "0.5%",
        2,
      );
      appendOutLines(
        `${project.projectStartX + project.projectWidth + 0.5}%`,
        capitalRaised / scalingConstant,
        2,
        30,
      );
      appendOutLines(
        `${project.projectStartX - 0.5}%`,
        capitalRaised / scalingConstant + 28,
        `${project.projectWidth + 1}%`,
        2,
      );
      appendOutLines(`${project.projectStartX - 0.5}%`, capitalRaised / scalingConstant, 2, 30);
      appendOutLines(`${project.projectStartX - 0.5}%`, capitalRaised / scalingConstant, "0.5%", 2);
      appendOutLines(
        `${project.projectStartX}%`,
        project.projectValutionStartY + 2,
        2,
        project.valuation / scalingConstant,
      );
    };
  };

  const handleMouseOut = () => {
    return () => {
      d3.selectAll(".rect-text").remove();
      d3.selectAll(".rect-outline").remove();
    };
  };

  const handleClick = (project) => {
    const { showVoteShiftTool } = state;
    if (showVoteShiftTool) {
      setState(
        merge({}, state, {
          showVoteShiftTool: !showVoteShiftTool,
          selectedProject: null,
        }),
      );
    } else {
      setState(
        merge({}, state, {
          showVoteShiftTool: !showVoteShiftTool,
          selectedProject: project,
        }),
      );
    }
  };

  return (
    <div
      className="votes-view"
      style={{ marginTop: ((maxValuation - capitalRaised) / scalingConstant) * 2 }}
    >
      {state.showVoteShiftTool && <VoteShiftTool project={state.selectedProject} />}
    </div>
  );
};

//CONTAINER

//is this data being used?
//
// const mapStateToProps = state => {
//     return ({
//       pitchedProjects: [
//         {
//           valuation: 5000000,
//           capitalRequired: 3500000,
//           voteShare: .15,
//           title: "Ryan and Liam"
//         },
//         {
//           valuation: 2000000,
//           capitalRequired: 1500000,
//           voteShare: .15,
//           title: "Liam and Ryan"
//         },
//         {
//           valuation: 4000000,
//           capitalRequired: 2500000,
//           voteShare: .20,
//           title: "HamInn"
//         },
//         {
//           valuation: 5000000,
//           capitalRequired: 4000000,
//           voteShare: .30,
//           title: "Genesis"
//         },
//         {
//           valuation: 3500000,
//           capitalRequired: 2000000,
//           voteShare: .20,
//           title: "Penn Generator"
//         },
//       ].sort((a,b) => b.voteShare - a.voteShare),
//       maxValuation: 5000000,
//       capitalRaised: 3000000
//     });
// };

export default VotesView2;
