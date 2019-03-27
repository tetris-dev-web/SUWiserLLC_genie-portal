import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../../../../../actions/modal_actions';

const mapDispatchToProps = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal))
  };
};

class VotesViewPitchedProjectsCircle extends React.Component {
  constructor() {
    super();
    this.state = {
      r: 8
    }
  }

  render() {
    const { cx, cy, r, opacity, project, openModal } = this.props;

    return  (

        <g className={`"votes-view-project-circle" ${this.props.selectedProject? "" : "hidden" } `}>
          <circle
            fill="white"
            cx={cx}
            cy={cy}
            r={this.state.r}
            y="90"
            stroke="#61aba9"
            strokeWidth=".7px"
            opacity={opacity}
            onClick={() => openModal({ type: "project_module", project })} onMouseOver={() => this.setState({r: 12})} onMouseLeave={() => this.setState({r: 8})}></circle>
          <text x={cx} y={cy + 5} fill="#61aba9" textAnchor="middle" stroke="#51c5cf" strokeWidth=".2px" dy=".009em">i</text>
        </g>
    );
  }
}

export default connect(null, mapDispatchToProps)(VotesViewPitchedProjectsCircle);
