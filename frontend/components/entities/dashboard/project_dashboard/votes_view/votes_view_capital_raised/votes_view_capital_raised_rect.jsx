import React from 'react';

const VotesViewCapitalRaisedRect = ({x, y, height, fill, setHoveredState, capitalRaised, capital, hovered}) => (
  <g>
    <rect x={x} y={y} width="100%" height={height} fill={fill} opacity="0.5"
      onMouseOver={setHoveredState} onMouseLeave={setHoveredState}> </rect>

    { hovered && capital ? (
      <text x="90%" y="70%" className="votes-view-capital-raised-text-right">
        {`$ ${Number(capital/1000.0).toLocaleString()} k`}
        <tspan dy="1.4em" dx="-3.5em">
          capital raised
        </tspan>
      </text>
    ) :
    hovered && capitalRaised &&
     (
       <g>
        <text x="95%" y="20%" className="votes-view-capital-raised-text-right">
          <tspan>
            capital being raised
          </tspan>
        </text>
        <text x="5%" y="20%" className="votes-view-capital-raised-text">
          <tspan>
            {`$ ${Number(capitalRaised/1000.0).toLocaleString()} k`}
          </tspan>
        </text>
    </g>
      )

    }

  </g>
);

export default VotesViewCapitalRaisedRect;
