import React from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import VoteShiftTool from './vote_shift_tool';

class VotesView2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showVoteShiftTool: false,
      selectedProject: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    // needs a lifecycle method when props is changed
  }

  componentDidMount(){
    const { maxValuation, capitalRaised } = this.props;
    this.svg = d3.select(".votes-view")
      .append("svg")
      .classed("votes-view-svg", true)
      .attr("width", "100%")
      .attr("height", maxValuation/this.props.scalingConstant);

    this.svg.append("g")
      .append("rect")
      .classed("current-cycle-capital", true)
      .attr("width", "100%")
      .attr("height", capitalRaised / this.props.scalingConstant)
      .attr("fill", "#aa7a60")
      .style("opacity", .5);

      this.svg.append('text')
      .text(() => {
        return this.formatNumber(capitalRaised);
      })
      .style('fill', '#fff')
      .style('font-size', '18px')
      .style('text-anchor', 'start')
      .attr('x', '4%')
      .attr('y', '30%');

      this.svg.append('text')
      .text("capital being")
      .style('fill', '#fff')
      .style('font-size', '18px')
      // .style('text-anchor', 'end')
      .attr('x', '90%')
      .attr('y', '40%')
      .append('tspan')
      .text('raised')
      .attr('dy', '1.2em')
      // .attr('text-anchor', 'middle')
      .attr('dx', '-3em')
      .style('fill', '#fff')
      .style('font-size', '18px')
      // .attr('x', '90%')
      // .attr('y', '40%')
      .text('raised');


    this.setUp();
  }

  formatNumber(number){
    return `$ ${Number(number/1000.0).toLocaleString()} k`;
  }

  setUp(){
    const { capitalRaised } = this.props;
    const projects = this.processProjectData();

    const valuationRect = this.svg.selectAll(".valuation-rect").remove();
    valuationRect.data(projects)
      .enter()
      .append("rect")
      .attr("class", "valuation-rect")
      .attr("width", project => `${project.projectWidth}%`)
      .attr("height", project => project.projectValutionHeight)
      .attr("fill", project => project.fill)
      .attr("x", project => `${project.projectStartX}%`)
      .attr("y", project => project.projectValutionStartY)
      .attr("opacity", .3)
      // .style("stroke", "white")
      // .style("stroke-width", 2)
      .on("mouseover", this.handleMouseOver())
      .on("mouseout", this.handleMouseOut())
      .on("click", this.handleClick);

    const capRequiredRect = this.svg.selectAll(".capital-required-rect").remove();
    capRequiredRect.data(projects)
      .enter()
      .append("rect")
      .attr("class", "capital-required-rect")
      .attr("width", project => `${project.projectWidth}%`)
      .attr("height", project => project.projectCapitalRequiredHeight)
      .attr("fill", project => project.fill)
      .attr("x", project => `${project.projectStartX}%`)
      .attr("y", project => project.projectCapitalRequiredStartY)
      .attr("opacity", 1)
      // .style("stroke", "white")
      // .style("stroke-width", 2)
      .on("mouseover", this.handleMouseOver())
      .on("mouseout", this.handleMouseOut())
      .on("click", this.handleClick);

    const votePercentageRect = this.svg.selectAll(".vote-percentage-rect").remove();
    votePercentageRect.data(projects)
      .enter()
      .append("rect")
      .attr("class", "vote-percentage-rect")
      .attr("width", project => `${project.projectWidth + 1}%`)
      .attr("height", 30)
      .attr("fill", project => project.fill)
      .attr("x", project => `${project.projectStartX - .5}%`)
      .attr("y", capitalRaised / this.props.scalingConstant);
      // .style("stroke", "white")
      // .style("stroke-width", 2);

    const votePercentageText = this.svg.selectAll(".vote-percentage-text").remove();
    votePercentageText.data(projects)
      .enter()
      .append("text")
      .attr("class", "vote-percentage-text")
      .attr("x", project => `${project.projectRectCenter}%`)
      .attr("y", capitalRaised / this.props.scalingConstant + 20)
      .style("font-size", "18px")
      .style("fill", "#fff")
      .style("text-anchor", "middle")
      .text(project => `${project.voteShare * 100}%`);
  }

  processProjectData(){
    const { capitalRaised, pitchedProjects } = this.props;
    const numberOfProjects = this.props.pitchedProjects.length;
    const percentOfScreen = 60;
    const projectWidthPercentage = percentOfScreen - (numberOfProjects - 1);
    let projectStartX = 20;

    return pitchedProjects.map(project => {
      const projectWidth = project.voteShare * projectWidthPercentage;
      const newProject = Object.assign({}, project, {
        projectStartX,
        projectWidth,
        fill: capitalRaised < project.capitalRequired ? "#aa7a60" : "#61aba9",
        projectValutionHeight: (project.valuation - project.capitalRequired) / this.props.scalingConstant,
        projectValutionStartY: (capitalRaised - project.valuation) / this.props.scalingConstant,
        projectCapitalRequiredHeight: project.capitalRequired / this.props.scalingConstant,
        projectCapitalRequiredStartY: (capitalRaised - project.capitalRequired) / this.props.scalingConstant,
        projectRectCenter: projectStartX + projectWidth / 2
      });
      projectStartX += (1 + projectWidth);
      return newProject;
    });
  }

  handleMouseOver(){
    const { maxValuation, capitalRaised } = this.props;
    const appendTextToRect = (textContent, textFill, textSize, textX, textY) => {
      this.svg.append("text")
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
      this.svg.append("rect")
        .attr("class", "rect-outline")
        .attr("x", outlineX)
        .attr("y", outlineY)
        .attr("width", outlineWidth)
        .attr("height", outlineHeight)
        .style("fill", "#fff");
    };

    return project => {
      appendTextToRect(project.valuation, project.fill, "12px", `${project.projectRectCenter}%`, project.projectValutionStartY + 15);
      appendTextToRect(project.capitalRequired, "white", "12px", `${project.projectRectCenter}%`, project.projectCapitalRequiredStartY + 15);
      appendTextToRect("valution", project.fill, "12px", `${project.projectRectCenter}%`, project.projectValutionStartY - 7);
      appendTextToRect("capital needs", "white", "12px", `${project.projectRectCenter}%`, project.projectCapitalRequiredStartY - 7);
      appendTextToRect(project.title, "#aa7a60", "15px", `${project.projectRectCenter}%`, -(maxValuation - capitalRaised) / this.props.scalingConstant * 1.5);
      appendOutLines(`${project.projectStartX}%`, project.projectValutionStartY, `${project.projectWidth}%`, 2);
      appendOutLines(`${project.projectStartX + project.projectWidth}%`, project.projectValutionStartY, 2, project.valuation / this.props.scalingConstant);
      appendOutLines(`${project.projectStartX + project.projectWidth}%`, capitalRaised / this.props.scalingConstant, "0.5%", 2);
      appendOutLines(`${project.projectStartX + project.projectWidth + 0.5}%`, capitalRaised / this.props.scalingConstant, 2, 30);
      appendOutLines(`${project.projectStartX - 0.5}%`, capitalRaised / this.props.scalingConstant + 28, `${project.projectWidth + 1}%`, 2);
      appendOutLines(`${project.projectStartX - 0.5}%`, capitalRaised / this.props.scalingConstant, 2, 30);
      appendOutLines(`${project.projectStartX - 0.5}%`, capitalRaised / this.props.scalingConstant, "0.5%", 2);
      appendOutLines(`${project.projectStartX}%`, project.projectValutionStartY + 2, 2, project.valuation / this.props.scalingConstant);
    };
  }

  handleMouseOut(){
    return () => {
      d3.selectAll(".rect-text").remove();
      d3.selectAll(".rect-outline").remove();
    };
  }

  handleClick(project) {
    const { showVoteShiftTool } = this.state;
    if (showVoteShiftTool) {
      this.setState({
        showVoteShiftTool: !showVoteShiftTool,
        selectedProject: null
      });
    } else {
      this.setState({
        showVoteShiftTool: !showVoteShiftTool,
        selectedProject: project
      });
    }
  }

  render(){
    const { maxValuation, capitalRaised } = this.props;
    return(
      <div className="votes-view" style={{marginTop: (maxValuation - capitalRaised) / this.props.scalingConstant * 2}}>
        {this.state.showVoteShiftTool && <VoteShiftTool project={this.state.selectedProject}/>}
      </div>
    );
  }
}


//CONTAINER

//is this data being used?
//
// const mapStateToProps = state => {
//     return({
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
