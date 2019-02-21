import React from 'react';
import * as d3 from 'd3';
import VotesViewCapitalRaised from './votes_view_capital_raised/votes_view_capital_raised';
import VotesViewPitchedProjects from './votes_view_pitched_projects/votes_view_pitched_projects';
import VoteShiftTool from './vote_shift_tool';
import './votes_graph.scss';


class VotesGraph extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedProject: null,
      componentVisible: "invisible"
    };

    this.SVGWidth = 960;
    this.SVGHeight = 500;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({componentVisible: ""});
    }, this.props.wait);

    this.props.fetchTokenPurchaseLogs(this.props.crowdsaleInstance);
  }

  createScales(){
    const {capitalBeingRaised, capitalTotal, startTime, endTime, lineData, maxValuation, deployedProjectsValuationMinMax} = this.props;
    
    console.log("graph props", this.props)
    return {
      SVGHeightScale : d3.scaleLinear()
        .range([0, this.SVGHeight])
        .domain([0, capitalTotal + (deployedProjectsValuationMinMax[1] - capitalBeingRaised) * 2]),
      SVGYScale : d3.scaleLinear()
        .range([this.SVGHeight, 0])
        .domain([0, capitalTotal + (deployedProjectsValuationMinMax[1] - capitalBeingRaised) * 2]),
      SVGTimeXScale: d3.scaleLinear()
        .domain([startTime, endTime])
        .range([0, this.SVGWidth]),
    }
  }

  dataHasLoaded(){
    return this.props.lineData
  }

  renderGraph() {
    const { SVGHeightScale, SVGYScale, SVGTimeXScale } = this.createScales();
    const { selectedProject, componentVisible } = this.state;

    return (
      <div className={`votes-graph ${componentVisible}`}>
          <div className="vote-shift-tool-container"
            ref={node => this.voteShiftTool = node}>
            {
              selectedProject &&
              <VoteShiftTool />
            }
          </div>
          <svg className="votes-view-svg"
            preserveAspectRatio="xMinYMin meet"
            viewBox="0 0 960 500">
              <VotesViewCapitalRaised
                {...this.props}
                {...this.state}
                SVGYScale={SVGYScale}
                SVGHeightScale={SVGHeightScale}
                SVGTimeXScale={SVGTimeXScale} />
              <VotesViewPitchedProjects
                {...this.props}
                {...this.state}
                SVGYScale={SVGYScale}
                SVGHeightScale={SVGHeightScale}
                SVGWidth={this.SVGWidth}
                voteShiftTool={this.voteShiftTool}
                toggleSelectedProject={selectedProject => this.setState({selectedProject})}/>
          </svg>
        </div>
      )
  }

  render() {
    return this.dataHasLoaded() ? this.renderGraph() : null
  }
}

export default VotesGraph;






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
