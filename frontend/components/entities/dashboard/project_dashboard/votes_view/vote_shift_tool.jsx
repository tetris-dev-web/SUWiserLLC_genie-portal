import React from 'react';
import * as d3 from 'd3';

const VOTE_BAR_WIDTH = 140;
const VOTE_BAR_HEIGHT = 25;
const VOTE_BAR_INNER_MARGIN = 5;
const VOTE_BAR_RADIUS = 8;
const VOTE_SHIFT_LINE_WIDTH = 5;
const VOTE_SHIFT_LINE_HEIGHT = 80;
const INNER_BAR_HEIGHT = VOTE_BAR_HEIGHT - 2 * VOTE_BAR_INNER_MARGIN;


class VoteShiftTool extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showLogButton: false
		};

		const { votesPerProject, votesNotDedicated } = this.props.votesMockup;
		this.totalVotes = votesPerProject + votesNotDedicated;
		this.votesPerPixel = this.totalVotes / (VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH);
		this.appliedVotes = null;
		this.freedUpVotes = null;
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.svg = d3.select(this.root)
			.append("svg")
			.classed("votes-view-svg", true)
			.attr("width", VOTE_BAR_WIDTH)
			.attr("height", VOTE_BAR_HEIGHT);

		this.setup();
	}

	setup() {
		const { votesPerProject, votesNotDedicated } = this.props.votesMockup;

		const voteBar = this.svg.append("rect")
			.attr("class", "vote-bar")
			.attr("rx", VOTE_BAR_RADIUS)
			.attr("ry", VOTE_BAR_RADIUS);

		const voteBarAppliedWidth = (VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH) * votesPerProject / (votesNotDedicated + votesPerProject);
		const voteBarApplied = this.svg.append("rect")
			.attr("class", "vote-bar-applied")
			.attr("width", voteBarAppliedWidth)
			.attr("height", INNER_BAR_HEIGHT)
			.attr("rx", VOTE_BAR_RADIUS)
			.attr("ry", VOTE_BAR_RADIUS)
			.attr("x", VOTE_BAR_INNER_MARGIN)
			.attr("y", VOTE_BAR_INNER_MARGIN);

		const voteBarFreedUpWidth = (VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH) * votesNotDedicated / (votesNotDedicated + votesPerProject);
		const voteBarFreedUp = this.svg.append("rect")
			.attr("class", "vote-bar-freedup")
			.attr("width", voteBarFreedUpWidth)
			.attr("height", INNER_BAR_HEIGHT)
			.attr("rx", VOTE_BAR_RADIUS)
			.attr("ry", VOTE_BAR_RADIUS)
			.attr("x", 3 * VOTE_BAR_INNER_MARGIN + voteBarAppliedWidth + VOTE_SHIFT_LINE_WIDTH)
			.attr("y", VOTE_BAR_INNER_MARGIN);

		const dragged = () => {
			const voteShiftLineX = d3.event.x;
			if (voteShiftLineX >= 2 * VOTE_BAR_INNER_MARGIN && voteShiftLineX < VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH) {
				voteShiftLine.attr("x", voteShiftLineX);

				const voteBarAppliedWidth = voteShiftLineX - 2 * VOTE_BAR_INNER_MARGIN;
				const voteBarFreedUpWidth = VOTE_BAR_WIDTH - voteShiftLineX - VOTE_SHIFT_LINE_WIDTH - 2 * VOTE_BAR_INNER_MARGIN;
				voteBarApplied.attr("width", voteBarAppliedWidth);
				voteBarFreedUp.attr("width", voteBarFreedUpWidth)
					.attr("x", voteShiftLineX + 2 * VOTE_BAR_INNER_MARGIN);

				const appliedVotes = Math.floor(this.votesPerPixel * voteBarAppliedWidth);
				appliedVoteContainer.attr("x", voteShiftLineX - 45);
				appliedVoteNumber.text(appliedVotes);
				appliedVoteText.attr("dx", -25 - String(appliedVotes).length * 5);
				this.appliedVotes = appliedVotes;

				const freedUpVotes = Math.ceil(this.votesPerPixel * voteBarFreedUpWidth);
				freedUpVoteContainer.attr("x", voteShiftLineX + 10);
				freedUpVoteNumber.text(freedUpVotes);
				freedUpVoteText.attr("dx", -25 - String(freedUpVotes).length * 5);
				this.freedUpVotes = freedUpVotes;
			} else if (voteShiftLineX < 2 * VOTE_BAR_INNER_MARGIN) {
				voteShiftLine.attr("x", 2 * VOTE_BAR_INNER_MARGIN);

				voteBarApplied.attr("width", 0);
				voteBarFreedUp.attr("width", VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH)
					.attr("x", 3 * VOTE_BAR_INNER_MARGIN + VOTE_SHIFT_LINE_WIDTH);

				appliedVoteContainer.attr("x", -35);
				appliedVoteNumber.text("0");
				appliedVoteText.attr("dx", -30);

				freedUpVoteContainer.attr("x", 20);
				freedUpVoteNumber.text(this.totalVotes);
				freedUpVoteText.attr("dx", -25 - String(this.totalVotes).length * 5);
			} else if (voteShiftLineX > VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH) {
				voteShiftLine.attr("x", VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH);

				voteBarFreedUp.attr("width", 0)
					.attr("x", VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN);
				voteBarApplied.attr("width", VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH);

				appliedVoteContainer.attr("x", 80);
				appliedVoteNumber.text(this.totalVotes);
				appliedVoteText.attr("dx", -25 - String(this.totalVotes).length * 5);

				freedUpVoteContainer.attr("x", 135);
				freedUpVoteNumber.text(0);
				freedUpVoteText.attr("dx", -30);
			}
		};
		
		const dragstarted = () => {
			voteShiftLine.raise().classed("active", true);
		};
		
		const dragended = () => {
			voteShiftLine.classed("active", false);
			const { votesPerProject, votesNotDedicated } = this.props.votesMockup;
			if (votesPerProject === this.appliedVotes && votesNotDedicated === this.freedUpVotes) {
				this.setState({showLogButton: false});
			} else {
				this.setState({ showLogButton: true });
			}
		};

		const voteShiftLineX = 2 * VOTE_BAR_INNER_MARGIN + voteBarAppliedWidth;
		const voteShiftLine = this.svg.append("rect")
			.attr("width", VOTE_SHIFT_LINE_WIDTH)
			.attr("height", VOTE_SHIFT_LINE_HEIGHT)
			.attr("fill", "#9a9288")
			.attr("x", voteShiftLineX)
			.attr("y", -10)
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
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

	}

	handleClick() {
		d3.select(".vote-shift-tool").attr("class", "vote-shift-tool-loading");
		setTimeout(() => {
			d3.select(".vote-shift-tool-loading").attr("class", "vote-shift-tool");
		}, 1000); // simulate blockchain call
	}

	render() {
		return (
			<div className="vote-shift-tool" ref={node => this.root = node}>
				{
					this.state.showLogButton &&
					<button className="vote-shift-tool-log-button" onClick={this.handleClick}>log</button>
				}
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