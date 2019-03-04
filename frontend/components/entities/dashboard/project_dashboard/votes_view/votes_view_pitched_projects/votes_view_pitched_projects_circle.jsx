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
  }

  render() {
    const { cx, cy, r, opacity, project, openModal } = this.props;

    return (
      <circle className="votes-view-project-circle"
        fill="#bdc4c9"
        cx={cx}
        cy={cy}
        r={r}
        opacity={opacity}
        onClick={() => openModal({ type: "project_module", project })}></circle>
    );
  }
}

export default connect(null, mapDispatchToProps)(VotesViewPitchedProjectsCircle);