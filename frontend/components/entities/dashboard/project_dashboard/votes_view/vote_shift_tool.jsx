import React from 'react';
import './vote_shift_tool.scss';


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

    // const { votesPerProject, votesNotDedicated } = this.props.votesMockup;

    // this.offsetX = 0;
    // this.totalVotes = votesPerProject + votesNotDedicated;
    // this.votesPerPixel = this.totalVotes / (VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH);

    // const voteBarAppliedWidth = votesPerProject / this.votesPerPixel;
    // const voteBarFreedUpWidth = votesNotDedicated / this.votesPerPixel;

    this.state = {
      showLogButton: false,
      blockchainLoading: false,
      newVotesPerProject: 0,
      newVotesNotDedicated: 0,
      voteBarAppliedWidth: 0,
      voteBarFreedUpWidth: 0,
      voteShiftLineLeft: 0
    };

    this.fetchVoteData = this.fetchVoteData.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragging = this.handleDragging.bind(this);
    this.handleLogClick = this.handleLogClick.bind(this);
    this.populateState = this.populateState.bind(this);
    this.watchVoteChange = this.watchVoteChange.bind(this);
  }

  componentDidMount () {
    console.log("hello............")
    this.fetchVoteData();
    this.watchVoteChange();
    this.populateState();
  }

  componentDidUpdate (prevProps, prevState) {
    const { votesNotDedicated, votesPerProject } = this.props;
    if (
      votesNotDedicated !== prevProps.votesNotDedicated ||
      votesPerProject !== prevProps.votesPerProject
    ) {
      this.populateState();
    }
  }

  fetchVoteData () {
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
    } = this.props;

    // if (loggedInToMetaMask) {
      // fetchFreeVotes(account, votingToken).then(() => {
      //   fetchProjectVotes(account, projectContract, selectedProject);
      // })
    // } else {
    console.log("WHAT")
      fetchDemoInvestorFreeVotes().then(() => fetchDemoInvestorProjectVotes(selectedProject))
    // }
  }

  handleDragStart(e) {
    e.preventDefault();
    this.offsetX = e.clientX - this.shiftLine.getBoundingClientRect().left;

    document.addEventListener('mousemove', this.handleDragging);
    document.addEventListener('mouseup', this.handleDragEnd);
  }

  handleDragging(e) {
    const mouseX = e.clientX - this.voteBarContainer.getBoundingClientRect().left;
    let voteShiftLineLeft = mouseX - this.offsetX;

    if (voteShiftLineLeft < 2 * VOTE_BAR_INNER_MARGIN) {
      voteShiftLineLeft = 2 * VOTE_BAR_INNER_MARGIN;
    }

    if (voteShiftLineLeft > VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH) {
      voteShiftLineLeft = VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH;
    }

    const voteBarAppliedWidth = voteShiftLineLeft - 2 * VOTE_BAR_INNER_MARGIN;
    const voteBarFreedUpWidth = VOTE_BAR_WIDTH - voteShiftLineLeft - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH;

    this.setState({
      newVotesPerProject: Math.ceil(voteBarAppliedWidth * this.votesPerPixel),
      newVotesNotDedicated: Math.floor(voteBarFreedUpWidth * this.votesPerPixel),
      voteBarAppliedWidth,
      voteBarFreedUpWidth,
      voteShiftLineLeft
    });
  }

  handleDragEnd() {
    const { votesPerProject, votesNotDedicated } = this.props;

    document.removeEventListener('mousemove', this.handleDragging);
    document.removeEventListener('mouseup', this.handleDragEnd);
    this.setState({ showLogButton: !(this.state.newVotesPerProject === votesPerProject && this.state.newVotesNotDedicated === votesNotDedicated) });
  }

  handleLogClick() {
    this.setState({ blockchainLoading: !this.state.blockchainLoading });

    const { account, votingInstance, selectedProject, votesPerProject, voteAndUpdateProjects, demoInvestorVoteAndUpdateProjects, projects, activation, projectLeaderTracker, web3, updateTransactionModal } = this.props;
    const { newVotesPerProject } = this.state;

    let type;
    let votes;
    if (newVotesPerProject > votesPerProject) {
      type = 'addVotes';
      votes = newVotesPerProject - votesPerProject;
    } else {
      type = 'removeVotes';
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

    demoInvestorVoteAndUpdateProjects(
      votes,
      type,
      selectedProject
    )

    updateTransactionModal({
      isOpen: true,
      title: "YOUR TRANSACTION HAS BEEN SENT",
      message: "It may take a few minutes for your transaction to be processed by the blockchain."
    })
  }

  handleVoteClick(vote) {
    const { votesPerProject, votesNotDedicated } = this.props;

    return () => {
      if (vote > 0 && this.totalVotes === this.state.newVotesPerProject ||
        vote < 0 && this.state.newVotesPerProject === 0) return;
      const voteShiftLineLeft = this.state.voteShiftLineLeft + vote / this.votesPerPixel;
      const voteBarAppliedWidth = voteShiftLineLeft - 2 * VOTE_BAR_INNER_MARGIN;
      const voteBarFreedUpWidth = VOTE_BAR_WIDTH - voteShiftLineLeft - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH;

      this.setState({
        newVotesPerProject: this.state.newVotesPerProject + vote,
        newVotesNotDedicated: this.state.newVotesNotDedicated - vote,
        voteBarAppliedWidth,
        voteBarFreedUpWidth,
        voteShiftLineLeft,
        showLogButton: !(this.state.newVotesPerProject + vote === votesPerProject && this.state.newVotesNotDedicated - vote === votesNotDedicated)
      });
    };
  }

  populateState () {
    const { votesNotDedicated, votesPerProject } = this.props;
    // const votesPerProject = this.props.accountVotes[this.props.selectedProject];
    // const votesNotDedicated = this.props.accountVotes.freeVotes;
    this.offsetX = 0;
    this.totalVotes = votesNotDedicated + votesPerProject;
    this.votesPerPixel = this.totalVotes / (VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH);

    const voteBarAppliedWidth = votesPerProject === 0 ? 0 : votesPerProject / this.votesPerPixel;
    const voteBarFreedUpWidth = votesNotDedicated === 0 ? 0 : votesNotDedicated / this.votesPerPixel;

    this.setState({
      showLogButton: false,
      blockchainLoading: false,
      newVotesPerProject: votesPerProject,
      newVotesNotDedicated: votesNotDedicated,
      voteBarAppliedWidth,
      voteBarFreedUpWidth,
      voteShiftLineLeft: 2 * VOTE_BAR_INNER_MARGIN + voteBarAppliedWidth
    })
  }

  watchVoteChange () {
    this.props.votingInstance.VoteChange().watch((error, event) => {
      this.fetchVoteData();
    })
  }

  render() {
    const { votesPerProject, votesNotDedicated } = this.props;
    if (
        (votesPerProject || votesPerProject === 0) &&
        (votesNotDedicated || votesNotDedicated === 0)
      ) {
      return(
        <React.Fragment>

          <div className={this.state.blockchainLoading ? "vote-bar-loading" : "vote-bar"} style={{
              width: VOTE_BAR_WIDTH,
              height: VOTE_BAR_HEIGHT,
              borderRadius: VOTE_BAR_RADIUS
            }}>

            <div className="vote-bar-inner-container"
              style={{padding: VOTE_BAR_INNER_MARGIN}}
              ref={node => this.voteBarContainer = node}>
              <div className="vote-bar-applied" style={{
                  height: INNER_BAR_HEIGHT,
                  width: this.state.voteBarAppliedWidth,
                  borderRadius: VOTE_BAR_RADIUS
                }}
                ref={node => this.voteBarApplied = node}></div>

              <div className="vote-bar-shift-line" style={{
                  height: VOTE_SHIFT_LINE_HEIGHT,
                  width: VOTE_SHIFT_LINE_WIDTH,
                  left: this.state.voteShiftLineLeft
                }}
                ref={node => this.shiftLine = node}
                onMouseDown={this.handleDragStart}>
                <span className="vote-bar-applied-votes-number">
                  {`${this.state.newVotesPerProject} votes applied`}
                </span>
                <span className="vote-bar-freedup-votes-number">
                  {`${this.state.newVotesNotDedicated} votes freed up`}
                </span>
                <span onClick={this.handleVoteClick(1)} className="vote-bar-add-vote-button">{">"}</span>
                <span onClick={this.handleVoteClick(-1)} className="vote-bar-minus-vote-button">{"<"}</span>
              </div>

              <div className="vote-bar-freedup" style={{
                  height: INNER_BAR_HEIGHT,
                  width: this.state.voteBarFreedUpWidth,
                  borderRadius: VOTE_BAR_RADIUS,
                }}
                ref={node => this.voteBarFreedup = node}></div>
            </div>
          </div>
          {
            this.state.showLogButton &&
            <button className="vote-shift-tool-log-button" onClick={this.handleLogClick}>log</button>
          }
        </React.Fragment>
      );
    } else {
      return []; //make loader
    }
  }
}

