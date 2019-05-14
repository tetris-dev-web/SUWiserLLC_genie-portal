import React from 'react';

const VotesViewCapitalRaisedPath = ({d, opacity, transform}) => {
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
