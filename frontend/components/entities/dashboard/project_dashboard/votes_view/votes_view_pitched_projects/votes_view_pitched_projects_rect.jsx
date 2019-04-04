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
		 }
		else {
			if (this.projectGroup.contains(e.target) || voteShiftTool.contains(e.target)) return;
			document.removeEventListener('click', this.handleClick, false);
			toggleSelectedProject(null);
			if (this.state.showHoverEffect) this.setState({ showHoverEffect: false });
		}
	}

	render() {
		const { selectedProject, SVGWidth, project, circleScale, transform } = this.props;
		const { fill, marginWidth, projectStartX, projectWidth, projectValutionHeight, projectValutionStartY, projectCapitalRequiredHeight, projectCapitalRequiredStartY, projectRectCenter, capitalRequired, valuation, voteShare, title, id } = project;

		const extensionForLines = SVGWidth+100


		const HoverEffects = () => (
			<g className="votes-view-onhover-group">
				<g onClick={e => e.stopPropagation()}>
					<VotesViewPitchedProjectsCircle
						cx={projectRectCenter}
						cy={150}
						selectedProject={selectedProject}
						r={circleScale(project.valuation)}
						project={project} />
				</g>
				<g className="votes-view-onhover-text-group">
					<text className="votes-view-project-title" x={projectRectCenter} y="250" fill={fill}>
						<tspan>{title}</tspan>
					</text>

					<text x={extensionForLines} y={projectValutionStartY} fill={fill}>
						<tspan> valuation {valuation}</tspan>
					</text>
					<line
						x1={projectRectCenter} y1={projectValutionStartY}
						x2={2000} y2={projectValutionStartY}
						stroke={fill}
						strokeDasharray="5,20"
						opacity={.5}>
					</line>

					<text x={extensionForLines} y={projectCapitalRequiredStartY} fill={fill}>
						<tspan> capital required {capitalRequired}</tspan>
					</text>
					<line
						x1={projectRectCenter} y1={projectCapitalRequiredStartY}
						x2={2000} y2={projectCapitalRequiredStartY}
						stroke={fill}
						strokeDasharray="5,20"
						opacity={.5}>
					</line>



				</g>
				<g className="votes-view-onhover-project-outlines-group">
					<rect x={projectStartX} y={projectValutionStartY} width={projectWidth} height={this.outlineWidth}></rect>
					<rect x={projectStartX + projectWidth - this.outlineWidth} y={projectValutionStartY} width={this.outlineWidth} height={projectValutionHeight}></rect>
					<rect x={projectStartX} y={projectValutionStartY} width={this.outlineWidth} height={projectValutionHeight}></rect>
				</g>
			</g>
		)


		return(
			<g className="votes-view-project-group"
				transform={transform}
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

				<text className="votes-view-percentage-breakdown"
					x={projectRectCenter}
					y={projectValutionStartY + projectValutionHeight + 20}
					opacity={selectedProject && selectedProject.id !== id ? "0.2" : "1"}>
					<tspan>{`${Math.round(voteShare * 100)}%`}</tspan>
				</text>

				{
					this.state.showHoverEffect &&
					<HoverEffects />
				}
			</g>
		);
	}
}


export default VotesViewPitchedProjectsRect;


// <rect
// 	width={projectWidth + marginWidth}
// 	height={this.votesBreakdownRectHeight}
// 	x={projectStartX - .5 * marginWidth}
// 	y={projectValutionStartY + projectValutionHeight}
// 	fill={fill}
// 	opacity='100%'
// 	onMouseOver={this.handleHover(true)}
// 	onMouseLeave={this.handleHover(false)}></rect>
