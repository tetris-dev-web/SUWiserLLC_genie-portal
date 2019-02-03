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
		const { xScale, yScale, circleScale, project, opacity } = this.props;

		return (
			<React.Fragment>
				<circle
					fill="#bdc4c9"
					cx={xScale(project.time)}
					cy={yScale(project.capital)}
					r={circleScale(project.valuation)}
					opacity={opacity}
					onMouseOver={this.handleHover}
					onMouseLeave={this.handleHover}></circle>
				{
					this.state.showText &&
					<text className="votes-view-capital-raised-text"
						x={xScale(project.time)}
						y={yScale(project.capital) + circleScale(project.valuation) + 20}><tspan>{project.title}</tspan>
					</text>
				}
			</React.Fragment>
		);
	}
}

export default VotesViewCapitalRaisedCircle;
