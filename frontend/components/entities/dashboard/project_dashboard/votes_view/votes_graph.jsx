import React from 'react';
import * as d3 from 'd3';
import VotesViewCapitalRaised from './votes_view_capital_raised/votes_view_capital_raised';
import VotesViewPitchedProjects from './votes_view_pitched_projects/votes_view_pitched_projects';
import VoteShiftTool from './vote_shift_tool';
import Loader from '../../loader/loader';
import './votes_graph.scss';

class VotesGraph extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedProject: null,
      componentVisible: "invisible",
    };

    this.margin = { top: 20, right: 50, bottom: 30, left: 50 };
    this.SVGWidth = (960 - this.margin.left - this.margin.right) * .5;
    this.SVGHeight = 600 * .5;
    this.timeWidth = (960 - this.margin.left - this.margin.right) * .5;
    this.watchTokenPurchase = this.watchTokenPurchase.bind(this);
    this.watchProjectPitch = this.watchProjectPitch.bind(this);
  }

  componentDidMount() {
    console.log("wait",this.props.wait);
    setTimeout(() => {
      this.setState({componentVisible: ""});
    }, this.props.wait);


    if (!this.props.projectsLoaded) {
      this.props.fetchSharedProjectGraphData();
    }

    this.props.fetchCapitalHistory(this.props.crowdsaleInstance);
    this.watchProjectPitch();
    this.watchTokenPurchase();
  }

  // componentDidUpdate(prevProps) {
  //   const prevLineData = prevProps.lineData;
  //   const { lineData, updateTimeAxis, startTime, endTime } = this.props;
  //   if (prevLineData !== lineData) {
  //     updateTimeAxis(startTime, endTime)
  //   }
  // }

  watchProjectPitch () { //event listener for pitched projects // get project from database and integrate into store
    const { projectFactoryInstance, projectContract } = this.props;
    projectFactoryInstance.ProjectPitch().watch((error, event) => {
      const address = event.args.projectAddress;
      // const id = event.args.projectId;
      this.props.fetchProject(address);
    });
  }

  watchTokenPurchase () {
    console.log("watching purchase")
    this.props.crowdsaleInstance.TokenPurchase().watch((error, event) => {
      console.log('event', event)
      this.props.receiveTokenPurchase({blockNumber: event.blockNumber, value: Number(event.args.value)});
      this.props.notifyTransactionCompletion({notification: "Your token purchase transaction has been mined to the blockchain."});
    })
  }

  createScales(){
    const { capitalBeingRaised, capitalDeployed, capitalTotal, pitchedProjectsValuationMinMax, allProjectsValuationMinMax } = this.props;
    const { startTime, endTime } = this.props;
    console.log("inFunctionTimes", startTime,endTime);
    return {
      SVGHeightScale: d3.scaleLinear()
        .range([0, this.SVGHeight])
        .domain([0, capitalDeployed + Math.max(pitchedProjectsValuationMinMax[1], capitalBeingRaised)]),
      SVGYScale: d3.scaleLinear()
        .range([this.SVGHeight, 0])
        .domain([0, capitalDeployed + Math.max(pitchedProjectsValuationMinMax[1], capitalBeingRaised)]),
      SVGTimeXScale: d3.scaleLinear()
        .domain([startTime, endTime])
        .range([0, this.timeWidth]),
      circleScale: d3.scaleLinear()
        .domain(allProjectsValuationMinMax)
        .range([5, 10])
    };
  }

  dataHasLoaded(){
    return this.props.lineData;
  }
  renderGraph() {
    const { SVGHeightScale, SVGYScale, SVGTimeXScale, circleScale } = this.createScales();
    const { selectedProject, componentVisible } = this.state;
    const { startTime, endTime } = this.props
    console.log("timesabove", startTime, endTime );

    return (
      <div className={`votes-graph ${componentVisible}`}>
        <div className="vote-shift-tool-container"
          ref={node => this.voteShiftTool = node}>
          {
            selectedProject &&
            <VoteShiftTool selectedProject={selectedProject.address}/>
          }
        </div>
        <svg className="votes-view-svg"
          preserveAspectRatio="xMinYMin meet"
          viewBox="0 0 960 300">
          <VotesViewCapitalRaised
            {...this.props}
            {...this.state}
            margin={this.margin}
            SVGYScale={SVGYScale}
            SVGHeightScale={SVGHeightScale}
            SVGTimeXScale={SVGTimeXScale}
            circleScale={circleScale}
            startTime={startTime}
            endTime={endTime} />
          <VotesViewPitchedProjects
            {...this.props}
            {...this.state}
            margin={this.margin}
            SVGYScale={SVGYScale}
            SVGHeightScale={SVGHeightScale}
            SVGWidth={this.SVGWidth}
            circleScale={circleScale}
            voteShiftTool={this.voteShiftTool}
            toggleSelectedProject={selectedProject => this.setState({selectedProject})}/>
        </svg>
      </div>
    );
  }

  render() {
    return this.dataHasLoaded() ? this.renderGraph() : <Loader/>;
  }
}

export default VotesGraph;
