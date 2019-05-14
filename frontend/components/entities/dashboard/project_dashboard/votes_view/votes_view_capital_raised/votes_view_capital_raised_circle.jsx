import React from 'react';

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
					onClick={() => openModal(project.id)}
					onMouseOver={this.handleHover(true)}
					onMouseLeave={this.handleHover(false)}>
				</circle>
				{
					this.state.showText &&
					<text className="votes-view-circle-text-hovers"
						x={cx}
						y={cy-20}
						transform={transform}
						>
						<tspan>
							{project.title}
						</tspan>
					</text>
				}
			</React.Fragment>
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

export default connect(null, mapDispatchToProps)(VotesViewCapitalRaisedCircle);