VoteShiftTool.defaultProps = {
  votesMockup: {
    votesPerProject: 200,
    votesNotDedicated: 500
  }
};


//CONTAINER
import { connect } from 'react-redux';
import {
  fetchFreeVotes,
  fetchProjectVotes,
  fetchDemoInvestorFreeVotes,
  fetchDemoInvestorProjectVotes,
  voteForProject,
  voteAgainstProject,
  voteAndUpdateProjects,
  demoInvestorVoteAndUpdateProjects
} from '../../../../../actions/chain_actions/votes_actions';
import { updateTransactionModal } from '../../../../../actions/ui_actions';

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
    inactiveTokenInstance: state.network.inactiveTokenInstance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFreeVotes: (account, votingToken) => dispatch(fetchFreeVotes(account, votingToken)),
    fetchProjectVotes: (account, projectContract, projectAddress) => dispatch(fetchProjectVotes(account, projectContract, projectAddress)),
    fetchDemoInvestorFreeVotes: () => dispatch(fetchDemoInvestorFreeVotes()),
    fetchDemoInvestorProjectVotes: (projectAddress) => dispatch(fetchDemoInvestorProjectVotes(projectAddress)),
    voteAndUpdateProjects: (account, votes, type, votingInstance, projectAddress, projects, projectLeaderTracker, activation, web3) => {
      return voteAndUpdateProjects(account,
      votes,
      type,
      votingInstance,
      projectAddress,
      projects,
      projectLeaderTracker,
      activation,
      web3)
    },
    updateTransactionModal: modalInfo => dispatch(updateTransactionModal(modalInfo)),
    demoInvestorVoteAndUpdateProjects: (votes, type, selectedProject) => demoInvestorVoteAndUpdateProjects(votes, type, selectedProject)
    // voteForProject: (account, votes, votingInstance, projectAddress) => voteForProject(account, votes, votingInstance, projectAddress),
    // voteAgainstProject: (account, votes, votingInstance, projectAddress) => voteAgainstProject(account, votes, votingInstance, projectAddress)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(VoteShiftTool);
