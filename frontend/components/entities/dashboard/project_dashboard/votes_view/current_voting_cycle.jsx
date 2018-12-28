import React from 'react';
import PitchedProject from './pitched_project';
import PercentageBar from './percentage_bar';
import * as d3 from 'd3';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return({
      pitchedProjects: [
        {
          valuation: 5000000,
          capitalRequired: 3500000,
          voteShare: .15,
          title: "Ryan and Liam"
        },
        {
          valuation: 2000000,
          capitalRequired: 1500000,
          voteShare: .15,
          title: "Liam and Ryan"
        },
        {
          valuation: 4000000,
          capitalRequired: 2500000,
          voteShare: .20,
          title: "HamInn"
        },
        {
          valuation: 5000000,
          capitalRequired: 4000000,
          voteShare: .30,
          title: "Genesis"
        },
        {
          valuation: 3500000,
          capitalRequired: 2000000,
          voteShare: .20,
          title: "Penn Generator"
        },
      ].sort((a,b) => b.voteShare - a.voteShare),
      maxValuation: 5000000,
      capitalRaised: 3000000
    });
};




class CurrentVotingCycle extends React.Component{
  constructor(props){
    super(props);
    this.state={
      svg: undefined
    };

    this.calculateStartingY = this.calculateStartingY.bind(this);
    this.setUp = this.setUp.bind(this);
    this.projects = this.projects.bind(this);
  }

  componentDidMount(){
    this.setUp();
  }

  setUp(){
    let { maxValuation, capitalRaised } = this.props;

    const svg =  d3.select('.current-voting-cycle-container')
                 .append('svg')
                 .attr('width', "100%")
                 .attr('height', maxValuation/24000)


    const y = this.calculateStartingY(this.props.capitalRaised);
    svg.append("rect")
       .classed('current-cycle-capital', true)
       .attr('width', "100%")
       .attr('height', capitalRaised/24000)
       .attr('y', `${y}%`)
       .attr('fill', '#aa7a60')
       .style('opacity', .5)

    this.setState({svg})
  }

  projects(){
    const { capitalRaised } = this.props;
    const numberOfProjects = this.props.pitchedProjects.length;
    const projectWidthPercentage = 60 - (numberOfProjects * 2);
    let startX = 21;

    const pitchedProjects = this.props.pitchedProjects.map((project, idx) => {
      const currentX = startX
      const valuationY = this.calculateStartingY(project.valuation);
      const capitalRequiredY = this.calculateStartingY(project.capitalRequired);

      const projectWidth = project.voteShare * projectWidthPercentage;
      startX += projectWidth + 1;

      return (<PitchedProject
                            key={idx}
                            valuation={project.valuation}
                            capitalRequired={project.capitalRequired}
                            capitalRaised = {capitalRaised}
                            width={`${projectWidth}%`}
                            title={project.title}
                            svg={this.state.svg}
                            x={`${currentX}%`}
                            valuationY={`${valuationY}%`}
                            capitalRequiredY={`${capitalRequiredY}%`} />);
    });
    return pitchedProjects;
  }

  calculateStartingY(capital) {
    return ((this.props.maxValuation - capital) / this.props.maxValuation) * 100;
  }

  render(){
    const { pitchedProjects } = this.props
    const numberOfProjects = pitchedProjects.length;
    const projectWidthPercentage = 60 - (numberOfProjects * 2);
    return(
      <div className="current-voting-cycle-container">
        { this.projects() }
        <PercentageBar
                      pitchedProjects={this.props.pitchedProjects}
                      width={`${projectWidthPercentage + numberOfProjects}%`}
                      height={"50px"}
                      x={`21%`}
                      y={0}
                      svg={this.state.svg} />
      </div>
    );
  }
}

// y={"242%"}
export default connect(mapStateToProps)(CurrentVotingCycle);
// <PitchedProject valuation={5000000} capitalRequired={2000000} width={"20%"} height={"100px"}/>
// <PitchedProject valuation={4000000} capitalRequired={1000000} width={"20%"} height={"100px"}/>
