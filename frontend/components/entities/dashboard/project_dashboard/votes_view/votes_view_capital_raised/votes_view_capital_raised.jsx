import React from 'react';
import * as d3 from 'd3';
import VotesViewCapitalRaisedRect from './votes_view_capital_raised_rect';
import VotesViewCapitalRaisedPath from './votes_view_capital_raised_path';
import VotesViewCapitalRaisedLine from './votes_view_capital_raised_line';
import VotesViewCapitalRaisedCircle from './votes_view_capital_raised_circle';
import colors from  "../../../../../../util/_variables.scss";

class VotesViewCapitalRaised extends React.Component {

  render() {
    const { SVGYScale, SVGHeightScale, SVGTimeXScale, circleScale, capitalBeingRaised, capitalTotal, lineData, deployedProjects, selectedProject } = this.props;

    const Lines = deployedProjects.map((project, idx) => (
      <VotesViewCapitalRaisedLine key={idx}
        xScale={SVGTimeXScale}
        yScale={SVGYScale}
        project={project}
        opacity={selectedProject ? "0.2" : "1"}/>
    ));

    const Circles = deployedProjects.map((project, idx) => (
      <VotesViewCapitalRaisedCircle key={idx}
        xScale={SVGTimeXScale}
        yScale={SVGYScale}
        circleScale={circleScale}
        project={project}
        opacity={selectedProject ? "0.2" : "1"}/>
    ));

    const Path = <VotesViewCapitalRaisedPath
      xScale={SVGTimeXScale}
      yScale={SVGYScale}
      opacity={selectedProject ? "0.2" : "1"}
      lineData={lineData} />;

    const heightOfCapitalBeingRaisedRect = SVGHeightScale(capitalBeingRaised);
    const yOfCapitalBeingRaisedRect = SVGYScale(capitalTotal);
    const CapitalBeingRaisedRect = <VotesViewCapitalRaisedRect
      x="0" y={yOfCapitalBeingRaisedRect}
      fill={colors.rosyBrown}
      height={heightOfCapitalBeingRaisedRect}
      opacity={selectedProject ? "0.1" : "0.3"}
      textToDisplay={() => (
        <g>
          <text className="votes-view-capital-raised-text"
            x="93%" y={yOfCapitalBeingRaisedRect + heightOfCapitalBeingRaisedRect / 2}>
            <tspan dy=".4em">capital being raised</tspan>
          </text>
          <text className="votes-view-capital-raised-text"
            x="7%" y={yOfCapitalBeingRaisedRect + heightOfCapitalBeingRaisedRect / 2}>
            <tspan dy=".4em">{`$ ${Number(capitalBeingRaised / 1000.0).toLocaleString()} k`}</tspan>
          </text>
        </g>
      )}/>;

    const heightOfCapitalRaisedPrevRect = SVGHeightScale(capitalTotal - capitalBeingRaised);
    const yOfCapitalRaisedPrevRect = heightOfCapitalBeingRaisedRect + yOfCapitalBeingRaisedRect;
    const capRaisedAmounts = deployedProjects.map((project, idx) => (
      <text className="votes-view-capital-raised-text"
        key={idx}
        x={"7%"}
        y={idx ? SVGYScale((project.capital + deployedProjects[idx - 1].capital) / 2) : (SVGYScale(project.capital) + yOfCapitalRaisedPrevRect + heightOfCapitalRaisedPrevRect) / 2}>
        <tspan dy=".4em">{`$ ${Number(project.capital / 1000.0).toLocaleString()} k`}</tspan>
      </text>
    ));
    const CapitalRaisedPrevRect = <VotesViewCapitalRaisedRect
      x="0" y={yOfCapitalRaisedPrevRect}
      fill={colors.teal}
      height={heightOfCapitalRaisedPrevRect}
      opacity={selectedProject ? "0.1" : "0.3"}
      textToDisplay={() => (
        <g>
          <text className="votes-view-capital-raised-text"
            x="93%" y={yOfCapitalRaisedPrevRect + heightOfCapitalRaisedPrevRect / 2}>
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
