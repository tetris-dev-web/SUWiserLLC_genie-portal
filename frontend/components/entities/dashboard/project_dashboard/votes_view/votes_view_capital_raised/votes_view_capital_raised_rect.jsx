import React from 'react';


class VotesViewCapitalRaisedRect extends React.Component {
	constructor() {
		super();

		this.state = {
			showText: false
		};
	}

	handleHover(boolean) {
		return () => {
			this.setState({ showText: boolean });
		};
	}

	render() {
		const { x, y, height, fill, opacity, textToDisplay, voteBreakdownText } = this.props;
		const { showText } = this.state;

		return (
			<g
				onMouseEnter={this.handleHover(true)}
				onMouseLeave={this.handleHover(false)}>
				<rect
					x={x} y={y}
					width="100%"
					height={height}
					fill={fill}
					opacity={opacity}>
				</rect>
				{voteBreakdownText && voteBreakdownText()}
				{showText && textToDisplay()}
			</g>
		);
	}
}

export default VotesViewCapitalRaisedRect;
