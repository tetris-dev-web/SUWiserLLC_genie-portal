import React from 'react';
import * as d3 from 'd3';
import VotesViewCapitalRaisedRect from './votes_view_capital_raised_rect';
import VotesViewCapitalRaisedPath from './votes_view_capital_raised_path';
import VotesViewCapitalRaisedLine from './votes_view_capital_raised_line';
import VotesViewCapitalRaisedCircle from './votes_view_capital_raised_circle';

class VotesViewCapitalRaised extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWindowWidth: window.innerWidth
    };
  }
  
  componentDidMount() {
    window.onresize = () => {
      this.setState({currentWindowWidth: window.innerWidth});
    };
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

    return (
      <React.Fragment>
        <VotesViewCapitalRaisedRect x="0" y="0" height={capitalRaised / 24000} fill="#aa7a60" />
        <VotesViewCapitalRaisedRect x="0" y={capitalRaised / 24000} height={(capital - capitalRaised) / 24000} fill="#61aba9"/>
        <VotesViewCapitalRaisedPath xScale={xScale} yScale={yScale} lineData={lineData}/>
        {lines}
        {circles}
      </React.Fragment>
    );
  }
}

export default VotesViewCapitalRaised;
