import React from 'react';
import * as d3 from 'd3';

const VOTE_BAR_WIDTH = 140;
const VOTE_BAR_HEIGHT = 25;

class VoteShiftTool extends React.Component {
	constructor(props) {
		super(props);

		this.state = Object.assign({}, this.props.votesMockup);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.svg = d3.select(".vote-shift-tool")
			.append("svg")
			.attr("width", VOTE_BAR_WIDTH)
			.attr("height", VOTE_BAR_HEIGHT);

		this.setup();
	}

	setup() {
		const { votesPerProject, votesNotDedicated } = this.state;
		const voteBarRaduis = 8;
		const voteBarInnerMargin = 5;
		const innerBarHeight = VOTE_BAR_HEIGHT - 2 * voteBarInnerMargin;
		const voteShiftLineWidth = 5;
		const voteShiftLineHeight = 80;

		const voteBar = this.svg.append("rect")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("fill", "#aa7a60")
			.attr("rx", voteBarRaduis)
			.attr("ry", voteBarRaduis);

		const voteBarAppliedWidth = (VOTE_BAR_WIDTH - 4 * voteBarInnerMargin - voteShiftLineWidth) * votesPerProject / (votesNotDedicated + votesPerProject);
		const voteBarApplied = this.svg.append("rect")
			.attr("width", voteBarAppliedWidth)
			.attr("height", innerBarHeight)
			.attr("fill", "#61aba9")
			.attr("rx", voteBarRaduis)
			.attr("ry", voteBarRaduis)
			.attr("x", voteBarInnerMargin)
			.attr("y", voteBarInnerMargin);

		const voteBarFreedUpWidth = (VOTE_BAR_WIDTH - 4 * voteBarInnerMargin - voteShiftLineWidth) * votesNotDedicated / (votesNotDedicated + votesPerProject);
		const voteBarFreedUp = this.svg.append("rect")
			.attr("width", voteBarFreedUpWidth)
			.attr("height", innerBarHeight)
			.attr("fill", "#fff")
			.attr("rx", voteBarRaduis)
			.attr("ry", voteBarRaduis)
			.attr("x", 3 * voteBarInnerMargin + voteBarAppliedWidth + voteShiftLineWidth)
			.attr("y", voteBarInnerMargin);

		const voteShiftLineX = 2 * voteBarInnerMargin + voteBarAppliedWidth;
		const voteShiftLine = this.svg.append("rect")
			.attr("width", voteShiftLineWidth)
			.attr("height", voteShiftLineHeight)
			.attr("fill", "#9a9288")
			.attr("x", voteShiftLineX)
			.attr("y", -10)
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended));

		const appliedVote = this.svg.append('text')
			.style("font-size", "12px")
			.style("fill", "#61aba9")
			.text(`${votesPerProject}`)
			.attr("x", voteShiftLineX - 45)
			.attr("y", VOTE_BAR_HEIGHT + 15);

		appliedVote.append("tspan")
			.style("font-size", "12px")
			.style("fill", "#9a9288")
			.text("votes")
			.attr("dx", 5);

		appliedVote.append("tspan")
			.style("font-size", "12px")
			.style("fill", "#9a9288")
			.text("applied")
			.attr("dx", -40)
			.attr("dy", 15);

		const freedUpVote = this.svg.append('text')
			.style("font-size", "12px")
			.style("fill", "#9a9288")
			.text(`${votesNotDedicated}`)
			.attr("x", voteShiftLineX + 10)
			.attr("y", VOTE_BAR_HEIGHT + 15);

		freedUpVote.append("tspan")
			.style("font-size", "12px")
			.text("votes")
			.attr("dx", 5);

		freedUpVote.append("tspan")
			.style("font-size", "12px")
			.text("freed up")
			.attr("dx", -40)
			.attr("dy", 15);

		const dragstarted = () => {
			d3.select(this).raise().classed("active", true);
		};
		// for some reason need to be es5
		function dragged() {
			const voteShiftLineX = d3.event.x;
			if (voteShiftLineX >= 2 * voteBarInnerMargin && voteShiftLineX < VOTE_BAR_WIDTH - 2 * voteBarInnerMargin - voteShiftLineWidth) {
				d3.select(this)
					.attr("x", voteShiftLineX);

				voteBarApplied.attr("width", voteShiftLineX - 2 * voteBarInnerMargin);
				voteBarFreedUp.attr("width", VOTE_BAR_WIDTH - voteShiftLineX - voteShiftLineWidth - 2 * voteBarInnerMargin)
					.attr("x", voteShiftLineX + 2 * voteBarInnerMargin);
				appliedVote.attr("x", voteShiftLineX - 45);
				freedUpVote.attr("x", voteShiftLineX + 10);
			} else if (voteShiftLineX < 2 * voteBarInnerMargin) {
				d3.select(this)
					.attr("x", 2 * voteBarInnerMargin);

				voteBarApplied.attr("width", 0);
				voteBarFreedUp.attr("width", VOTE_BAR_WIDTH - 4 * voteBarInnerMargin - voteShiftLineWidth)
					.attr("x", 3 * voteBarInnerMargin + voteShiftLineWidth);
			} else if (voteShiftLineX > VOTE_BAR_WIDTH - 2 * voteBarInnerMargin - voteShiftLineWidth) {
				d3.select(this)
					.attr("x", VOTE_BAR_WIDTH - 2 * voteBarInnerMargin - voteShiftLineWidth);

				voteBarFreedUp.attr("width", 0)
					.attr("x", VOTE_BAR_WIDTH - 2 * voteBarInnerMargin);
				voteBarApplied.attr("width", VOTE_BAR_WIDTH - 4 * voteBarInnerMargin - voteShiftLineWidth);
			}
		}

		const dragended = () => {
			d3.select(this).classed("active", false);
		};
	}

	handleClick() {
		// make call to blockchain
	}

	render() {
		return (
			<div className="vote-shift-tool">
				<button className="vote-shift-tool-log-button" onClick={this.handleClick}>log</button>
			</div>
		);
	}
}

VoteShiftTool.defaultProps = {
	votesMockup: {
		votesPerProject: 200,
		votesNotDedicated: 500
	}
};

export default VoteShiftTool;