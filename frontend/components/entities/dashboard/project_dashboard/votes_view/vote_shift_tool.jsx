import React from 'react';
import * as d3 from 'd3';

const VOTE_BAR_WIDTH = 140;
const VOTE_BAR_HEIGHT = 25;

class VoteShiftTool extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		this.svg = d3.select(".vote-shift-tool")
			.append("svg")
			.attr("width", VOTE_BAR_WIDTH)
			.attr("height", VOTE_BAR_HEIGHT);

		this.setup();
	}

	setup() {
		const { appliedVotes, userTotalVotes } = this.props.votesMockup;
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

		const voteBarAppliedWidth = (VOTE_BAR_WIDTH - 4 * voteBarInnerMargin - voteShiftLineWidth) * appliedVotes / userTotalVotes;
		const voteBarApplied = this.svg.append("rect")
			.attr("width", voteBarAppliedWidth)
			.attr("height", innerBarHeight)
			.attr("fill", "#61aba9")
			.attr("rx", voteBarRaduis)
			.attr("ry", voteBarRaduis)
			.attr("x", voteBarInnerMargin)
			.attr("y", voteBarInnerMargin);

		const voteBarFreedUpWidth = (VOTE_BAR_WIDTH - 4 * voteBarInnerMargin - voteShiftLineWidth) * (userTotalVotes - appliedVotes) / userTotalVotes;
		const voteBarFreedUp = this.svg.append("rect")
			.attr("width", voteBarFreedUpWidth)
			.attr("height", innerBarHeight)
			.attr("fill", "#fff")
			.attr("rx", voteBarRaduis)
			.attr("ry", voteBarRaduis)
			.attr("x", 3 * voteBarInnerMargin + voteBarAppliedWidth + voteShiftLineWidth)
			.attr("y", voteBarInnerMargin);

		const voteShiftLine = this.svg.append("rect")
			// .attr("stroke", "#9a9288")
			// .attr("stroke-width", voteShiftLineWidth)
			.attr("width", voteShiftLineWidth)
			.attr("height", voteShiftLineHeight)
			.attr("fill", "#9a9288")
			.attr("x", 2 * voteBarInnerMargin + voteBarAppliedWidth)
			.attr("y", -10)
			// .attr("x2", 2 * voteBarInnerMargin + voteBarAppliedWidth + .5 * voteShiftLineWidth)
			// .attr("y2", -10 + voteShiftLineLength)
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended));

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
			} else if (voteShiftLineX < 2 * voteBarInnerMargin) {
				d3.select(this)
					.attr("x", 2 * voteBarInnerMargin);

				voteBarApplied.attr("width", 0);
			} else if (voteShiftLineX > VOTE_BAR_WIDTH - 2 * voteBarInnerMargin - voteShiftLineWidth) {
				d3.select(this)
					.attr("x", VOTE_BAR_WIDTH - 2 * voteBarInnerMargin - voteShiftLineWidth);
			}
		}

		const dragended = () => {
			d3.select(this).classed("active", false);
		};
	}

	render() {
		return (
			<div className="vote-shift-tool"></div>
		);
	}
}

VoteShiftTool.defaultProps = {
	votesMockup: {
		appliedVotes: 200,
		userTotalVotes: 500
	}
};

export default VoteShiftTool;