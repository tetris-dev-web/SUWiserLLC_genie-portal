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
      showLogButton: false,
      appliedVotes: this.props.votesPerProject,
      freedupVotes: this.props.votesNotDedicated
    };
  }

  render() {
    return(
      <g className="vote_shift_tool">

      </g>
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