import React from 'react';

const VotesViewCapitalRaisedRect = ({x, y, height, fill, setHoveredState, capitalRaised, hovered}) => (
  <React.Fragment>
    <rect x={x} y={y} width="100%" height={height} fill={fill} opacity="0.5"
      onMouseOver={setHoveredState} onMouseLeave={setHoveredState}> </rect>

    { hovered && capitalRaised && (
      <text x="90%" y="70%" className="votes-view-capital-raised-text-right">
        {`$ ${Number(capitalRaised/1000.0).toLocaleString()} k`}
        <tspan dy="1.4em" dx="-3.5em">
          capital raised
        </tspan>
      </text>
      )
    }

  </React.Fragment>
);

export default VotesViewCapitalRaisedRect;
