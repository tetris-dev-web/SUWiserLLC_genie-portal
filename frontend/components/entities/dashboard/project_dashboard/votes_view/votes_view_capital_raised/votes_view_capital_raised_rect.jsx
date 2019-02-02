import React from 'react';


// const capBRaisedTextToDisplay = (capitalBRaised) => `$ ${Number(capitalBRaised/1000.0).toLocaleString()} k`
//
// const capRaisedTextToDisplay = (capitalRaised) => `$ ${Number(capitalRaised/1000.0).toLocaleString()} k`

class VotesViewCapitalRaisedRect extends React.Component {
	constructor() {
		super();

		this.state = {
			showText: false
		};

		this.handleHover = this.handleHover.bind(this);
	}

	handleHover() {
		this.setState({showText: !this.state.showText});
	}

	render() {
		const { x, y, height, fill, opacity, textToDisplay } = this.props;
		const { showText } = this.state;

		return (
			<g
				onMouseEnter={this.handleHover}
				onMouseLeave={this.handleHover}>
				<rect
					x={x} y={y}
					width="100%"
					height={height}
					fill={fill}
					opacity={opacity}>
				</rect>
				{showText && textToDisplay()}
			</g>
		);
	}
}

export default VotesViewCapitalRaisedRect;
