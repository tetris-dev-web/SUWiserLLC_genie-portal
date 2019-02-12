import React from 'react';
import VotesViewPitchedProjectsCircle from './votes_view_pitched_projects_circle';

class VotesViewPitchedProjectsRect extends React.Component {
	constructor() {
		super();

		this.state = {
			showHoverEffect: false
		};

		this.handleClick = this.handleClick.bind(this);
		this.outlineWidth = 2;
		this.votesBreakdownRectHeight = 30;
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
		const { selectedProject, project, circleScale } = this.props;
		const { fill, marginWidth, projectStartX, projectWidth, projectValutionHeight, projectValutionStartY, projectCapitalRequiredHeight, projectCapitalRequiredStartY, projectRectCenter, capitalRequired, valuation, voteShare, title, id } = project;
		// debugger
		return(
			<g className="votes-view-project-group"
				onClick={this.handleClick}
				ref={node => this.projectGroup = node}>
				<rect
					width={projectWidth}
					height={projectValutionHeight}
					x={projectStartX}
					y={projectValutionStartY}
					fill={fill}
					opacity={selectedProject && selectedProject.id !== id ? "0.2" : "0.3"}
					onMouseOver={this.handleHover(true)}
					onMouseLeave={this.handleHover(false)}></rect>
				<rect
					width={projectWidth}
					height={projectCapitalRequiredHeight}
					x={projectStartX}
					y={projectCapitalRequiredStartY}
					fill={fill}
					opacity={selectedProject && selectedProject.id !== id ? "0.2" : "1"}
					onMouseOver={this.handleHover(true)}
					onMouseLeave={this.handleHover(false)}></rect>
				<rect
					width={projectWidth + marginWidth}
					height={this.votesBreakdownRectHeight}
					x={projectStartX - .5 * marginWidth}
					y={projectValutionStartY + projectValutionHeight}
					fill={fill}
					opacity={selectedProject && selectedProject.id !== id ? "0.2" : "1"}
					onMouseOver={this.handleHover(true)}
					onMouseLeave={this.handleHover(false)}></rect>
				<g onClick={e => e.stopPropagation()}>
					<VotesViewPitchedProjectsCircle 
						cx={projectRectCenter}
						cy={50}
						r={circleScale(project.valuation)}
						opacity={selectedProject ? "0.2" : "1"}
						project={project} />
				</g>
				<text className="votes-view-percentage-breakdown"
					x={projectRectCenter}
					y={projectValutionStartY + projectValutionHeight + 20}
					opacity={selectedProject && selectedProject.id !== id ? "0.2" : "1"}>
					<tspan>{`${voteShare * 100}%`}</tspan>
				</text>
				{
					this.state.showHoverEffect &&
					<g className="votes-view-onhover-group">
						<g className="votes-view-onhover-text-group">
							<text className="votes-view-project-title" x={projectRectCenter} y="30" fill="#aa7a60">
								<tspan>{title}</tspan>
							</text>
							<text x={projectRectCenter} y={projectValutionStartY - 25} fill={fill}>
								<tspan>valuation</tspan>
							</text>
							<text x={projectRectCenter} y={projectValutionStartY - 10} fill={fill}>
								<tspan>{valuation}</tspan>
							</text>
							<text x={projectRectCenter} y={projectCapitalRequiredStartY + 20} fill="#fff">
								<tspan>capital needs</tspan>
							</text>
							<text x={projectRectCenter} y={projectCapitalRequiredStartY + 35} fill="#fff">
								<tspan>{capitalRequired}</tspan>
							</text>
						</g>
						<g className="votes-view-onhover-project-outlines-group">
							<rect x={projectStartX} y={projectValutionStartY} width={projectWidth} height={this.outlineWidth}></rect>
							<rect x={projectStartX + projectWidth - this.outlineWidth} y={projectValutionStartY} width={this.outlineWidth} height={projectValutionHeight}></rect>
							<rect x={projectStartX + projectWidth - this.outlineWidth} y={projectValutionStartY + projectValutionHeight} width={.5 * marginWidth + this.outlineWidth} height={this.outlineWidth}></rect>
							<rect x={projectStartX + projectWidth + marginWidth - this.outlineWidth * 3.5} y={projectValutionStartY + projectValutionHeight} width={this.outlineWidth} height={this.votesBreakdownRectHeight}></rect>
							<rect x={projectStartX - .5 * marginWidth} y={projectValutionStartY + projectValutionHeight + this.votesBreakdownRectHeight - this.outlineWidth} width={projectWidth + marginWidth} height={this.outlineWidth}></rect>
							<rect x={projectStartX - .5 * marginWidth} y={projectValutionStartY + projectValutionHeight} width={this.outlineWidth} height={this.votesBreakdownRectHeight}></rect>
							<rect x={projectStartX - .5 * marginWidth} y={projectValutionStartY + projectValutionHeight} width={.5 * marginWidth + this.outlineWidth} height={this.outlineWidth}></rect>
							<rect x={projectStartX} y={projectValutionStartY} width={this.outlineWidth} height={projectValutionHeight}></rect>
						</g>
					</g>
				}
			</g>
		);
	}
}

export default VotesViewPitchedProjectsRect;
