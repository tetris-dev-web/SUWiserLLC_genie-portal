import React, { useEffect, useRef } from "react";
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

const VoteShiftTool = ({
  votesPerProject,
  votesNotDedicated,
  votingInstance,
  fetchFreeVotes,
  fetchProjectVotes,
  fetchDemoInvestorFreeVotes,
  fetchDemoInvestorProjectVotes,
  projectContract,
  votingToken,
  account,
  selectedProject,
  accountVotes,
  voteAndUpdateProjects,
  demoInvestorVoteAndUpdateProjects,
  projects,
  activation,
  projectLeaderTracker,
  web3,
  updateTransactionModal,
}) => {
  const [state, setState] = React.useState({
    showLogButton: false,
    blockchainLoading: false,
    newVotesPerProject: 0,
    newVotesNotDedicated: 0,
    voteBarAppliedWidth: 0,
    voteBarFreedUpWidth: 0,
    voteShiftLineLeft: 0,
    offsetX: 0,
  });
  const shiftLine = useRef(null);
  const voteBarContainer = useRef(null);
  const voteBarApplied = useRef(null);
  const voteBarFreedup = useRef(null);

  useEffect(() => {
    fetchVoteData();
    watchVoteChange();
  }, []);

  useEffect(() => {
    // const votesPerProject = accountVotes[selectedProject];
    // const votesNotDedicated = accountVotes.freeVotes;
    const totalVotes = votesNotDedicated + votesPerProject;
    const votesPerPixel =
      totalVotes / (VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH);

    const voteBarAppliedWidth = votesPerProject === 0 ? 0 : votesPerProject / votesPerPixel;
    const voteBarFreedUpWidth = votesNotDedicated === 0 ? 0 : votesNotDedicated / votesPerPixel;

    setState((c) =>
      merge({}, c, {
        totalVotes,
        votesPerPixel,
        showLogButton: false,
        blockchainLoading: false,
        newVotesPerProject: votesPerProject,
        newVotesNotDedicated: votesNotDedicated,
        voteBarAppliedWidth,
        voteBarFreedUpWidth,
        voteShiftLineLeft: 2 * VOTE_BAR_INNER_MARGIN + voteBarAppliedWidth,
      }),
    );
  }, [votesNotDedicated, votesPerProject]);

  const fetchVoteData = () => {
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
    setState((c) =>
      merge({}, c, {
        offsetX: e.clientX - shiftLine.current.getBoundingClientRect().left,
      }),
    );

    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragging = (e) => {
    const mouseX = e.clientX - voteBarContainer.current.getBoundingClientRect().left;
    let voteShiftLineLeft = mouseX - state.offsetX;

    if (voteShiftLineLeft < 2 * VOTE_BAR_INNER_MARGIN) {
      voteShiftLineLeft = 2 * VOTE_BAR_INNER_MARGIN;
    }

    if (voteShiftLineLeft > VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH) {
      voteShiftLineLeft = VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH;
    }

    const voteBarAppliedWidth = voteShiftLineLeft - 2 * VOTE_BAR_INNER_MARGIN;
    const voteBarFreedUpWidth =
      VOTE_BAR_WIDTH - voteShiftLineLeft - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH;

    setState((c) =>
      merge({}, c, {
        newVotesPerProject: Math.ceil(voteBarAppliedWidth * c.votesPerPixel),
        newVotesNotDedicated: Math.floor(voteBarFreedUpWidth * c.votesPerPixel),
        voteBarAppliedWidth,
        voteBarFreedUpWidth,
        voteShiftLineLeft,
      }),
    );
  };

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleDragging);
    document.removeEventListener("mouseup", handleDragEnd);
    setState((c) =>
      merge({}, c, {
        showLogButton: !(
          c.newVotesPerProject === votesPerProject && c.newVotesNotDedicated === votesNotDedicated
        ),
      }),
    );
  };

  const handleLogClick = () => {
    setState((c) => merge({}, c, { blockchainLoading: !c.blockchainLoading }));
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
    return () => {
      if (
        (vote > 0 && state.totalVotes === state.newVotesPerProject) ||
        (vote < 0 && state.newVotesPerProject === 0)
      )
        return;
      const voteShiftLineLeft = state.voteShiftLineLeft + vote / state.votesPerPixel;
      const voteBarAppliedWidth = voteShiftLineLeft - 2 * VOTE_BAR_INNER_MARGIN;
      const voteBarFreedUpWidth =
        VOTE_BAR_WIDTH - voteShiftLineLeft - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH;

      setState((c) =>
        merge({}, c, {
          newVotesPerProject: c.newVotesPerProject + vote,
          newVotesNotDedicated: c.newVotesNotDedicated - vote,
          voteBarAppliedWidth,
          voteBarFreedUpWidth,
          voteShiftLineLeft,
          showLogButton: !(
            c.newVotesPerProject + vote === votesPerProject &&
            c.newVotesNotDedicated - vote === votesNotDedicated
          ),
        }),
      );
    };
  };

  const watchVoteChange = () => {
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
            ref={voteBarContainer}
          >
            <div
              className="vote-bar-applied"
              style={{
                height: INNER_BAR_HEIGHT,
                width: state.voteBarAppliedWidth,
                borderRadius: VOTE_BAR_RADIUS,
              }}
              ref={voteBarApplied}
            ></div>

            <div
              className="vote-bar-shift-line"
              style={{
                height: VOTE_SHIFT_LINE_HEIGHT,
                width: VOTE_SHIFT_LINE_WIDTH,
                left: state.voteShiftLineLeft,
              }}
              ref={shiftLine}
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
              ref={voteBarFreedup}
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
  }
  return []; //make loader
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
