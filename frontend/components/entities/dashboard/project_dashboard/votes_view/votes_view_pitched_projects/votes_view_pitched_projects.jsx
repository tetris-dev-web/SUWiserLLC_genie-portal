import React from 'react';
import * as d3 from 'd3';
import VoteShiftTool from '../vote_shift_tool';
import VotesViewPitchedProjectsRect from './votes_view_pitched_projects_rect';

class VotesViewPitchedProjects extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
					showVoteShiftTool: false,
					selectedProject: null
			};

			// this.handleClick = this.handleClick.bind(this);
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
		const { capitalRaised, pitchedProjects } = this.props;

		const rects = this.processProjectData().map((project, idx) => (
			<VotesViewPitchedProjectsRect key={idx} {...project} capitalRaised={capitalRaised}/>
		));

		return (
			<React.Fragment>
				{this.state.showVoteShiftTool && <VoteShiftTool project={this.state.selectedProject} />}
				{rects}
			</React.Fragment>
		);
	}
}

export default VotesViewPitchedProjects;
