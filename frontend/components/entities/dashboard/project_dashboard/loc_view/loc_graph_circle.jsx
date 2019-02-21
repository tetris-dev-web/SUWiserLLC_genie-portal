import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../../../../actions/modal_actions';

const mapDispatchToProps = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal))
  };
};

class LocGraphCircle extends React.Component {
  constructor() {
    super();

    this.state = {
      showText: false,
      isModalOpen: false
    };
  }

  handleHover(boolean) {
    return () => {
      this.setState({ showText: boolean });
    };
  }

  render() {
    const { className, transform, r, fill, project, openModal } = this.props;
    const { showText } = this.state;

    return (
      <g className={`${className}-group`}
        transform={transform}
        onMouseEnter={this.handleHover(true)}
        onMouseLeave={this.handleHover(false)}
        onClick={() => openModal({ type: "project_module", project })}>
        <circle className={`${className} outter`}
          r={r}
          fill={fill}></circle>
        <circle className={`${className} inner`}
          r="10"
          fill="white"></circle>
        {
          showText &&
          <text y={-r - 10}>{project.title}</text>
        }
      </g>
    );
  }
}

export default connect(null, mapDispatchToProps)(LocGraphCircle);