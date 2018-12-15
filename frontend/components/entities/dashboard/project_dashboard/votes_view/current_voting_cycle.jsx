import React from 'react';
import PitchedProject from './pitched_project';
import * as d3 from 'd3';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return({
      pitchedProjects: [
        {
          valuation: 5000000,
          capitalRequired: 3000000,
          voteShare: .4,
          title: "Genesis"
        },
        {
          valuation: 4000000,
          capitalRequired: 2500000,
          voteShare: .35,
          title: "HamInn"
        },
        {
          valuation: 3500000,
          capitalRequired: 2000000,
          voteShare: .25,
          title: "Penn Generator"
        },
      ]
    });
};




class CurrentVotingCycle extends React.Component{
  constructor(props){
    super(props);
    this.state={

    };

    this.setUp = this.setUp.bind(this);
    this.projects = this.projects.bind(this);
  }

  componentDidMount(){
    this.setUp();
  }

  setUp(){
    console.log("Setting Up");
    let { height, width } = this.props;
    // let { projects } = this.props;
    // #d3bcaf
    this.svg = d3.select('.current-voting-cycle-container')
    .append('svg')
    .classed('current-cycle-capital', true)
    .attr('width', width)
    .attr('height', height)

  }

  projects(){
    const numberOfProjects = this.props.pitchedProjects.length;
    const projectWidthPercentage = 60 - (numberOfProjects * 2);
    let startX = 21
    const pitchedProjects = this.props.pitchedProjects.map((project, idx) => {
      console.log(startX)
      const currentX = startX
      const projectWidth = project.voteShare * projectWidthPercentage;
      startX = startX + 1 + projectWidth;

      return (<PitchedProject
                            key={idx}
                            valuation={project.valuation}
                            capitalRequired={project.capitalRequired}
                            width={`${projectWidth}%`}
                            title={project.title}
                            svg={this.svg}
                            x={`${currentX}%`}
                            y={this.props.height} />);
    });
    return pitchedProjects;
  }

  render(){
    // let { capitalRaised } = this.props;
    return(
      <div className="current-voting-cycle-container">Hey
        { this.projects() }
      </div>
    );
  }
}

export default connect(mapStateToProps)(CurrentVotingCycle);
// <PitchedProject valuation={5000000} capitalRequired={2000000} width={"20%"} height={"100px"}/>
// <PitchedProject valuation={4000000} capitalRequired={1000000} width={"20%"} height={"100px"}/>
