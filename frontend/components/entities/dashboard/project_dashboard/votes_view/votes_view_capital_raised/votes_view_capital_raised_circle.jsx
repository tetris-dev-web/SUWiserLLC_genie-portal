import React from 'react';
import ProjectModules from '../../project_modules/project_modules';

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
		const { cx, cy, r, x, y, project, opacity } = this.props;

		return (
			<React.Fragment>
				<circle className="votes-view-project-circle"
					fill="#bdc4c9"
					cx={cx}
					cy={cy}
					r={r}
					opacity={opacity}
					onMouseOver={this.handleHover}
					onMouseLeave={this.handleHover}></circle>
				{
					this.state.showText &&
					<text className="votes-view-capital-raised-text"
						x={x}
						y={y}><tspan>{project.title}</tspan>
					</text>
				}
			</React.Fragment>
		);
	}
}

export default VotesViewCapitalRaisedCircle;

