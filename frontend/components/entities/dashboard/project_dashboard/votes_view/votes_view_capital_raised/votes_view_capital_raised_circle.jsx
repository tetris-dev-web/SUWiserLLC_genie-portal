import React from 'react';
import ProjectModules from '../../project_modules/project_modules';

class VotesViewCapitalRaisedCircle extends React.Component {
	constructor() {
		super();

		this.state = {
			showText: false,
			moduleState: false,// may remove
		};

		this.handleHover = this.handleHover.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	handleHover() {
		this.setState({showText: !this.state.showText});
	}


	  closeModal(){
	    this.setState({moduleState: false});
	  }

	render() {
		const { xScale, yScale, circleScale, project, opacity } = this.props;
		const { moduleState } = this.state;
		return (
			<React.Fragment>
				{ moduleState &&
					(<ProjectModules
					projectClicked={project}
					isModalOpen={moduleState}
					closeModalOnClick={this.closeModal}
					doIHaveData={true}
					closeModal={this.closeModal} />)
				}
				<circle
					fill="#bdc4c9"
					cx={xScale(project.activationTime)}
					cy={yScale(project.capital)}
					r={circleScale(project.valuation)}
					opacity={opacity}
					onMouseOver={this.handleHover}
					onMouseLeave={this.handleHover}></circle>
				{
					this.state.showText &&
					<text className="votes-view-capital-raised-text"
						x={xScale(project.time)}
						y={yScale(project.capital) + circleScale(project.valuation) + 20}><tspan>{project.title}</tspan>
					</text>
				}
			</React.Fragment>
		);
	}
}

export default VotesViewCapitalRaisedCircle;

// <ProjectModules
// 	projectClicked={project}
// 	isModalOpen={false}
// 	closeModalOnClick={"filler"}
// 	doIHaveData={true}
// 	closeModal={"filler"} />
