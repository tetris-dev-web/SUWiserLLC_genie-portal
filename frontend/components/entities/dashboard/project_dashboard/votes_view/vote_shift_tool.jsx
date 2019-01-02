import React from 'react';
import * as d3 from 'd3';

const VOTE_BAR_WIDTH = 140;
const VOTE_BAR_HEIGHT = 25;
const VOTE_BAR_INNER_MARGIN = 5;
const VOTE_BAR_RADIUS = 8;
const VOTE_SHIFT_LINE_WIDTH = 5;
const VOTE_SHIFT_LINE_HEIGHT = 80;

class VoteShiftTool extends React.Component {
	constructor(props) {
		super(props);

		this.totalVotes = this.props.votesMockup.votesPerProject + this.props.votesMockup.votesNotDedicated;
		this.votesPerPixel = this.totalVotes / (VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH);
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
		const { votesPerProject, votesNotDedicated } = this.props.votesMockup;
		const totalVotes = votesPerProject + votesNotDedicated;
		const innerBarHeight = VOTE_BAR_HEIGHT - 2 * VOTE_BAR_INNER_MARGIN;

		const voteBar = this.svg.append("rect")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("fill", "#aa7a60")
			.attr("rx", VOTE_BAR_RADIUS)
			.attr("ry", VOTE_BAR_RADIUS);

		const voteBarAppliedWidth = (VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH) * votesPerProject / (votesNotDedicated + votesPerProject);
		const voteBarApplied = this.svg.append("rect")
			.attr("width", voteBarAppliedWidth)
			.attr("height", innerBarHeight)
			.attr("fill", "#61aba9")
			.attr("rx", VOTE_BAR_RADIUS)
			.attr("ry", VOTE_BAR_RADIUS)
			.attr("x", VOTE_BAR_INNER_MARGIN)
			.attr("y", VOTE_BAR_INNER_MARGIN);

		const voteBarFreedUpWidth = (VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH) * votesNotDedicated / (votesNotDedicated + votesPerProject);
		const voteBarFreedUp = this.svg.append("rect")
			.attr("width", voteBarFreedUpWidth)
			.attr("height", innerBarHeight)
			.attr("fill", "#fff")
			.attr("rx", VOTE_BAR_RADIUS)
			.attr("ry", VOTE_BAR_RADIUS)
			.attr("x", 3 * VOTE_BAR_INNER_MARGIN + voteBarAppliedWidth + VOTE_SHIFT_LINE_WIDTH)
			.attr("y", VOTE_BAR_INNER_MARGIN);

		const voteShiftLineX = 2 * VOTE_BAR_INNER_MARGIN + voteBarAppliedWidth;
		const voteShiftLine = this.svg.append("rect")
			.attr("width", VOTE_SHIFT_LINE_WIDTH)
			.attr("height", VOTE_SHIFT_LINE_HEIGHT)
			.attr("fill", "#9a9288")
			.attr("x", voteShiftLineX)
			.attr("y", -10)
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged(this))
				.on("end", dragended));

		const appliedVoteContainer = this.svg.append('text')
			.attr("x", voteShiftLineX - 45)
			.attr("y", VOTE_BAR_HEIGHT + 15);

		const appliedVoteNumber = appliedVoteContainer.append("tspan")
			.style("font-size", "12px")
			.style("fill", "#61aba9")
			.text(`${votesPerProject}`);

		appliedVoteContainer.append("tspan")
			.style("font-size", "12px")
			.style("fill", "#9a9288")
			.text("votes")
			.attr("dx", 5);

		const appliedVoteText = appliedVoteContainer.append("tspan")
			.style("font-size", "12px")
			.style("fill", "#9a9288")
			.text("applied")
			.attr("dx", -25 - String(votesPerProject).length * 5)
			.attr("dy", 15);

		const freedUpVoteContainer = this.svg.append('text')
			.attr("x", voteShiftLineX + 10)
			.attr("y", VOTE_BAR_HEIGHT + 15);

		const freedUpVoteNumber = freedUpVoteContainer.append("tspan")
			.style("font-size", "12px")
			.style("fill", "#9a9288")
			.text(`${votesNotDedicated}`);

		freedUpVoteContainer.append("tspan")
			.style("font-size", "12px")
			.text("votes")
			.attr("dx", 5);

		const freedUpVoteText = freedUpVoteContainer.append("tspan")
			.style("font-size", "12px")
			.text("freed up")
			.attr("dx", -25 - String(votesPerProject).length * 5)
			.attr("dy", 15);

		const dragstarted = () => {
			d3.select(this).raise().classed("active", true);
		};
		// for some reason need to be es5
		function dragged(componentThis) {
			return function() {
				const voteShiftLineX = d3.event.x;
				if (voteShiftLineX >= 2 * VOTE_BAR_INNER_MARGIN && voteShiftLineX < VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH) {
					d3.select(this)
						.attr("x", voteShiftLineX);
					
					const voteBarAppliedWidth = voteShiftLineX - 2 * VOTE_BAR_INNER_MARGIN;
					const voteBarFreedUpWidth = VOTE_BAR_WIDTH - voteShiftLineX - VOTE_SHIFT_LINE_WIDTH - 2 * VOTE_BAR_INNER_MARGIN;
					voteBarApplied.attr("width", voteBarAppliedWidth);
					voteBarFreedUp.attr("width", voteBarFreedUpWidth)
						.attr("x", voteShiftLineX + 2 * VOTE_BAR_INNER_MARGIN);
					
					appliedVoteContainer.attr("x", voteShiftLineX - 45);
					appliedVoteNumber.text(Math.floor(componentThis.votesPerPixel * voteBarAppliedWidth));
					appliedVoteText.attr("dx", -25 - String(Math.floor(componentThis.votesPerPixel * voteBarAppliedWidth)).length * 5);

					freedUpVoteContainer.attr("x", voteShiftLineX + 10);
					freedUpVoteNumber.text(Math.ceil(componentThis.votesPerPixel * voteBarFreedUpWidth));
					freedUpVoteText.attr("dx", -25 - String(Math.ceil(componentThis.votesPerPixel * voteBarFreedUpWidth)).length * 5);
				} else if (voteShiftLineX < 2 * VOTE_BAR_INNER_MARGIN) {
					d3.select(this)
						.attr("x", 2 * VOTE_BAR_INNER_MARGIN);

					voteBarApplied.attr("width", 0);
					voteBarFreedUp.attr("width", VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH)
						.attr("x", 3 * VOTE_BAR_INNER_MARGIN + VOTE_SHIFT_LINE_WIDTH);

					appliedVoteContainer.attr("x", -35);
					appliedVoteNumber.text("0");
					appliedVoteText.attr("dx", -30);

					freedUpVoteContainer.attr("x", 20);
					freedUpVoteNumber.text(totalVotes);
					freedUpVoteText.attr("dx", -25 - String(totalVotes).length * 5);
				} else if (voteShiftLineX > VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH) {
					d3.select(this)
						.attr("x", VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH);

					voteBarFreedUp.attr("width", 0)
						.attr("x", VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN);
					voteBarApplied.attr("width", VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH);

					appliedVoteContainer.attr("x", 80);
					appliedVoteNumber.text(totalVotes);
					appliedVoteText.attr("dx", -25 - String(totalVotes).length * 5);

					freedUpVoteContainer.attr("x", 135);
					freedUpVoteNumber.text(0);
					freedUpVoteText.attr("dx", -30);
				}
			};
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