import React from 'react';
import * as d3 from 'd3';
import VotesViewCapitalRaisedRect from './votes_view_capital_raised_rect';
import VotesViewCapitalRaisedPath from './votes_view_capital_raised_path';
import VotesViewCapitalRaisedLine from './votes_view_capital_raised_line';
import VotesViewCapitalRaisedCircle from './votes_view_capital_raised_circle';
import colors from  "../../../../../../util/_variables.scss";

class VotesViewCapitalRaised extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      capBeingRaisedHovered: false,
    };
  }

  componentDidMount() {
    window.onresize = () => {
      this.setState({currentWindowWidth: window.innerWidth});
    };
  }

  render() {
    const { capitalBeingRaised, capitalTotal, lineData, startTime, endTime, deployedProjects, deployedProjectsValuationMinMax, selectedProject } = this.props;
    const xScale = d3.scaleLinear()
      .domain([startTime, endTime])
      .range([0, window.innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, capitalTotal])
      .range([capitalTotal / this.props.scalingConstant, 0]);

    const circleScale = d3.scaleLinear()
      .domain(deployedProjectsValuationMinMax)
      .range([.5, 1.5]);

    const Lines = deployedProjects.map((project, idx) => (
      <VotesViewCapitalRaisedLine key={idx}
        xScale={xScale}
        yScale={yScale}
        project={project}
        opacity={selectedProject ? "0.2" : "1"}/>
    ));

    const Circles = deployedProjects.map((project, idx) => (
      <VotesViewCapitalRaisedCircle key={idx}
        xScale={xScale}
        yScale={yScale}
        circleScale={circleScale}
        project={project}
        opacity={selectedProject ? "0.2" : "1"}/>
    ));

    const Path = <VotesViewCapitalRaisedPath
      xScale={xScale}
      yScale={yScale}
      opacity={selectedProject ? "0.2" : "1"}
      lineData={lineData} />;

    const heightOfCapitalBeingRaisedRect = capitalBeingRaised / this.props.scalingConstant;

    const CapitalBeingRaisedRect = <VotesViewCapitalRaisedRect
      scalingConstant={this.props.scalingConstant}
      x="0" y="0"
      fill={colors.rosyBrown}
      height={heightOfCapitalBeingRaisedRect}
      opacity={selectedProject ? "0.1" : "0.3"}
      textToDisplay={() => (
        <g>
          <text className="votes-view-capital-raised-text"
            x="93%" y={heightOfCapitalBeingRaisedRect / 2}>
            <tspan dy=".4em">capital being raised</tspan>
          </text>
          <text className="votes-view-capital-raised-text"
            x="7%" y={heightOfCapitalBeingRaisedRect / 2}>
            <tspan dy=".4em">{`$ ${Number(capitalBeingRaised / 1000.0).toLocaleString()} k`}</tspan>
          </text>
        </g>
      )}/>;

    const heightOfCapitalRaisedPrevRect = (capitalTotal - capitalBeingRaised) / this.props.scalingConstant;

    console.log("heightOfCapitalRaisedPrevRect", heightOfCapitalRaisedPrevRect, "capitalTotal", capitalTotal,"capitalBeingRaised", capitalBeingRaised);

    const capRaisedAmounts = deployedProjects.map((project, idx) => (
      <text className="votes-view-capital-raised-text"
        key={idx}
        x={"7%"}
        y={idx ? yScale((project.capital + deployedProjects[idx-1].capital)/2) : yScale((project.capital + ((capitalTotal - capitalBeingRaised) / this.props.scalingConstant) + (capitalBeingRaised / this.props.scalingConstant))/2 )}>
        <tspan dy=".4em">{`$ ${Number(project.capital / 1000.0).toLocaleString()} k`}</tspan>
      </text>
    ));
    const CapitalRaisedPrevRect = <VotesViewCapitalRaisedRect
      scalingConstant={this.props.scalingConstant}
      x="0" y={capitalBeingRaised / this.props.scalingConstant}
      fill={colors.teal}
      height={heightOfCapitalRaisedPrevRect}
      opacity={selectedProject ? "0.1" : "0.3"}
      textToDisplay={() => (
        <g>
          <text className="votes-view-capital-raised-text"
            x="93%" y={capitalBeingRaised / this.props.scalingConstant + heightOfCapitalRaisedPrevRect / 2}>
            <tspan dy=".4em">capital that has been raised</tspan>
          </text>
          {capRaisedAmounts}
        </g>
      )}/>;

    return (
      <g className="votes-view-capital-raised">
        {CapitalBeingRaisedRect}
        {CapitalRaisedPrevRect}
        {Path}
        {Lines}
        {Circles}
      </g>
    );
  }
}

export default VotesViewCapitalRaised;
