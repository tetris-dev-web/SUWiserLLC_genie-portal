import React from 'react';
import * as d3 from 'd3';
import VotesViewCapitalRaisedRect from './votes_view_capital_raised_rect';
import VotesViewCapitalRaisedPath from './votes_view_capital_raised_path';
import VotesViewCapitalRaisedLine from './votes_view_capital_raised_line';
import VotesViewCapitalRaisedCircle from './votes_view_capital_raised_circle';
import VotesViewCapitalRaisedRectText from './votes_view_capital_raised_text';
import colors from  "/Users/ryanowusu/Desktop/Projects/genie-portal/frontend/util/_variables.scss";



class VotesViewCapitalRaised extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWindowWidth: window.innerWidth,
      capBeingRaisedHovered: false,
      timerOn: false,
      capRaisedHovered: false
    };
    this.setHoveredStateOnEnter.bind(this)
    this.setHoveredStateOnLeave.bind(this)
  }

  componentDidMount() {
    console.log("colors specific: ",colors.rosyBrown)
    window.onresize = () => {
      this.setState({currentWindowWidth: window.innerWidth});
    };
  }

  setHoveredStateOnEnter(component){
    if(!this.state.timerOn) {
      setTimeout( () => {
        this.setState({[component]: false})
        this.setState({timerOn:false})
       }, 10000)
      this.setState({timerOn:true})
    }
    return () => this.setState({[component]: true })
  }
  setHoveredStateOnLeave(component){
    return () => this.setState({[component]: false })
  }

  render() {
    const { maxValuation, capitalBeingRaised, capitalTotal, lineData, startTime, endTime, deployedProjects, deployedProjectsValuationMinMax, selectedProject } = this.props;
    const xScale = d3.scaleLinear()
      .domain([startTime, endTime])
      .range([0, window.innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, capitalTotal])
      .range([capitalTotal / 24000, 0]);

    const circleScale = d3.scaleLinear()
      .domain(deployedProjectsValuationMinMax)
      .range([.5, 1.5]);

    const lines = deployedProjects.map((project, idx) => (
      <VotesViewCapitalRaisedLine key={idx}
        xScale={xScale}
        yScale={yScale}
        project={project}
        opacity={selectedProject ? "0.2" : "1"}/>
    ));

    const circles = deployedProjects.map((project, idx) => (
      <VotesViewCapitalRaisedCircle key={idx}
        xScale={xScale}
        yScale={yScale}
        circleScale={circleScale}
        project={project}
        opacity={selectedProject ? "0.2" : "1"}/>
    ));

    const CapRaisedAmounts = deployedProjects.map((project, idx) => (
      <VotesViewCapitalRaisedRectText
        key={idx}
        project={project}
        x={"7%"}
        y={idx ? yScale((project.capital + deployedProjects[idx-1].capital)/2) : yScale((project.capital + ((capitalTotal - capitalBeingRaised) / 24000) + (capitalBeingRaised / 24000))/2 )}/>
    ));

    const CapBeingRaisedAmounts = (props) => {
      const yScaleFunction = capitalBeingRaised / 24000
      return (
        <text
          className={"votes-view-capital-raised-text"}
          x={"7%"}
          y={yScaleFunction/2}>
          <tspan
            dy={".4em"}>
            {`$ ${Number(capitalBeingRaised/1000.0).toLocaleString()} k`}
          </tspan>
        </text>
      );
    }



    const CapitalBeingRaisedRect = (props) => {
      const heightOfRect = capitalBeingRaised / 24000

      return (<VotesViewCapitalRaisedRect
        x="0" y="0"
        height={heightOfRect}
        fill={colors.rosyBrown}
        capRaisedTextToDisplay = {{"text":"capital being raised"}}
        setHoveredStateOnEnter={this.setHoveredStateOnEnter("capBeingRaisedHovered")}
        setHoveredStateOnLeave= {this.setHoveredStateOnLeave("capBeingRaisedHovered")}
        opacity={selectedProject ? "0.1" : "0.3"}
        hovered={this.state.capBeingRaisedHovered}/>)
    }


    const CapitalRaisedPrevRect = (props) => {
      const heightOfRect = (capitalTotal - capitalBeingRaised) / 24000
      const textToDisplay = {
        "text": "capital that has been raised" ,
        "amount": Number(capitalBeingRaised/1000.0).toLocaleString()
      }
      return (<VotesViewCapitalRaisedRect
        x="0" y={capitalBeingRaised / 24000}
        height={heightOfRect}
        fill= {colors.teal}
        opacity={selectedProject ? "0.1" : "0.3"}
        capRaisedTextToDisplay =  {textToDisplay}
        setHoveredStateOnEnter={this.setHoveredStateOnEnter("capRaisedHovered")}
        setHoveredStateOnLeave= {this.setHoveredStateOnLeave("capRaisedHovered")}
        hovered={this.state.capRaisedHovered}/>)
    }



    return (
      <g className="votes-view-capital-raised">

        <CapitalBeingRaisedRect/>
        <CapitalRaisedPrevRect/>

        <VotesViewCapitalRaisedPath
          xScale={xScale}
          yScale={yScale}
          opacity={selectedProject ? "0.2" : "1"}
          lineData={lineData} />

        {lines}
        {circles}
        {this.state.capRaisedHovered && CapRaisedAmounts}
        {this.state.capBeingRaisedHovered && <CapBeingRaisedAmounts/>}
      </g>
    );
  }
}

export default VotesViewCapitalRaised;
