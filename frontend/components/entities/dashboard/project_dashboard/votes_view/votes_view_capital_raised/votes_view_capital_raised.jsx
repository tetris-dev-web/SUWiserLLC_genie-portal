import React from 'react';
import * as d3 from 'd3';
import VotesViewCapitalRaisedRect from './votes_view_capital_raised_rect';
import VotesViewCapitalRaisedPath from './votes_view_capital_raised_path';
import VotesViewCapitalRaisedLine from './votes_view_capital_raised_line';
import VotesViewCapitalRaisedCircle from './votes_view_capital_raised_circle';
import VotesViewCapitalRaisedRectText from './votes_view_capital_raised_text'

class VotesViewCapitalRaised extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWindowWidth: window.innerWidth,
      capBeingRaisedHovered: false,
      capRaisedHovered: false
    };
    this.setHoveredState.bind(this)
  }

  componentDidMount() {
    window.onresize = () => {
      this.setState({currentWindowWidth: window.innerWidth});
    };
  }

  setHoveredState(component){
    return () => this.setState({[component]: !this.state[component]}, () => console.log("Component is: ", this.state[component]))
  }

  render() {
    const { maxValuation, capitalRaised, capital, lineData, startTime, endTime, activationHistory, activationHistoryValuationMinMax, selectedProject } = this.props;
    const xScale = d3.scaleLinear()
      .domain([startTime, endTime])
      .range([0, window.innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, capital])
      .range([capital / 24000, 0]);

    const circleScale = d3.scaleLinear()
      .domain(activationHistoryValuationMinMax)
      .range([.5, 1.5]);

    const lines = activationHistory.map((activation, idx) => (
      <VotesViewCapitalRaisedLine key={idx} 
        xScale={xScale} 
        yScale={yScale} 
        activation={activation}
        opacity={selectedProject ? "0.2" : "1"}/>
    ));

    const circles = activationHistory.map((activation, idx) => (
      <VotesViewCapitalRaisedCircle key={idx} 
        xScale={xScale} 
        yScale={yScale} 
        circleScale={circleScale} 
        activation={activation} 
        opacity={selectedProject ? "0.2" : "1"}/>
    ));

    const text = activationHistory.map((activation, idx) => (
      <VotesViewCapitalRaisedRectText key={idx} activation={activation} x={"7%"} y={idx ? yScale((activation.capital + activationHistory[idx-1].capital)/2) : yScale((activation.capital + ((capital - capitalRaised) / 24000) + (capitalRaised / 24000))/2 )}/>
    ));


    return (
<<<<<<< HEAD
      <g className="votes-view-capital-raised">
        <VotesViewCapitalRaisedRect 
          x="0" y="0" 
          fill="#aa7a60" 
          height={capitalRaised / 24000} 
          opacity={selectedProject ? "0.2" : "0.4"}/>
        <VotesViewCapitalRaisedRect 
          x="0" y={capitalRaised / 24000} 
          fill="#61aba9" 
          height={(capital - capitalRaised) / 24000} 
          opacity={selectedProject ? "0.2" : "0.4"}/>
        <VotesViewCapitalRaisedPath 
          xScale={xScale} 
          yScale={yScale} 
          lineData={lineData} 
          opacity={selectedProject ? "0.2" : "1"}/>
        {lines}
        {circles}
      </g>
=======
      <React.Fragment>
        <VotesViewCapitalRaisedRect x="0" y="0" height={capitalRaised / 24000} fill="#aa7a60" setHoveredState={this.setHoveredState("capBeingRaisedHovered")} hovered={this.state.capBeingRaisedHovered} capitalRaised={capitalRaised}/>
        <VotesViewCapitalRaisedRect x="0" y={capitalRaised / 24000} height={(capital - capitalRaised) / 24000} fill="#61aba9" setHoveredState={this.setHoveredState("capRaisedHovered")} capital={capital} hovered={this.state.capRaisedHovered}/>
        <VotesViewCapitalRaisedPath xScale={xScale} yScale={yScale} lineData={lineData} />
        {lines}
        {circles}
        {this.state.capRaisedHovered && text}
      </React.Fragment>
>>>>>>> 2cdb73eada1919a92da315a9be6ff0ac0697ded9
    );
  }
}

export default VotesViewCapitalRaised;
