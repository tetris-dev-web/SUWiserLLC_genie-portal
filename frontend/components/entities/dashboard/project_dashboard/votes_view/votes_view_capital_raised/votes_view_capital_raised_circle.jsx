import React from 'react';
import { connect } from 'react-redux';
import ProjectModules from '../../project_modules/project_modules';
import { openModal } from '../../../../../../actions/modal_actions';

const mapDispatchToProps = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal))
  };
};


class VotesViewCapitalRaisedCircle extends React.Component {
	constructor() {
		super();

		this.state = {
			showText: false,
		};
	}

	handleHover(boolean) {
		return () => {
			this.setState({showText: boolean});
		};
	}

	render() {
		const { cx, cy, r, x, y, project, opacity, openModal, transform } = this.props;

		return (
			<React.Fragment>
				<circle className="votes-view-project-circle"
					fill="#bdc4c9"
					cx={cx}
					cy={cy}
					r={r}
					opacity={opacity}
					transform={transform}
					onClick={() => openModal({ type: "project_module", project })}
					onMouseOver={this.handleHover(true)}
					onMouseLeave={this.handleHover(false)}>
				</circle>
				{
					this.state.showText &&
					<text className="votes-view-capital-raised-text"
						x={cx+60}
						y={y}><tspan>{project.title}</tspan>
					</text>
				}
			</React.Fragment>
		);
	}
}

export default connect(null, mapDispatchToProps)(VotesViewCapitalRaisedCircle);
