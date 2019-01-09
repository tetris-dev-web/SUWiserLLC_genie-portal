import React from 'react';

class VotesViewCapitalRaisedCircle extends React.Component {
	constructor() {
		super();

		this.state = {
			showText: false,
			
		};

		this.handleHover = this.handleHover.bind(this);
	}

	handleHover() {
		this.setState({showText: !this.state.showText});
	}

	render() {
		const { xScale, yScale, circleScale, activation, opacity } = this.props;

		return (
			<React.Fragment>
				<circle 
					fill="#bdc4c9"
					cx={xScale(activation.time)}
					cy={yScale(activation.capital)}
					r={`${circleScale(activation.valuation)}%`} 
					opacity={opacity}
					onMouseOver={this.handleHover} onMouseLeave={this.handleHover}></circle>
				{
					this.state.showText &&
					<text className="votes-view-capital-raised-text"
						x={xScale(activation.time)}
						y={yScale(activation.capital) + 30}><tspan>{activation.title}</tspan>
					</text>
				}
			</React.Fragment>
		);
	}
}

export default VotesViewCapitalRaisedCircle;