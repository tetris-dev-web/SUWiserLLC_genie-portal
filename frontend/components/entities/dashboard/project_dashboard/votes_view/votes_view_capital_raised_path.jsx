import React from 'react';
import * as d3 from 'd3';

const VotesViewCapitalRaisedPath = ({xScale, yScale, lineData}) => {
	const lineScale = d3.line()
		.x(d => xScale(d.date))
		.y(d => yScale(d.capital));

	return (
		<path d={lineScale(lineData)}></path>
	);
};

export default VotesViewCapitalRaisedPath;