import React from 'react';
import VotesViewPitchedProjectsRect from './votes_view_pitched_projects_rect';
import { receiveProject } from '../../../../../../actions/project_actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		votingInstance: state.network.votingInstance
	}
}

const mapDispatchToProps = dispatch => {
	return {
		receiveProject: (project) => dispatch(receiveProject(project))
	}
}

class VotesViewPitchedProjects extends React.Component {
	constructor (props) {
		super(props);
		this.watchVoteChange = this.watchVoteChange.bind(this);
	}

	componentDidMount () {
		this.watchVoteChange();
	}

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

	watchVoteChange () {
		this.props.votingInstance.VoteChange().watch((error, event) => {
			this.props.receiveProject({id: Number(event.args.projectId), votes: Number(event.args.totalVotes)});
		})
	}

	render() {
		const { selectedProject, toggleSelectedProject, voteShiftTool, SVGYScale, circleScale, margin } = this.props;

		const rects = this.processProjectData().map((project, idx) => (
			<VotesViewPitchedProjectsRect key={idx}
				transform={`translate(263, 0)`}
				project={project}
				SVGYScale={SVGYScale}
				circleScale={circleScale}
				selectedProject={selectedProject}
				toggleSelectedProject={toggleSelectedProject}
				voteShiftTool={voteShiftTool} />
		));

		return (
			<g className="votes-view-pitched-projects" transform={'translate(0, 0)'}>
				{rects}
			</g>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(VotesViewPitchedProjects);
