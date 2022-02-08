import React from 'react';


class LocGraphCircle extends React.Component {
  constructor() {
    super();

    this.state = {
      showText: false
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
    // console.log("circleprops", this.props);

    return (
      <g className={`${className}-group`}
        transform={transform}
        onMouseEnter={this.handleHover(true)}
        onMouseLeave={this.handleHover(false)}
        onClick={() => openModal(project.id)}>
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

// CONTAINER
import { connect } from 'react-redux';
import { openModal } from '../../../../../actions/modal_actions';

const mapDispatchToProps = dispatch => {
  return {
    openModal: projectId => dispatch(openModal(projectId))
  };
};


export default connect(null, mapDispatchToProps)(LocGraphCircle);
