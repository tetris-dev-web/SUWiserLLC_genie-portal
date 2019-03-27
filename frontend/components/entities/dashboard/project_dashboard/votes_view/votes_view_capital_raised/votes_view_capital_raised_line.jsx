import React from 'react';

const VotesViewCapitalRaisedLine = ({ x1, y1, x2, y2, opacity, transform }) => (
	<line
		className="capitalRaisedLine"
		x1={x1} y1={y1}
		x2={x2} y2={y2}
		transform={transform}
		opacity={opacity}></line>
);

export default VotesViewCapitalRaisedLine;
