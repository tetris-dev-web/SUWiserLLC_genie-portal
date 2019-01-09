import React from 'react';
import * as d3 from 'd3';
import VotesViewPitchedProjectsRect from './votes_view_pitched_projects_rect';

class VotesViewPitchedProjects extends React.Component {
	constructor() {
		super();
	}

	processProjectData() {
		const { capitalRaised, pitchedProjects } = this.props;
		const numberOfProjects = this.props.pitchedProjects.length;
		const percentOfScreen = 60;
		const projectWidthPercentage = percentOfScreen - (numberOfProjects - 1);
		let projectStartX = 20;

		return pitchedProjects.map(project => {
			const projectWidth = project.voteShare * projectWidthPercentage;
			const newProject = Object.assign({}, project, {
				fill: capitalRaised < project.capitalRequired ? "#aa7a60" : "#61aba9",
				projectStartX,
				projectWidth,
				projectValutionHeight: (project.valuation - project.capitalRequired) / 24000,
				projectValutionStartY: (capitalRaised - project.valuation) / 24000,
				projectCapitalRequiredHeight: project.capitalRequired / 24000,
				projectCapitalRequiredStartY: (capitalRaised - project.capitalRequired) / 24000,
				projectRectCenter: projectStartX + projectWidth / 2
			});
			projectStartX += (1 + projectWidth);
			return newProject;
		});
	}

	render() {
		const { maxValuation, capitalRaised, selectedProject, toggleSelectedProject } = this.props;

		const rects = this.processProjectData().map((project, idx) => (
			<VotesViewPitchedProjectsRect key={idx}
				project={project}
				maxValuation={maxValuation}
				capitalRaised={capitalRaised} 
				selectedProject={selectedProject}
				toggleSelectedProject={toggleSelectedProject}/>
		));

		return (
			<g className="votes-view-pitched-projects">
				{rects}
			</g>
		);
	}
}

export default VotesViewPitchedProjects;
