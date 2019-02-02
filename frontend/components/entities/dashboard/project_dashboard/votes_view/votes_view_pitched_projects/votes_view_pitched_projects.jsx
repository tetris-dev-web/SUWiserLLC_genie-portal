import React from 'react';
import VotesViewPitchedProjectsRect from './votes_view_pitched_projects_rect';

class VotesViewPitchedProjects extends React.Component {

	processProjectData() {
		const { capitalBeingRaised, pitchedProjects, SVGYScale, SVGWidth } = this.props;
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
				projectValutionHeight: SVGYScale(project.valuation - project.capitalRequired),
				projectValutionStartY: SVGYScale(capitalBeingRaised - project.valuation),
				projectCapitalRequiredHeight: SVGYScale(project.capitalRequired),
				projectCapitalRequiredStartY: SVGYScale(capitalBeingRaised - project.capitalRequired),
				projectRectCenter: projectStartX + projectWidth / 2
			});
			projectStartX += (marginWidth + projectWidth);
			return newProject;
		});
	}

	render() {
		const { maxValuation, capitalBeingRaised, selectedProject, toggleSelectedProject, voteShiftTool, SVGYScale } = this.props;

		const rects = this.processProjectData().map((project, idx) => (
			<VotesViewPitchedProjectsRect key={idx}
				SVGYScale={SVGYScale}
				project={project}
				maxValuation={maxValuation}
				capitalRaised={capitalBeingRaised}
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
