import React, { useEffect } from "react";
import "./vote_shift_tool.scss";
import { merge } from "lodash";
// TODO make into object
const VOTE_BAR_WIDTH = 140;
const VOTE_BAR_HEIGHT = 25;
const VOTE_BAR_INNER_MARGIN = 5;
const VOTE_BAR_RADIUS = 8;
const VOTE_SHIFT_LINE_WIDTH = 5;
const VOTE_SHIFT_LINE_HEIGHT = 80;
const INNER_BAR_HEIGHT = VOTE_BAR_HEIGHT - 2 * VOTE_BAR_INNER_MARGIN;

const VoteShiftTool = (props) => {
  const { votesNotDedicated, votesPerProject } = props;
  const [state, setState] = React.useState({
    showLogButton: false,
    blockchainLoading: false,
    newVotesPerProject: 0,
    newVotesNotDedicated: 0,
    voteBarAppliedWidth: 0,
    voteBarFreedUpWidth: 0,
    voteShiftLineLeft: 0,
  });

  let offsetX, shiftLine, votesPerPixel;
  let totalVotes;
  let voteBarContainer, voteBarApplied, voteBarFreedup;

  useEffect(() => {
    fetchVoteData();
    watchVoteChange();
    populateState();
  }, []);

  useEffect(() => {
    populateState();
  }, [votesNotDedicated, votesPerProject]);

  const fetchVoteData = () => {
    const {
      fetchFreeVotes,
      fetchProjectVotes,
      fetchDemoInvestorFreeVotes,
      fetchDemoInvestorProjectVotes,
      projectContract,
      votingToken,
      account,
      selectedProject,
      // loggedInToMetaMask
    } = props;

    // if (loggedInToMetaMask) {
    // fetchFreeVotes(account, votingToken).then(() => {
    //   fetchProjectVotes(account, projectContract, selectedProject);
    // })
    // } else {
    fetchDemoInvestorFreeVotes().then(() => fetchDemoInvestorProjectVotes(selectedProject));
    // }
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    offsetX = e.clientX - shiftLine.getBoundingClientRect().left;

    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragging = (e) => {
    const mouseX = e.clientX - voteBarContainer.getBoundingClientRect().left;
    let voteShiftLineLeft = mouseX - offsetX;

    if (voteShiftLineLeft < 2 * VOTE_BAR_INNER_MARGIN) {
      voteShiftLineLeft = 2 * VOTE_BAR_INNER_MARGIN;
    }

    if (voteShiftLineLeft > VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH) {
      voteShiftLineLeft = VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH;
    }

    const voteBarAppliedWidth = voteShiftLineLeft - 2 * VOTE_BAR_INNER_MARGIN;
    const voteBarFreedUpWidth =
      VOTE_BAR_WIDTH - voteShiftLineLeft - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH;

    setState(
      merge({}, state, {
        newVotesPerProject: Math.ceil(voteBarAppliedWidth * votesPerPixel),
        newVotesNotDedicated: Math.floor(voteBarFreedUpWidth * votesPerPixel),
        voteBarAppliedWidth,
        voteBarFreedUpWidth,
        voteShiftLineLeft,
      }),
    );
  };

  const handleDragEnd = () => {
    const { votesPerProject, votesNotDedicated } = props;

    document.removeEventListener("mousemove", handleDragging);
    document.removeEventListener("mouseup", handleDragEnd);
    setState(
      merge({}, state, {
        showLogButton: !(
          state.newVotesPerProject === votesPerProject && newVotesNotDedicated === votesNotDedicated
        ),
      }),
    );
  };

  const handleLogClick = () => {
    setState(merge({}, state, { blockchainLoading: !state.blockchainLoading }));

    const {
      account,
      votingInstance,
      selectedProject,
      votesPerProject,
      voteAndUpdateProjects,
      demoInvestorVoteAndUpdateProjects,
      projects,
      activation,
      projectLeaderTracker,
      web3,
      updateTransactionModal,
    } = props;
    const { newVotesPerProject } = state;

    let type;
    let votes;
    if (newVotesPerProject > votesPerProject) {
      type = "addVotes";
      votes = newVotesPerProject - votesPerProject;
    } else {
      type = "removeVotes";
      votes = votesPerProject - newVotesPerProject;
    }
    // voteAndUpdateProjects(
    //   account,
    //   votes,
    //   type,
    //   votingInstance,
    //   selectedProject,
    //   projects,
    //   projectLeaderTracker,
    //   activation,
    //   web3
    // );

    demoInvestorVoteAndUpdateProjects(votes, type, selectedProject);

    updateTransactionModal({
      isOpen: true,
      title: "YOUR TRANSACTION HAS BEEN SENT",
      message: "It may take a few minutes for your transaction to be processed by the blockchain.",
    });
  };

  const handleVoteClick = (vote) => {
    const { votesPerProject, votesNotDedicated } = props;

    return () => {
      if (
        (vote > 0 && totalVotes === state.newVotesPerProject) ||
        (vote < 0 && state.newVotesPerProject === 0)
      )
        return;
      const voteShiftLineLeft = state.voteShiftLineLeft + vote / votesPerPixel;
      const voteBarAppliedWidth = voteShiftLineLeft - 2 * VOTE_BAR_INNER_MARGIN;
      const voteBarFreedUpWidth =
        VOTE_BAR_WIDTH - voteShiftLineLeft - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH;

      setState(
        merge({}, state, {
          newVotesPerProject: state.newVotesPerProject + vote,
          newVotesNotDedicated: state.newVotesNotDedicated - vote,
          voteBarAppliedWidth,
          voteBarFreedUpWidth,
          voteShiftLineLeft,
          showLogButton: !(
            state.newVotesPerProject + vote === votesPerProject &&
            state.newVotesNotDedicated - vote === votesNotDedicated
          ),
        }),
      );
    };
  };

  const populateState = () => {
    const { votesNotDedicated, votesPerProject } = props;
    // const votesPerProject = this.props.accountVotes[this.props.selectedProject];
    // const votesNotDedicated = this.props.accountVotes.freeVotes;
    offsetX = 0;
    totalVotes = votesNotDedicated + votesPerProject;
    votesPerPixel =
      totalVotes / (VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH);

    const voteBarAppliedWidth = votesPerProject === 0 ? 0 : votesPerProject / votesPerPixel;
    const voteBarFreedUpWidth = votesNotDedicated === 0 ? 0 : votesNotDedicated / votesPerPixel;

    setState(
      merge({}, state, {
        showLogButton: false,
        blockchainLoading: false,
        newVotesPerProject: votesPerProject,
        newVotesNotDedicated: votesNotDedicated,
        voteBarAppliedWidth,
        voteBarFreedUpWidth,
        voteShiftLineLeft: 2 * VOTE_BAR_INNER_MARGIN + voteBarAppliedWidth,
      }),
    );
  };

  const watchVoteChange = () => {
    const { votingInstance } = props;
    votingInstance.VoteChange().watch((error, event) => {
      fetchVoteData();
    });
  };

  if (
    (votesPerProject || votesPerProject === 0) &&
    (votesNotDedicated || votesNotDedicated === 0)
  ) {
    return (
      <React.Fragment>
        <div
          className={state.blockchainLoading ? "vote-bar-loading" : "vote-bar"}
          style={{
            width: VOTE_BAR_WIDTH,
            height: VOTE_BAR_HEIGHT,
            borderRadius: VOTE_BAR_RADIUS,
          }}
        >
          <div
            className="vote-bar-inner-container"
            style={{ padding: VOTE_BAR_INNER_MARGIN }}
            ref={(node) => (voteBarContainer = node)}
          >
            <div
              className="vote-bar-applied"
              style={{
                height: INNER_BAR_HEIGHT,
                width: state.voteBarAppliedWidth,
                borderRadius: VOTE_BAR_RADIUS,
              }}
              ref={(node) => (voteBarApplied = node)}
            ></div>

            <div
              className="vote-bar-shift-line"
              style={{
                height: VOTE_SHIFT_LINE_HEIGHT,
                width: VOTE_SHIFT_LINE_WIDTH,
                left: state.voteShiftLineLeft,
              }}
              ref={(node) => (shiftLine = node)}
              onMouseDown={handleDragStart}
            >
              <span className="vote-bar-applied-votes-number">
                {`${state.newVotesPerProject} votes applied`}
              </span>
              <span className="vote-bar-freedup-votes-number">
                {`${state.newVotesNotDedicated} votes freed up`}
              </span>
              <span onClick={handleVoteClick(1)} className="vote-bar-add-vote-button">
                {">"}
              </span>
              <span onClick={handleVoteClick(-1)} className="vote-bar-minus-vote-button">
                {"<"}
              </span>
            </div>

            <div
              className="vote-bar-freedup"
              style={{
                height: INNER_BAR_HEIGHT,
                width: state.voteBarFreedUpWidth,
                borderRadius: VOTE_BAR_RADIUS,
              }}
              ref={(node) => (voteBarFreedup = node)}
            ></div>
          </div>
        </div>
        {state.showLogButton && (
          <button className="vote-shift-tool-log-button" onClick={handleLogClick}>
            log
          </button>
        )}
      </React.Fragment>
    );
  } else {
    return []; //make loader
  }
};

VoteShiftTool.defaultProps = {
  votesMockup: {
    votesPerProject: 200,
    votesNotDedicated: 500,
  },
};

//CONTAINER
import { connect } from "react-redux";
import {
  fetchFreeVotes,
  fetchProjectVotes,
  fetchDemoInvestorFreeVotes,
  fetchDemoInvestorProjectVotes,
  voteForProject,
  voteAgainstProject,
  voteAndUpdateProjects,
  demoInvestorVoteAndUpdateProjects,
} from "../../../../../actions/chain_actions/votes_actions";
import { updateTransactionModal } from "../../../../../actions/ui_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    projectContract: state.network.projectContract,
    votingToken: state.network.votingTokenInstance,
    votingInstance: state.network.votingInstance,
    account: state.network.account,
    votesNotDedicated: Number(state.chain_data.projectGraph.votes.freeVotes) || 0,
    votesPerProject: Number(state.chain_data.projectGraph.votes[ownProps.selectedProject]) || 0,
    projects: state.chain_data.projects,
    activation: state.network.activationInstance,
    projectLeaderTracker: state.network.projectLeaderTrackerInstance,
    web3: state.network.web3,
    crowdsaleInstance: state.network.crowdsaleInstance,
    inactiveTokenInstance: state.network.inactiveTokenInstance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFreeVotes: (account, votingToken) => dispatch(fetchFreeVotes(account, votingToken)),
    fetchProjectVotes: (account, projectContract, projectAddress) =>
      dispatch(fetchProjectVotes(account, projectContract, projectAddress)),
    fetchDemoInvestorFreeVotes: () => dispatch(fetchDemoInvestorFreeVotes()),
    fetchDemoInvestorProjectVotes: (projectAddress) =>
      dispatch(fetchDemoInvestorProjectVotes(projectAddress)),
    voteAndUpdateProjects: (
      account,
      votes,
      type,
      votingInstance,
      projectAddress,
      projects,
      projectLeaderTracker,
      activation,
      web3,
    ) => {
      return voteAndUpdateProjects(
        account,
        votes,
        type,
        votingInstance,
        projectAddress,
        projects,
        projectLeaderTracker,
        activation,
        web3,
      );
    },
    updateTransactionModal: (modalInfo) => dispatch(updateTransactionModal(modalInfo)),
    demoInvestorVoteAndUpdateProjects: (votes, type, selectedProject) =>
      demoInvestorVoteAndUpdateProjects(votes, type, selectedProject),
    // voteForProject: (account, votes, votingInstance, projectAddress) => voteForProject(account, votes, votingInstance, projectAddress),
    // voteAgainstProject: (account, votes, votingInstance, projectAddress) => voteAgainstProject(account, votes, votingInstance, projectAddress)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VoteShiftTool);
