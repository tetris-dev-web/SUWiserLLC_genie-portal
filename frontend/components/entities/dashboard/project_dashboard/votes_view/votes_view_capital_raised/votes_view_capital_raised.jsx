import React from 'react';
import * as d3 from 'd3';
import VotesViewCapitalRaisedRect from './votes_view_capital_raised_rect';
import VotesViewCapitalRaisedPath from './votes_view_capital_raised_path';
import VotesViewCapitalRaisedLine from './votes_view_capital_raised_line';
import VotesViewCapitalRaisedCircle from './votes_view_capital_raised_circle';
import colors from  "../../../../../../util/_variables.scss";

class VotesViewCapitalRaised extends React.Component {

  render() {
    const { SVGYScale, SVGHeightScale, SVGTimeXScale, circleScale, capitalBeingRaised, capitalTotal, lineData, deployedProjects, selectedProject, SVGWidth, startTime, endTime } = this.props;
    console.log(startTime, endTime, "times");
    const Lines = deployedProjects.map((project, idx) => {
      return (
        <VotesViewCapitalRaisedLine key={idx}
          x1={-Math.abs(SVGTimeXScale((startTime + endTime) / 2) / .8)} y1={SVGYScale(project.capital)}
          x2={SVGTimeXScale(project.activationTime)} y2={SVGYScale(project.capital)}
          opacity={selectedProject ? "0.2" : "1"}
          transform={`translate(263, 0)`}/>
      )
    });

    const Circles = deployedProjects.map((project, idx) => (
      <VotesViewCapitalRaisedCircle key={idx}
        fill="#bdc4c9"
        cx={SVGTimeXScale(project.activationTime)}
        cy={SVGYScale(project.capital)}
        r={circleScale(project.valuation)}
        x={SVGTimeXScale(project.time)}
        y={SVGYScale(project.capital) + circleScale(project.valuation) + 20}
        project={project}
        opacity={selectedProject ? "0.2" : "1"}
        transform={`translate(263, 0)`}
        />
    ));

    const lineScale = d3.line()
      .x(d => SVGTimeXScale(d.date))
      .y(d => {
        const result = SVGYScale(d.capital);

        return result;
      })


    const Path = <VotesViewCapitalRaisedPath
      d={lineScale(lineData)}
      opacity={selectedProject ? "0.2" : "1"}
      transform={`translate(263, 0)`}/>;

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
            x="85%" y={yOfCapitalBeingRaisedRect + heightOfCapitalBeingRaisedRect / 2}>
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

    console.log("deployedProjects", deployedProjects);


    const capRaisedAmounts = deployedProjects.map((project, idx) => {
      console.log(project);
      const capitalRequired = project.capitalRequired > 0? "$ "+ Number(project.capitalRequired/1000.0).toLocaleString()+" k" : "";
      return (
        <text className="votes-view-capital-raised-text"
          key={idx}
          x={"7%"}
          y={idx ? SVGYScale((project.capital + deployedProjects[idx - 1].capital) / 2) : (SVGYScale(project.capital) + yOfCapitalRaisedPrevRect + heightOfCapitalRaisedPrevRect) / 2}>
          <tspan dy=".4em">{capitalRequired}</tspan>
        </text>
      )

    });


    const CapitalRaisedPrevRect = <VotesViewCapitalRaisedRect
      x="0" y={yOfCapitalRaisedPrevRect}
      fill={colors.teal}
      height={heightOfCapitalRaisedPrevRect}
      opacity={selectedProject ? "0.1" : "0.3"}
      voteBreakdownText={() => (
        <g>
          <text
            className='votes-view-vote-breakdown-text'
            x="50%" y={yOfCapitalBeingRaisedRect + heightOfCapitalBeingRaisedRect + 35}>
            <tspan dy=".4em">vote breakdown</tspan>
          </text>
        </g>
      )}
      textToDisplay={() => (
        <g>
          <text className="votes-view-capital-raised-text"
            x="85%" y={yOfCapitalRaisedPrevRect + heightOfCapitalRaisedPrevRect / 2}>
            <tspan dy=".4em">capital that has been raised</tspan>
          </text>
          {capRaisedAmounts}
        </g>
      )}/>;

    return (
      <g className="votes-view-capital-raised" transform={'translate(0, 0)'}>
        {CapitalBeingRaisedRect}
        {CapitalRaisedPrevRect}
        {Lines}
        {Path}
        {Circles}
      </g>
    );
  }
}

export default VotesViewCapitalRaised;
