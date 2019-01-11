import React from 'react';

const VotesViewCapitalRaisedLine = ({ xScale, yScale, project, opacity }) => (
	<line
		x1="0" y1={yScale(project.capital)}
		x2={xScale(project.time)} y2={yScale(project.capital)}
		opacity={opacity}></line>
);

export default VotesViewCapitalRaisedLine;
