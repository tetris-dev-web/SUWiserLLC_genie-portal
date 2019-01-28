import React from 'react';


// const capBRaisedTextToDisplay = (capitalBRaised) => `$ ${Number(capitalBRaised/1000.0).toLocaleString()} k`
//
// const capRaisedTextToDisplay = (capitalRaised) => `$ ${Number(capitalRaised/1000.0).toLocaleString()} k`




const VotesViewCapitalRaisedRect = ({x, y, height, fill, opacity, setHoveredStateOnEnter, setHoveredStateOnLeave, capRaisedTextToDisplay, hovered}) => (
  <g>
    <rect
			x={x} y={y}
			width="100%"
			height={height}
			fill={fill}
			opacity={opacity}
      onMouseEnter={setHoveredStateOnEnter}
			onMouseLeave={setHoveredStateOnLeave}>
		</rect>

	   { hovered && (
        <text
					x={"89%"}
					y={ y + height/2 }
					className="votes-view-capital-raised-text-right">
              <tspan dx="0" dy="1.4em">{capRaisedTextToDisplay.text}</tspan>
              <tspan dx="-5.5em" dy="1.4em">{capRaisedTextToDisplay.amount}</tspan>
        </text>
	     )
     }

  </g>
);

export default VotesViewCapitalRaisedRect;
