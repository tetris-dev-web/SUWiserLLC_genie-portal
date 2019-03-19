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
      componentVisible: "invisible"
    };

    this.margin = { top: 20, right: 50, bottom: 30, left: 50 };
    this.SVGWidth = (960 - this.margin.left - this.margin.right) * .5;
    this.SVGHeight = 600 * .5;
    this.timeWidth = (960 - this.margin.left - this.margin.right) * .5;
    this.watchTokenPurchase = this.watchTokenPurchase.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({componentVisible: ""});
    }, this.props.wait);


    if (!this.props.projectsLoaded) {
      this.props.fetchSharedProjectGraphData();
    }

    this.props.fetchCapitalHistory(this.props.crowdsaleInstance);

    this.watchTokenPurchase();
  }

  componentDidUpdate(prevProps) {
    const prevLineData = prevProps.lineData;
    const { lineData, updateTimeAxis, startTime, endTime } = this.props;

    if (prevLineData !== lineData) {
      updateTimeAxis(startTime, endTime)
    }
  }

  watchTokenPurchase () {
    this.props.crowdsaleInstance.TokenPurchase().watch((error, event) => {
      // console.log("event", Number(event.args.time), Number(event.args.value))
      console.log(event)
      this.props.receiveTokenPurchase({time: event.blockNumber, value: Number(event.args.value)});
    })
  }

  createScales(){
    const { capitalBeingRaised, capitalDeployed, capitalTotal, startTime, endTime, pitchedProjectsValuationMinMax, allProjectsValuationMinMax, timeAxis } = this.props;
    console.log('TA', timeAxis)

    return {
      SVGHeightScale: d3.scaleLinear()
        .range([0, this.SVGHeight])
        .domain([0, capitalDeployed + Math.max(pitchedProjectsValuationMinMax[1], capitalBeingRaised)]),
      SVGYScale: d3.scaleLinear()
        .range([this.SVGHeight, 0])
        .domain([0, capitalDeployed + Math.max(pitchedProjectsValuationMinMax[1], capitalBeingRaised)]),
      SVGTimeXScale: d3.scaleLinear()
        .domain([timeAxis.startTime, timeAxis.endTime])
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
          viewBox="0 0 960 300"
          >
          <VotesViewCapitalRaised
            {...this.props}
            {...this.state}
            margin={this.margin}
            SVGYScale={SVGYScale}
            SVGHeightScale={SVGHeightScale}
            SVGTimeXScale={SVGTimeXScale}
            circleScale={circleScale} />
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
    console.log('votes graph props', this.props)
    // console.log("selectedProject", this.state.selectedProject, this.state.componentVisible)
    return this.dataHasLoaded() ? this.renderGraph() : <Loader/>;
  }
}

export default VotesGraph;


// height="500" width="960"



//
// const cashflow = {
//   "1": {
//     "cashFlow": -36974,
//     "isActuals": true
//   },
//   "2": {
//     "cashFlow": -40018,
//     "isActuals": true
//   },
//   "3": {
//     "cashFlow": -16857,
//     "isActuals": true
//   },
//   "4": {
//     "cashFlow": -2915,
//     "isActuals": true
//   },
//   "5": {
//     "cashFlow": -20325,
//     "isActuals": true
//   },
//   "6": {
//     "cashFlow": 7864,
//     "isActuals": true
//   },
//   "7": {
//     "cashFlow": 25360,
//     "isActuals": true
//   },
//   "8": {
//     "cashFlow": 28107,
//     "isActuals": true
//   },
//   "9": {
//     "cashFlow": 28942,
//     "isActuals": false
//   },
//   "10": {
//     "cashFlow": 28696,
//     "isActuals": false
//   },
//   "11": {
//     "cashFlow": 29356,
//     "isActuals": false
//   },
//   "12": {
//     "cashFlow": 28854,
//     "isActuals": false
//   },
//   "13": {
//     "cashFlow": 28588,
//     "isActuals": false
//   },
//   "14": {
//     "cashFlow": 30781,
//     "isActuals": false
//   },
//   "15": {
//     "cashFlow": 29081,
//     "isActuals": false
//   },
//   "16": {
//     "cashFlow": 31887,
//     "isActuals": false
//   },
//   "17": {
//     "cashFlow": 51887,
//     "isActuals": false
//   },
//   "18": {
//     "cashFlow": 71887,
//     "isActuals": false
//   },
//   "19": {
//     "cashFlow": 30339,
//     "isActuals": false
//   },
//   "20": {
//     "cashFlow": 30718,
//     "isActuals": false
//   },
//   "21": {
//     "cashFlow": 31102,
//     "isActuals": false
//   },
//   "22": {
//     "cashFlow": 31491,
//     "isActuals": false
//   },
//   "23": {
//     "cashFlow": 31885,
//     "isActuals": false
//   },
//   "24": {
//     "cashFlow": 32283,
//     "isActuals": false
//   },
//   "25": {
//     "cashFlow": 32687,
//     "isActuals": false
//   },
//   "26": {
//     "cashFlow": 33096,
//     "isActuals": false
//   },
//   "27": {
//     "cashFlow": 33509,
//     "isActuals": false
//   },
//   "28": {
//     "cashFlow": 33928,
//     "isActuals": false
//   }
// };
//
// const cashflowData = calculateCashflowData(cashflow);
// const { actual_cashflow, accum_actual_cashflow, accum_projected_cashflow, projected_cashflow } = cashflowData;
