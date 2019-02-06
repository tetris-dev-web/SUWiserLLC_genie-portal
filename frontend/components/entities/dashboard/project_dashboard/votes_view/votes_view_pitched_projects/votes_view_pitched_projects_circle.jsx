import React from 'react';
import ProjectModuels from '../../project_modules/project_modules';

class VotesViewPitchedProjectsCircle extends React.Component {
  constructor() {
    super();

    this.state = {
      openModal: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ openModal: !this.state.openModal });
  }

  render() {
    const { cx, cy, r, opacity, project } = this.props;
    return (
      <React.Fragment>
        <circle className="votes-view-project-circle"
          fill="#bdc4c9"
          cx={cx}
          cy={cy}
          r={r}
          opacity={opacity}
          onClick={this.handleClick}></circle>
        <ProjectModuels 
          projectClicked={project}
          openModal={this.state.openModal}
          closeModalOnClick={this.handleClick}/>
      </React.Fragment>
    );
  }
}

export default VotesViewPitchedProjectsCircle;