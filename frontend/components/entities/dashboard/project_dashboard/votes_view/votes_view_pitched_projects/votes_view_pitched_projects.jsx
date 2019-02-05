import React from 'react';
import VotesViewPitchedProjectsRect from './votes_view_pitched_projects_rect';

class VotesViewPitchedProjects extends React.Component {

	processProjectData() {
		const { capitalBeingRaised, capitalTotal, pitchedProjects, SVGYScale, SVGHeightScale, SVGWidth } = this.props;
		const numberOfProjects = this.props.pitchedProjects.length;
		const totalWidth = .6 * SVGWidth;
		const marginWidth = .01 * SVGWidth;
		const totalProjectWidth = totalWidth - (numberOfProjects - 1) * marginWidth;
		let projectStartX = .2 * SVGWidth;

		return pitchedProjects.map(project => {
			const projectWidth = project.voteShare * totalProjectWidth;
			const newProject = Object.assign({}, project, {
				fill: capitalBeingRaised < project.capitalRequired ? "#aa7a60" : "#61aba9",
				marginWidth,
				projectStartX,
				projectWidth,
				projectValutionHeight: SVGHeightScale(project.valuation),
				projectValutionStartY: SVGYScale(project.valuation + capitalTotal - capitalBeingRaised),
				projectCapitalRequiredHeight: SVGHeightScale(project.capitalRequired),
				projectCapitalRequiredStartY: SVGYScale(project.capitalRequired + capitalTotal - capitalBeingRaised),
				projectRectCenter: projectStartX + projectWidth / 2
			});
			projectStartX += (marginWidth + projectWidth);
			return newProject;
		});
	}

	render() {
		const { selectedProject, toggleSelectedProject, voteShiftTool, SVGYScale, circleScale } = this.props;

		const rects = this.processProjectData().map((project, idx) => (
			<VotesViewPitchedProjectsRect key={idx}
				project={project}
				SVGYScale={SVGYScale}
				circleScale={circleScale}
				selectedProject={selectedProject}
				toggleSelectedProject={toggleSelectedProject}
				voteShiftTool={voteShiftTool} />
		));

		return (
			<g className="votes-view-pitched-projects">
				{rects}
			</g>
		);
	}
}

export default VotesViewPitchedProjects;
