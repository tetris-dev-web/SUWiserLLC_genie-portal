import React from 'react';
import * as d3 from 'd3';

class VoteShiftTool extends React.Component {
	constructor(props) {
		super(props);

		this.state = Object.assign({}, this.props.votesMockup);
	}

	componentDidMount() {
		this.setup();
	}

	setup() {
		const { appliedVotes, userTotalVotes } = this.state;
		const voteBarWidth = 140;
		const voteBarHeight = 25;
		const voteBarRaduis = 8;
		const innerBarMargin = 5;
		const innerBarHeight = voteBarHeight - 2 * innerBarMargin;
		const voteShiftLineWidth = 5;
		const voteShiftLineLength = 80;

		const svg = d3.select(".vote-shift-tool")
			.append("svg")
			.attr("width", voteBarWidth)
			.attr("height", voteBarHeight);

		const voteBar = svg.append("g")
			.append("rect")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("fill", "#aa7a60")
			.attr("rx", voteBarRaduis)
			.attr("ry", voteBarRaduis);

		const voteBarAppliedWidth = (voteBarWidth - 4 * innerBarMargin - voteShiftLineWidth) * appliedVotes / userTotalVotes;
		const voteBarApplied = svg.append("g")
			.append("rect")
			.attr("width", voteBarAppliedWidth)
			.attr("height", innerBarHeight)
			.attr("fill", "#61aba9")
			.attr("rx", voteBarRaduis)
			.attr("ry", voteBarRaduis)
			.attr("x", innerBarMargin)
			.attr("y", innerBarMargin);

		const voteShiftLine = svg.append("g")
			.append("line")
			.attr("stroke", "#9a9288")
			.attr("stroke-width", voteShiftLineWidth)
			.attr("x1", 2 * innerBarMargin + voteBarAppliedWidth + .5 * voteShiftLineWidth)
			.attr("y1", -10)
			.attr("x2", 2 * innerBarMargin + voteBarAppliedWidth + .5 * voteShiftLineWidth)
			.attr("y2", -10 + voteShiftLineLength)
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended));

		function dragstarted() {
			console.log("drag started");
			d3.select(this).raise().classed("active", true);
		}

		function dragged() {
			console.log("dragging");
			d3.select(this)
				.attr("x1", d3.event.x)
				.attr("x2", d3.event.x);
		}

		function dragended() {
			console.log("drag ended");
			d3.select(this).classed("active", false);
		}

		const voteBarFreedUpWidth = (voteBarWidth - 4 * innerBarMargin - voteShiftLineWidth) * (userTotalVotes - appliedVotes) / userTotalVotes
		const voteBarFreedUp = svg.append("g")
			.append("rect")
			.attr("width", voteBarFreedUpWidth)
			.attr("height", innerBarHeight)
			.attr("fill", "#fff")
			.attr("rx", voteBarRaduis)
			.attr("ry", voteBarRaduis)
			.attr("x", 3 * innerBarMargin + voteBarAppliedWidth + voteShiftLineWidth)
			.attr("y", innerBarMargin);
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