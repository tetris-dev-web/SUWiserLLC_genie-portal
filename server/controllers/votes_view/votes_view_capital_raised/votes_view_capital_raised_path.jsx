import React from 'react';

const VotesViewCapitalRaisedPath = ({d, opacity, transform}) => {
	console.log('d',d)
	return (
		<g
			transform={transform}>
			<path
				d={d}
				opacity={opacity}></path>
		</g>
	);
}

export default VotesViewCapitalRaisedPath;
