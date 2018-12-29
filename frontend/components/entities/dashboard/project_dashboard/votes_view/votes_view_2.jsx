import React from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';

const mapStateToProps = state => {
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
      .style('opacity', .5);

    this.setUp();
  }

  setUp(){
    const { capitalRaised } = this.props;
    const projects = this.processProjectData();

    const valuationRect = this.svg.selectAll('.valuation-rect').remove();
    valuationRect.data(projects)
      .enter()
      .append('rect')
      .attr('width', project => `${project.projectWidth}%`)
      .attr('height', project => project.projectValutionHeight)
      .attr('fill', project => project.fill)
      .attr('x', project => `${project.projectStartX}%`)
      .attr('y', project => project.projectValutionStartY)
      .attr('opacity', .3)
      .style('stroke', 'white')
      .style('stroke-width', 2)
      .on('mouseover', this.handleMouseOver("valuation"))
      .on('mouseout', this.handleMouseOut());

    const capRequiredRect = this.svg.selectAll('.capital-required-rect').remove();
    capRequiredRect.data(projects)
      .enter()
      .append('rect')
      .attr('width', project => `${project.projectWidth}%`)
      .attr('height', project => project.projectCapitalRequiredHeight)
      .attr('fill', project => project.fill)
      .attr('x', project => `${project.projectStartX}%`)
      .attr('y', project => project.projectCapitalRequiredStartY)
      .attr('opacity', 1)
      .style('stroke', 'white')
      .style('stroke-width', 2)
      .on('mouseover', this.handleMouseOver("capitalRequired"))
      .on('mouseout', this.handleMouseOut());

    const votePercentageRect = this.svg.selectAll('.vote-percentage-rect').remove();
    votePercentageRect.data(projects)
      .enter()
      .append('rect')
      .attr('width', project => `${project.projectWidth + 1}%`)
      .attr('height', 30)
      .attr('fill', project => project.fill)
      .attr('x', project => `${project.projectStartX - .5}%`)
      .attr('y', capitalRaised / 24000);

    const votePercentageText = this.svg.selectAll('.vote-percentage-rect').remove();
    votePercentageText.data(projects)
      .enter()
      .append('text')
      .style("font-size", "18px")
      .style("fill", '#000')
      .style("text-anchor", "middle")
      .text(project => `${project.voteShare * 100}%`)
      .attr('x', project => `${project.projectRectCenter}%`)
      .attr('y', capitalRaised / 24000 + 20);
  }

  processProjectData(){
    const { pitchedProjects, capitalRaised } = this.props;
    const numberOfProjects = this.props.pitchedProjects.length;
    const percentOfScreen = 60;
    const projectWidthPercentage = percentOfScreen - (numberOfProjects - 1);
    let projectStartX = 20;

    return pitchedProjects.map(project => {
      const projectWidth = project.voteShare * projectWidthPercentage;
      const newProject = Object.assign({}, project, {
        projectStartX,
        projectWidth,
        fill: capitalRaised < project.capitalRequired ? '#aa7a60' : '#61aba9',
        projectValutionHeight: (project.valuation - project.capitalRequired) / 24000,
        projectValutionStartY: (capitalRaised - project.valuation) / 24000,
        projectCapitalRequiredHeight: project.capitalRequired / 24000,
        projectCapitalRequiredStartY: (capitalRaised - project.capitalRequired) / 24000,
        projectRectCenter: projectStartX + projectWidth / 2
      });
      projectStartX += (1 + projectWidth);
      return newProject;
    });
  }

  handleMouseOver(type){
    const { capitalRaised } = this.props;
    const pixelPerDigit = 3;
    return project => {
      this.svg.append('text')
        .classed('svg-text', true)
        .style("font-size", "12px")
        .style("fill", () => type === 'capitalRequired' ? 'white' : project.fill)
        .style("text-anchor", "middle")
        .text(project[type])
        .attr('x', () => `${project.projectRectCenter}%`)
        .attr('y', () => type === 'valuation' ? (capitalRaised - project.valuation) / 24000 + 15 : (capitalRaised - project.capitalRequired) / 24000 + 15)
        .attr('pointer-events', 'none');

      this.svg.append('text')
        .classed('svg-text', true)
        .style("font-size", "12px")
        .style("fill", () => type === 'capitalRequired' ? 'white' : project.fill)
        .style("text-anchor", "middle")
        .text(() => type === 'valuation' ? 'valuation' : 'capital needs')
        .attr('x', () => type === 'valuation' ? 
          `${project.projectRectCenter}%`:
          `${project.projectRectCenter}%`)
        .attr('y', () => type === 'valuation' ? (capitalRaised - project.valuation) / 24000 - 10 : (capitalRaised - project.capitalRequired) / 24000 - 10)
        .attr('pointer-events', 'none');
    };
  }

  handleMouseOut(){
    return () => d3.selectAll('.svg-text').remove();
  }

  render(){
    const { maxValuation, capitalRaised } = this.props;
    return(
      <div className="votes-view" style={{marginTop: (maxValuation - capitalRaised) / 24000 + 20}}></div>
    );
  }
}

export default connect(mapStateToProps)(VotesView2);
