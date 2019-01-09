import React from 'react';

class VotesViewPitchedProjectsRect extends React.Component {
	constructor() {
		super(); 

		this.state = {
			showHoverEffect: false
		};

		this.handleHover = this.handleHover.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleHover() {
		if (!this.props.selectedProjectId) {
			this.setState({showHoverEffect: !this.state.showHoverEffect});
		}
	}

	handleClick() {
		const { selectedProjectId, toggleSelectedProjectId, id } = this.props;
		if (selectedProjectId && selectedProjectId === id) {
			toggleSelectedProjectId(null);
		} else if (!selectedProjectId) {
			toggleSelectedProjectId(id);
		}
	}

	render() {
		const { maxValuation, capitalRaised, fill, projectStartX, projectWidth, projectValutionHeight, projectValutionStartY, projectCapitalRequiredHeight, projectCapitalRequiredStartY, projectRectCenter, capitalRequired, valuation, voteShare, title} = this.props;

		return(
			<g onClick={this.handleClick}>
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
					this.state.showHoverEffect &&
					<g>
						<g>
							<text className="votes-view-project-title" x={`${projectRectCenter}%`} y={-(maxValuation - capitalRaised) / 24000 * 1.5} fill="#aa7a60">
								<tspan>{title}</tspan>
							</text>
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
						<g className="votes-view-project-outlines">
							<rect x={`${projectStartX}%`} y={projectValutionStartY} width={`${projectWidth}%`} height={2}></rect>
							<rect x={`${projectStartX + projectWidth}%`} y={projectValutionStartY} width={2} height={valuation / 24000}></rect>
							<rect x={`${projectStartX + projectWidth}%`} y={capitalRaised / 24000} width="0.5%" height={2}></rect>
							<rect x={`${projectStartX + projectWidth + 0.5}%`} y={capitalRaised / 24000} width={2} height={30}></rect>
							<rect x={`${projectStartX - 0.5}%`} y={capitalRaised / 24000 + 28} width={`${projectWidth + 1}%`} height={2}></rect>
							<rect x={`${projectStartX - 0.5}%`} y={capitalRaised / 24000} width={2} height={30}></rect>
							<rect x={`${projectStartX - 0.5}%`} y={capitalRaised / 24000} width="0.5%" height={2}></rect>
							<rect x={`${projectStartX}%`} y={projectValutionStartY + 2} width={2} height={valuation / 24000}></rect>
						</g>
					</g>
				}
			</g>
		);
	}
}

export default VotesViewPitchedProjectsRect;