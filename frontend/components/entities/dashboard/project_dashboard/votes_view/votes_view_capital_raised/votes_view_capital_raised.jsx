import React from 'react';
import * as d3 from 'd3';
import VotesViewCapitalRaisedRect from './votes_view_capital_raised_rect';
import CapitalRaisedPath from './CapitalRaisedPath';
import ProjectCrossLine from './ProjectCrossLine';
import VotesViewCapitalRaisedCircle from './votes_view_capital_raised_circle';
import colors from  "../../../../../../util/_variables.scss";

class VotesViewCapitalRaised extends React.Component {

  render() {
    const { SVGYScale, SVGHeightScale, SVGTimeXScale, circleScale, capitalBeingRaised, voteViewOpen, capitalTotal, lineData, deployedProjects, selectedProject, SVGWidth, startTime, endTime } = this.props;

    const heightOfCapitalBeingRaisedRect = SVGHeightScale(capitalBeingRaised);
    const yOfCapitalBeingRaisedRect = SVGYScale(capitalTotal);
    const heightOfCapitalRaisedPrevRect = SVGHeightScale(capitalTotal - capitalBeingRaised);
    const yOfCapitalRaisedPrevRect = heightOfCapitalBeingRaisedRect + yOfCapitalBeingRaisedRect;


    const setOpacityBasedOnAppDepth = () => {
      let opacity = 1
      if(selectedProject){opacity = 0.1}
      else if (voteViewOpen) {opacity = 0.4}
      else {opacity = 1}
      return opacity
    }

    const opacityVar = setOpacityBasedOnAppDepth()

    const lineScale = d3.line()
      .x(d => SVGTimeXScale(d.date))
      .y(d => {
        const result = SVGYScale(d.capital);
        return result;
      })

    const Lines = deployedProjects.map((project, idx) => {
      return (
        <ProjectCrossLine key={idx}
          x1={-Math.abs(SVGTimeXScale((startTime + endTime) / 2) / .8)} y1={SVGYScale(project.capital)}
          x2={SVGTimeXScale(project.activationTime)} y2={SVGYScale(project.capital)}
          opacity={opacityVar}
          transform={`translate(263, 0)`}/>
      )
    });

    const TotalRaisedPath = <CapitalRaisedPath
                              d={lineScale(lineData)}
                              opacity={opacityVar}
                              transform={`translate(263, 0)`}/>;

    const Circles = deployedProjects.map((project, idx) => (
      <VotesViewCapitalRaisedCircle key={idx}
        fill="#bdc4c9"
        cx={SVGTimeXScale(project.activationTime)}
        cy={SVGYScale(project.capital)}
        r={circleScale(project.valuation)}
        x={SVGTimeXScale(project.time)}
        y={SVGYScale(project.capital) + circleScale(project.valuation) + 20}
        project={project}
        opacity={opacityVar}
        transform={`translate(263, 0)`}
        />
    ));


    const CapitalBeingRaisedRect = <VotesViewCapitalRaisedRect
      x="0" y={yOfCapitalBeingRaisedRect}
      fill={colors.rosyBrown}
      height={heightOfCapitalBeingRaisedRect}
      opacity={opacityVar}
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


    const capRaisedAmounts = deployedProjects.map((project, idx) => {
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
      fill={colors.darkgray}
      height={heightOfCapitalRaisedPrevRect}
      opacity={opacityVar}
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
        {TotalRaisedPath}
        {Circles}
      </g>
    );
  }
}

export default VotesViewCapitalRaised;
