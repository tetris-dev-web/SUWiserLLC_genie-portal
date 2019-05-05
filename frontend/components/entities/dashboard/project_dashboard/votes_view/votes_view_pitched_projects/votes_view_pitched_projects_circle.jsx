import React from 'react';

class VotesViewPitchedProjectsCircle extends React.Component {
  constructor() {
    super();
    this.state = {
      r: 8
    }
  }

  render() {
    const { cx, cy, r, opacity, project, openModal } = this.props;
    console.log("projects", project);
    console.log("openModalFunction", openModal);

    console.log("projects", project.id);

    let i = 0

    if(project.id === 3 && i === 0){
      openModal(project.id)
      i += 1;
    }

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
            onClick={() => openModal(project.id)}
            onMouseOver={() => this.setState({r: 12})}
            onMouseLeave={() => this.setState({r: 8})}>
          </circle>
          <text x={cx} y={cy + 5} fill="#61aba9" textAnchor="middle" stroke="#51c5cf" strokeWidth=".2px" dy=".009em">i</text>
        </g>
    );
  }
}


// CONTAINER
import { connect } from 'react-redux';
import { openModal } from '../../../../../../actions/modal_actions';

const mapDispatchToProps = dispatch => {
  return {
    openModal: projectId => dispatch(openModal(projectId))
  };
};

export default connect(null, mapDispatchToProps)(VotesViewPitchedProjectsCircle);
