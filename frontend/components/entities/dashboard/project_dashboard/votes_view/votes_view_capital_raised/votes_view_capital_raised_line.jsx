import React from 'react';

const VotesViewCapitalRaisedLine = ({ xScale, yScale, activation, opacity }) => (
	<line 
		x1="0" y1={yScale(activation.capital)}
		x2={xScale(activation.time)} y2={yScale(activation.capital)}
		opacity={opacity}></line>
);

export default VotesViewCapitalRaisedLine;