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

    const { votesPerProject, votesNotDedicated } = this.props.votesMockup;

    this.offsetX = 0;
    this.totalVotes = votesPerProject + votesNotDedicated;
    this.votesPerPixel = this.totalVotes / (VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH);

    const voteBarAppliedWidth = votesPerProject / this.votesPerPixel;
    const voteBarFreedUpWidth = votesNotDedicated / this.votesPerPixel;

    this.state = {
      showLogButton: false,
      blockchainLoading: false,
      newVotesPerProject: votesPerProject,
      newVotesNotDedicated: votesNotDedicated,
      voteBarAppliedWidth,
      voteBarFreedUpWidth,
      voteShiftLineLeft: 2 * VOTE_BAR_INNER_MARGIN + voteBarAppliedWidth
    };

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragging = this.handleDragging.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleDragStart(e) {
    e.preventDefault();
    this.offsetX = e.clientX - this.shiftLine.getBoundingClientRect().left;

    document.addEventListener('mousemove', this.handleDragging);
    document.addEventListener('mouseup', this.handleDragEnd);
  }

  handleDragging(e) {
    const mouseX = e.clientX - this.voteBarContainer.getBoundingClientRect().left;
    let newLeft = mouseX - this.offsetX;

    if (newLeft < 2 * VOTE_BAR_INNER_MARGIN) {
      newLeft = 2 * VOTE_BAR_INNER_MARGIN;
    }

    if (newLeft > VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH) {
      newLeft = VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH;
    }

    const voteBarAppliedWidth = newLeft - 2 * VOTE_BAR_INNER_MARGIN;
    const voteBarFreedUpWidth = VOTE_BAR_WIDTH - newLeft - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH;
    
    this.setState({
      newVotesPerProject: Math.ceil(voteBarAppliedWidth * this.votesPerPixel),
      newVotesNotDedicated: Math.floor(voteBarFreedUpWidth * this.votesPerPixel),
      voteBarAppliedWidth,
      voteBarFreedUpWidth,
      voteShiftLineLeft: newLeft
    });
  }
  
  handleDragEnd() { 
    const { votesPerProject, votesNotDedicated } = this.props.votesMockup;

    document.removeEventListener('mousemove', this.handleDragging);
    document.removeEventListener('mouseup', this.handleDragEnd);
    if (this.state.newVotesPerProject === votesPerProject && this.state.newVotesNotDedicated === votesNotDedicated) {
      this.setState({ showLogButton: false });
    } else {
      this.setState({ showLogButton: true });
    }
  }

  handleClick() {
    this.setState({ blockchainLoading: !this.state.blockchainLoading });

  }

  render() {
    return(
      <React.Fragment>

        <div className={this.state.blockchainLoading ? "vote-bar-loading" : "vote-bar"} style={{
          width: VOTE_BAR_WIDTH,
          height: VOTE_BAR_HEIGHT,
          borderRadius: VOTE_BAR_RADIUS
        }}>
  
          <div className="vote-bar-inner-container"
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
            <button className="vote-shift-tool-log-button" onClick={this.handleClick}>log</button>
          }
      </React.Fragment>
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


// class VoteShiftTool extends React.Component {
//   constructor(props) {
//     super(props);

//     const { votesPerProject, votesNotDedicated } = this.props.votesMockup;

//     this.offsetX = 0;
//     this.totalVotes = votesPerProject + votesNotDedicated;
//     this.votesPerPixel = this.totalVotes / (VOTE_BAR_WIDTH - 4 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH);

//     const voteBarAppliedWidth = votesPerProject / this.votesPerPixel;
//     const voteBarFreedUpWidth = votesNotDedicated / this.votesPerPixel;

//     this.state = {
//       showLogButton: false,
//       newVotesPerProject: votesPerProject,
//       newVotesNotDedicated: votesNotDedicated,
//       voteBarAppliedWidth,
//       voteBarFreedUpWidth,
//       voteShiftLineLeft: 2 * VOTE_BAR_INNER_MARGIN + voteBarAppliedWidth
//     };

//     this.handleDragStart = this.handleDragStart.bind(this);
//     this.handleDragEnd = this.handleDragEnd.bind(this);
//     this.handleDragging = this.handleDragging.bind(this);
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleDragStart(e) {
//     e.preventDefault();
//     this.offsetX = e.clientX - this.shiftLine.getBoundingClientRect().left;

//     document.addEventListener('mousemove', this.handleDragging);
//     document.addEventListener('mouseup', this.handleDragEnd);
//   }

//   handleDragging(e) {
//     const mouseX = e.clientX - this.voteBarContainer.getBoundingClientRect().left;
//     let newLeft = mouseX - this.offsetX;

//     if (newLeft < 2 * VOTE_BAR_INNER_MARGIN) {
//       newLeft = 2 * VOTE_BAR_INNER_MARGIN;
//     }

//     if (newLeft > VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH) {
//       newLeft = VOTE_BAR_WIDTH - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH;
//     }

//     const voteBarAppliedWidth = newLeft - 2 * VOTE_BAR_INNER_MARGIN;
//     const voteBarFreedUpWidth = VOTE_BAR_WIDTH - newLeft - 2 * VOTE_BAR_INNER_MARGIN - VOTE_SHIFT_LINE_WIDTH;

//     this.setState({
//       newVotesPerProject: Math.ceil(voteBarAppliedWidth * this.votesPerPixel),
//       newVotesNotDedicated: Math.floor(voteBarFreedUpWidth * this.votesPerPixel),
//       voteBarAppliedWidth,
//       voteBarFreedUpWidth,
//       voteShiftLineLeft: newLeft
//     });
//   }

//   handleDragEnd() {
//     const { votesPerProject, votesNotDedicated } = this.props.votesMockup;

//     document.removeEventListener('mousemove', this.handleDragging);
//     document.removeEventListener('mouseup', this.handleDragEnd);
//     if (this.state.newVotesPerProject === votesPerProject && this.state.newVotesNotDedicated === votesNotDedicated) {
//       this.setState({ showLogButton: false });
//     } else {
//       this.setState({ showLogButton: true });
//     }
//   }

//   handleClick() {

//   }

//   render() {
//     return (
//       <React.Fragment>

//         <div className="vote-bar" style={{
//           width: VOTE_BAR_WIDTH,
//           height: VOTE_BAR_HEIGHT,
//           borderRadius: VOTE_BAR_RADIUS
//         }}>

//           <div className="vote-bar-inner-container" style={{ padding: VOTE_BAR_INNER_MARGIN }}
//             ref={node => this.voteBarContainer = node}>
//             <div className="vote-bar-applied" style={{
//               height: INNER_BAR_HEIGHT,
//               width: this.state.voteBarAppliedWidth,
//               borderRadius: VOTE_BAR_RADIUS
//             }}
//               ref={node => this.voteBarApplied = node}></div>

//             <div className="vote-bar-shift-line" style={{
//               height: VOTE_SHIFT_LINE_HEIGHT,
//               width: VOTE_SHIFT_LINE_WIDTH,
//               left: this.state.voteShiftLineLeft
//             }}
//               ref={node => this.shiftLine = node}
//               onMouseDown={this.handleDragStart}>
//               <span className="vote-bar-applied-votes-number">
//                 {`${this.state.newVotesPerProject} votes applied`}
//               </span>
//               <span className="vote-bar-freedup-votes-number">
//                 {`${this.state.newVotesNotDedicated} votes freed up`}
//               </span>
//             </div>

//             <div className="vote-bar-freedup" style={{
//               height: INNER_BAR_HEIGHT,
//               width: this.state.voteBarFreedUpWidth,
//               borderRadius: VOTE_BAR_RADIUS,
//             }}
//               ref={node => this.voteBarFreedup = node}></div>
//           </div>
//         </div>
//         {
//           this.state.showLogButton &&
//           <button className="vote-shift-tool-log-button" onClick={this.handleClick}>log</button>
//         }
//       </React.Fragment>
//     );
//   }
// }