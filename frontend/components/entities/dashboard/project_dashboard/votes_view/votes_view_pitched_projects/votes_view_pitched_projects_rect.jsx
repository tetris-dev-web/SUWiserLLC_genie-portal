import React from 'react';

class VotesViewPitchedProjectsRect extends React.Component {
	constructor() {
		super();

		this.state = {
			showHoverEffect: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleHover(boolean) {
		const { selectedProject } = this.props;
		return () => {
			if (!selectedProject) {
				this.setState({ showHoverEffect: boolean });
			}
		};
	}

	handleClick(e) {
		const { selectedProject, toggleSelectedProject, project, voteShiftTool } = this.props;

		if (!selectedProject) {
			document.addEventListener('click', this.handleClick, false);
			toggleSelectedProject(project);
			if (!this.state.showHoverEffect) this.setState({ showHoverEffect: true });
		} else if (selectedProject.id === project.id) {
			if (this.projectGroup.contains(e.target) || voteShiftTool.contains(e.target)) return;
			document.removeEventListener('click', this.handleClick, false);
			toggleSelectedProject(null);
			if (this.state.showHoverEffect) this.setState({ showHoverEffect: false });
		}
	}

	render() {
		const { selectedProject, maxValuation, capitalRaised, project} = this.props;
		const { fill, projectStartX, projectWidth, projectValutionHeight, projectValutionStartY, projectCapitalRequiredHeight, projectCapitalRequiredStartY, projectRectCenter, capitalRequired, valuation, voteShare, title, id } = project;
		console.log("projectValutionHeight", projectValutionHeight)
		console.log("projectCapitalRequiredHeight", projectCapitalRequiredHeight)
		console.log("capitalRaised", capitalRaised)
		console.log("CONSTANT", this.props.scalingConstant)
		console.log("y", capitalRaised / this.props.scalingConstant)
		return(
			<g className="votes-view-project-group"
				onClick={this.handleClick}
				ref={node => this.projectGroup = node}>
				<rect
					width={`${projectWidth}%`}
					height={projectValutionHeight}
					x={`${projectStartX}%`}
					y={projectValutionStartY}
					fill={fill}
					opacity={selectedProject && selectedProject.id !== id ? "0.2" : "0.3"}
					onMouseOver={this.handleHover(true)}
					onMouseLeave={this.handleHover(false)}></rect>
				<rect
					width={`${projectWidth}%`}
					height={projectCapitalRequiredHeight}
					x={`${projectStartX}%`}
					y={projectCapitalRequiredStartY}
					fill={fill}
					opacity={selectedProject && selectedProject.id !== id ? "0.2" : "1"}
					onMouseOver={this.handleHover(true)}
					onMouseLeave={this.handleHover(false)}></rect>
				<rect
					width={`${projectWidth + 1}%`}
					height="30"
					x={`${projectStartX - .5}%`}
					y={capitalRaised / this.props.scalingConstant}
					fill={fill}
					opacity={selectedProject && selectedProject.id !== id ? "0.2" : "1"}
					onMouseOver={this.handleHover(true)}
					onMouseLeave={this.handleHover(false)}></rect>
				<text className="votes-view-percentage-breakdown"
					x={`${projectRectCenter}%`}
					y={capitalRaised / this.props.scalingConstant + 20}
					opacity={selectedProject && selectedProject.id !== id ? "0.2" : "1"}>
					<tspan>{`${voteShare * 100}%`}</tspan>
				</text>
				{
					this.state.showHoverEffect &&
					<g className="votes-view-onhover-group">
						<g className="votes-view-onhover-text-group">
							<text className="votes-view-project-title" x={`${projectRectCenter}%`} y={-(maxValuation - capitalRaised) / this.props.scalingConstant * 1.75} fill="#aa7a60">
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
						<g className="votes-view-onhover-project-outlines-group">
							<rect x={`${projectStartX}%`} y={projectValutionStartY} width={`${projectWidth}%`} height={2}></rect>
							<rect x={`${projectStartX + projectWidth}%`} y={projectValutionStartY} width={2} height={valuation / this.props.scalingConstant}></rect>
							<rect x={`${projectStartX + projectWidth}%`} y={capitalRaised / this.props.scalingConstant} width="0.5%" height={2}></rect>
							<rect x={`${projectStartX + projectWidth + 0.35}%`} y={capitalRaised / this.props.scalingConstant} width={2} height={30}></rect>
							<rect x={`${projectStartX - 0.5}%`} y={capitalRaised / this.props.scalingConstant + 28} width={`${projectWidth + 1}%`} height={2}></rect>
							<rect x={`${projectStartX - 0.5}%`} y={capitalRaised / this.props.scalingConstant} width={2} height={30}></rect>
							<rect x={`${projectStartX - 0.5}%`} y={capitalRaised / this.props.scalingConstant} width="0.5%" height={2}></rect>
							<rect x={`${projectStartX}%`} y={projectValutionStartY + 2} width={2} height={valuation / this.props.scalingConstant}></rect>
						</g>
					</g>
				}
			</g>
		);
	}
}

export default VotesViewPitchedProjectsRect;
