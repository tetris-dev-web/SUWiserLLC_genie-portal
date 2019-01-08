import React from 'react';

class VotesViewPitchedProjectsRect extends React.Component {
	constructor() {
		super(); 

		this.state = {
			isHovered: false
		};

		this.handleHover = this.handleHover.bind(this);
	}

	handleHover() {
		this.setState({isHovered: !this.state.isHovered});
	}

	render() {
		const { capitalRaised, fill, projectStartX, projectWidth, projectValutionHeight, projectValutionStartY, projectCapitalRequiredHeight, projectCapitalRequiredStartY, projectRectCenter, capitalRequired, valuation, voteShare} = this.props;

		return(
			<g>
				<rect 
					width={`${projectWidth}%`}
					height={projectValutionHeight}
					x={`${projectStartX}%`}
					y={projectValutionStartY}
					fill={fill} opacity="0.3"
					onMouseOver={this.handleHover}
					onMouseLeave={this.handleHover}></rect>
				<text><tspan></tspan></text>
				<rect 
					width={`${projectWidth}%`}
					height={projectCapitalRequiredHeight}
					x={`${projectStartX}%`}
					y={projectCapitalRequiredStartY}
					fill={fill}
					onMouseOver={this.handleHover}
					onMouseLeave={this.handleHover}></rect>
				<rect
					width={`${projectWidth + 1}%`}
					height="30"
					x={`${projectStartX - .5}%`}
					y={capitalRaised / 24000}
					fill={fill}>
				</rect>
				<text className="votes-view-percentage-breakdown" x={`${projectRectCenter}%`} y={capitalRaised / 24000 + 20}>
					<tspan>{`${voteShare * 100}%`}</tspan>
				</text>
				{
					this.state.isHovered &&
					<g>
						<text x={`${projectRectCenter}%`} y={projectValutionStartY - 25} fill={fill}>
							<tspan>valuation</tspan>
						</text>
						<text x={`${projectRectCenter}%`} y={projectValutionStartY - 10} fill={fill}>
							<tspan>{valuation}</tspan>
						</text>
						<text x={`${projectRectCenter}%`} y={projectCapitalRequiredStartY + 20} fill="#fff">
							<tspan>capital needs</tspan>
						</text>
						<text x={`${projectRectCenter}%`} y={projectCapitalRequiredStartY + 35} fill="#fff">
							<tspan>{capitalRequired}</tspan>
						</text>
						
					</g>
				}
			</g>
		);
	}
}

export default VotesViewPitchedProjectsRect;