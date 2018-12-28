import React from 'react';
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

class VotesView2 extends React.Component{
  constructor(props){
    super(props);
    this.state={

    };
    // this.setUpProject
  }

  componentDidMount(){
    const { maxValuation, capitalRaised } = this.props;
    this.svg = d3.select('.votes-view')
      .append('svg')
      .classed('votes-view-svg', true)
      .attr('width', "100%")
      .attr('height', maxValuation/24000);

    this.svg.append('g')
      .append('rect')
      .classed('current-cycle-capital', true)
      .attr('width', "100%")
      .attr('height', capitalRaised/24000)
      .attr('fill', '#aa7a60')
      .style('opacity', .5)

    this.setUp();
  }

  setUp(){
    const { capitalRaised } = this.props
    const projects = this.processProjectData();

    const valuationRect = this.svg.selectAll('.valuation-rect').remove();
    valuationRect.data(projects)
      .enter()
      .append('rect')
      .attr('width', project => {
        return `${project.projectWidth}%`
      })
      .attr('height', project => {
        return (project.valuation - project.capitalRequired)/24000
      })
      .attr('fill', project => {
        return capitalRaised < project.capitalRequired ? '#aa7a60' : '#61aba9';
      })
      .attr('x', project => {
        return `${project.startX}%`;
      })
      .attr('y', project => {
        return (capitalRaised - project.valuation)/24000;
      })
      .attr('opacity', .3)
      .style('stroke', 'white')
      .style('stroke-width', 2)
      .on('mouseover', this.handleMouseOver("valuation"))
      .on('mouseout', this.handleMouseOut())

    const capRequiredRect = this.svg.selectAll('.cap-required-rect').remove();
    capRequiredRect.data(projects)
      .enter()
      .append('rect')
      .attr('width', project => {
        return `${project.projectWidth}%`;
      })
      .attr('height', project => {
        return project.capitalRequired/24000
      })
      .attr('fill', project => {
        return capitalRaised < project.capitalRequired ? '#aa7a60' : '#61aba9'
      })
      .attr('x', project => {
        return `${project.startX}%`
      })
      .attr('y', project =>{
        return (capitalRaised - project.capitalRequired)/24000
      })
      .attr('opacity', 1)
      .style('stroke', 'white')
      .style('stroke-width', 2)
      .on('mouseover', this.handleMouseOver("capitalRequired"))
      .on('mouseout', this.handleMouseOut());

  }

   processProjectData(){
     const { pitchedProjects } = this.props;
     const numberOfProjects = this.props.pitchedProjects.length;
     const percentOfScreen = 60;
     const projectWidthPercentage = percentOfScreen - (numberOfProjects - 1);
     let startX = 20;
     return pitchedProjects.map(project => {
       const projectWidth = project.voteShare * projectWidthPercentage;
       const newProject = Object.assign({}, project, {
         startX,
         projectWidth
       });
       startX += (1 + projectWidth);
       return newProject;
     });
   }

  handleMouseOver(type){
    const { capitalRaised } = this.props;
    return project => {
      this.svg.append('text')
      .classed('svg-text', true)
      .style("font-size", "12px")
      .style("fill", 'white')
      .text(project[type])
      .attr('x',() => {
        return (project.startX + project.projectWidth/2)/100 * window.innerWidth - (3 * String(project[type]).length);
      } )
      .attr('y', () => {
        if (type === 'valuation') {
          return (capitalRaised - project.valuation)/24000 + 15;
        }
        else {
          return (capitalRaised - project.capitalRequired)/24000 + 15;
        }
      })
      .attr('pointer-events', 'none');
    };
  }

  handleMouseOut(){
    return () => d3.select('.svg-text').remove();
  }

  render(){
    const { maxValuation, capitalRaised } = this.props
    return(
      <div className="votes-view" style={{marginTop: (maxValuation - capitalRaised)/24000}}></div>
    );
  }
}

export default connect(mapStateToProps)(VotesView2);
