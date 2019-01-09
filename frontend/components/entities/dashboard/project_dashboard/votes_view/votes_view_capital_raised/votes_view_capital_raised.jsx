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
      capBeingRaisedHovered: true,
      capRaisedHovered: true
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
    const { maxValuation, capitalRaised, capital, lineData, startTime, endTime, activationHistory, activationHistoryValuationMinMax } = this.props;
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
      <VotesViewCapitalRaisedLine key={idx} xScale={xScale} yScale={yScale} activation={activation} />
    ));

    const circles = activationHistory.map((activation, idx) => (
      <VotesViewCapitalRaisedCircle key={idx} xScale={xScale} yScale={yScale} circleScale={circleScale} activation={activation} />
    ));

    const text = activationHistory.map((activation, idx) => (
      <VotesViewCapitalRaisedRectText key={idx} activation={activation} x={"7%"} y={idx ? yScale((activation.capital + activationHistory[idx-1].capital)/2) : yScale((activation.capital + ((capital - capitalRaised) / 24000) + (capitalRaised / 24000))/2 )}/>
    ));


    return (
      <React.Fragment>
        <VotesViewCapitalRaisedRect x="0" y="0" height={capitalRaised / 24000} fill="#aa7a60" hovered={this.state.capBeingRaisedHovered} setHoveredState={() => this.setHoveredState("capBeingRaisedHovered")}/>
        <VotesViewCapitalRaisedRect x="0" y={capitalRaised / 24000} height={(capital - capitalRaised) / 24000} fill="#61aba9" hovered={this.state.capRaisedHovered} setHoveredState={() => this.setHoveredState("capRaisedHovered")}/>
        <VotesViewCapitalRaisedPath xScale={xScale} yScale={yScale} lineData={lineData} />
        {lines}
        {circles}
        {text}
      </React.Fragment>
    );
  }
}

export default VotesViewCapitalRaised;
