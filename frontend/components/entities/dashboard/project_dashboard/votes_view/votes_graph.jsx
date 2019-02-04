import React from 'react';
import { connect } from 'react-redux';
import VotesViewCapitalRaised from './votes_view_capital_raised/votes_view_capital_raised';
import VotesViewPitchedProjects from './votes_view_pitched_projects/votes_view_pitched_projects';
import VoteShiftTool from './vote_shift_tool';
// import ProjectModules from '../project_modules/project_modules_subcomponents';
import { calculateCashflowData } from '../../../../../util/project_api_util';
import './votes_graph.scss';
import { fetchTokenPurchaseLogs } from '../../../../../actions/chain_actions/token_actions';

const deployedProjectsValuationMinMax = (projects) => {
  const projectValuations = projects.map(project => project.valuation);

  return [Math.min(...projectValuations), Math.max(...projectValuations)];
};

const mapStateToProps = state => {
  const projectPropsData = Object.keys(state.entities.projects).reduce((propsData, projectTitle) => {
    if (!propsData.deployedProjects) {
      propsData.deployedProjects = [];
      propsData.pitchedProjects = [];
      propsData.totalVotes = 0;
      propsData.maxValuation = 0;
      propsData.lastDeploymentTime = 0;
    }

    const project = state.entities.projects[projectTitle];
    propsData.totalVotes += project.votes;

    const deploymentTime = project.activationTime;
    if (deploymentTime) {
      propsData.deployedProjects.push(project);

      if (propsData.lastDeploymentTime > deploymentTime) {
        propsData.lastDeploymentTime = deploymentTime;
      }
    }
    else {
      propsData.pitchedProjects.push(project);
    }

    if (project.valuation > propsData.maxValuation) {
      propsData.maxValuation = project.valuation;
    }

    return propsData;
  }, {});

  const {
    deployedProjects,
    totalVotes,
    maxValuation,
    lastDeploymentTime
  } = projectPropsData;

  console.log("maxValuation", maxValuation)
  let scalingConstant;
  if (maxValuation >= 2500000) {
    scalingConstant = 24000;
  } else if (maxValuation >= 250000) {
    scalingConstant = 2400;
  } else if (maxValuation >= 25000) {
    scalingConstant = 240
  } else if (maxValuation >= 2500) {
    scalingConstant = 24
  } else if (maxValuation >= 250) {
    scalingConstant = 2.4
  } else {
    scalingConstant = .24;
  }

  const pitchedProjects = projectPropsData.pitchedProjects.map(project => {
    project.voteShare = project.votes / totalVotes;
    return project;
  }).sort((a, b) => b.voteShare - a.voteShare);

  const capitalPropsData = Object.keys(state.entities.capitalHistory).reduce((propsData, block) => {
    if (!propsData.lineData) {
      propsData.lineData = [];
      propsData.capitalTotal = 0;
      propsData.capitalBeingRaised = 0;
      propsData.startTime = block;
      propsData.endTime = block;
    }

    const capital = state.entities.capitalHistory[block];

    propsData.lineData.push({
      date: Number(block),
      capital
    });
    propsData.capitalTotal += capital;
    if (block >= lastDeploymentTime) {
      propsData.capitalBeingRaised += capital;
    }
    if (block < propsData.startTime) {
      propsData.startTime = block;
    }
    if (block > propsData.endTime) {
      propsData.endTime = block;
    }

    return propsData;
  }, {});
console.log("capitalPropsData", capitalPropsData)
  const {
    lineData,
    capitalTotal,
    capitalBeingRaised,
    startTime,
    endTime
  } = capitalPropsData;

  return {
    crowdsaleInstance: state.network.crowdsaleInstance,
    projectContract: state.network.projectContract,
    web3: state.network.web3,
    pitchedProjects,
    deployedProjects,
    maxValuation,
    deployedProjectsValuationMinMax: deployedProjectsValuationMinMax(deployedProjects),
    lineData,
    capitalTotal,
    capitalBeingRaised,
    startTime,
    endTime,
    scalingConstant
    // pitchedProjects: [
    //   {
    //     id: 1,
    //     valuation: 5000000,
    //     capitalRequired: 3500000,
    //     voteShare: .15,
    //     title: "Ryan and Liam"
    //   },
    //   {
    //     id: 2,
    //     valuation: 2000000,
    //     capitalRequired: 1500000,
    //     voteShare: .15,
    //     title: "Liam and Ryan"
    //   },
    //   {
    //     id: 3,
    //     valuation: 4000000,
    //     capitalRequired: 2500000,
    //     voteShare: .20,
    //     title: "HamInn"
    //   },
    //   {
    //     id: 4,
    //     valuation: 5000000,
    //     capitalRequired: 4000000,
    //     voteShare: .30,
    //     title: "Genesis"
    //   },
    //   {
    //     id: 5,
    //     valuation: 3500000,
    //     capitalRequired: 2000000,
    //     voteShare: .20,
    //     title: "Penn Generator"
    //   },
    // ].sort((a, b) => b.voteShare - a.voteShare),
    // maxValuation: 5000000,
    // capitalBeingRaised: 3000000,
    // capitalTotal: 7436961,
    // startTime: 0,
    // endTime: 13305600,
    // lineData: [
    //   { date: 0, capital: 0 },
    //   { date: 86400, capital: 50147 },
    //   { date: 172800, capital: 137587 },
    //   { date: 259200, capital: 149946 },
    //   { date: 345600, capital: 155944 },
    //   { date: 432000, capital: 248558 },
    //   { date: 518400, capital: 319406 },
    //   { date: 604800, capital: 387601 },
    //   { date: 691200, capital: 444419 },
    //   { date: 777600, capital: 444863 },
    //   { date: 864000, capital: 454784 },
    //   { date: 950400, capital: 500738 },
    //   { date: 1036800, capital: 533468 },
    //   { date: 1123200, capital: 631128 },
    //   { date: 1209600, capital: 667466 },
    //   { date: 1296000, capital: 731727 },
    //   { date: 1382400, capital: 796644 },
    //   { date: 1468800, capital: 856369 },
    //   { date: 1555200, capital: 907456 },
    //   { date: 1641600, capital: 983145 },
    //   { date: 1728000, capital: 1035892 },
    //   { date: 1814400, capital: 1054730 },
    //   { date: 1900800, capital: 1073885 },
    //   { date: 1987200, capital: 1161864 },
    //   { date: 2073600, capital: 1249835 },
    //   { date: 2160000, capital: 1301438 },
    //   { date: 2246400, capital: 1387165 },
    //   { date: 2332800, capital: 1409767 },
    //   { date: 2419200, capital: 1448957 },
    //   { date: 2505600, capital: 1499211 },
    //   { date: 2592000, capital: 1508061 },
    //   { date: 2678400, capital: 1603429 },
    //   { date: 2764800, capital: 1675468 },
    //   { date: 2851200, capital: 1747785 },
    //   { date: 2937600, capital: 1824746 },
    //   { date: 3024000, capital: 1864506 },
    //   { date: 3110400, capital: 1904421 },
    //   { date: 3196800, capital: 1993999 },
    //   { date: 3283200, capital: 1997808 },
    //   { date: 3369600, capital: 2025698 },
    //   { date: 3456000, capital: 2078452 },
    //   { date: 3542400, capital: 2130117 },
    //   { date: 3628800, capital: 2141060 },
    //   { date: 3715200, capital: 2173345 },
    //   { date: 3801600, capital: 2201100 },
    //   { date: 3888000, capital: 2269281 },
    //   { date: 3974400, capital: 2302932 },
    //   { date: 4060800, capital: 2320645 },
    //   { date: 4147200, capital: 2401478 },
    //   { date: 4233600, capital: 2426088 },
    //   { date: 4320000, capital: 2494043 },
    //   { date: 4406400, capital: 2562694 },
    //   { date: 4492800, capital: 2623975 },
    //   { date: 4579200, capital: 2651184 },
    //   { date: 4665600, capital: 2700414 },
    //   { date: 4752000, capital: 2720083 },
    //   { date: 4838400, capital: 2792658 },
    //   { date: 4924800, capital: 2865832 },
    //   { date: 5011200, capital: 2906960 },
    //   { date: 5097600, capital: 2991944 },
    //   { date: 5184000, capital: 2998339 },
    //   { date: 5270400, capital: 3023387 },
    //   { date: 5356800, capital: 3045225 },
    //   { date: 5443200, capital: 3119111 },
    //   { date: 5529600, capital: 3186918 },
    //   { date: 5616000, capital: 3257981 },
    //   { date: 5702400, capital: 3321461 },
    //   { date: 5788800, capital: 3375212 },
    //   { date: 5875200, capital: 3420192 },
    //   { date: 5961600, capital: 3502300 },
    //   { date: 6048000, capital: 3519421 },
    //   { date: 6134400, capital: 3571699 },
    //   { date: 6220800, capital: 3591518 },
    //   { date: 6307200, capital: 3591582 },
    //   { date: 6393600, capital: 3625698 },
    //   { date: 6480000, capital: 3664412 },
    //   { date: 6566400, capital: 3700010 },
    //   { date: 6652800, capital: 3758756 },
    //   { date: 6739200, capital: 3761769 },
    //   { date: 6825600, capital: 3850170 },
    //   { date: 6912000, capital: 3892981 },
    //   { date: 6998400, capital: 3899203 },
    //   { date: 7084800, capital: 3984101 },
    //   { date: 7171200, capital: 4018579 },
    //   { date: 7257600, capital: 4057277 },
    //   { date: 7344000, capital: 4100275 },
    //   { date: 7430400, capital: 4186331 },
    //   { date: 7516800, capital: 4265764 },
    //   { date: 7603200, capital: 4340432 },
    //   { date: 7689600, capital: 4344644 },
    //   { date: 7776000, capital: 4391015 },
    //   { date: 7862400, capital: 4471548 },
    //   { date: 7948800, capital: 4494371 },
    //   { date: 8035200, capital: 4498429 },
    //   { date: 8121600, capital: 4594910 },
    //   { date: 8208000, capital: 4657534 },
    //   { date: 8294400, capital: 4670068 },
    //   { date: 8380800, capital: 4746000 },
    //   { date: 8467200, capital: 4793670 },
    //   { date: 8553600, capital: 4874071 },
    //   { date: 8640000, capital: 4893771 },
    //   { date: 8726400, capital: 4898248 },
    //   { date: 8812800, capital: 4902317 },
    //   { date: 8899200, capital: 4955685 },
    //   { date: 8985600, capital: 4957791 },
    //   { date: 9072000, capital: 5017408 },
    //   { date: 9158400, capital: 5045530 },
    //   { date: 9244800, capital: 5050546 },
    //   { date: 9331200, capital: 5136154 },
    //   { date: 9417600, capital: 5211295 },
    //   { date: 9504000, capital: 5293457 },
    //   { date: 9590400, capital: 5340675 },
    //   { date: 9676800, capital: 5400774 },
    //   { date: 9763200, capital: 5459477 },
    //   { date: 9849600, capital: 5502679 },
    //   { date: 9936000, capital: 5543462 },
    //   { date: 10022400, capital: 5627196 },
    //   { date: 10108800, capital: 5642536 },
    //   { date: 10195200, capital: 5645476 },
    //   { date: 10281600, capital: 5646561 },
    //   { date: 10368000, capital: 5700387 },
    //   { date: 10454400, capital: 5729716 },
    //   { date: 10540800, capital: 5792246 },
    //   { date: 10627200, capital: 5859184 },
    //   { date: 10713600, capital: 5872459 },
    //   { date: 10800000, capital: 5895822 },
    //   { date: 10886400, capital: 5909032 },
    //   { date: 10972800, capital: 5991719 },
    //   { date: 11059200, capital: 6089638 },
    //   { date: 11145600, capital: 6131251 },
    //   { date: 11232000, capital: 6179972 },
    //   { date: 11318400, capital: 6191225 },
    //   { date: 11404800, capital: 6254200 },
    //   { date: 11491200, capital: 6327969 },
    //   { date: 11577600, capital: 6408183 },
    //   { date: 11664000, capital: 6469141 },
    //   { date: 11750400, capital: 6523031 },
    //   { date: 11836800, capital: 6535481 },
    //   { date: 11923200, capital: 6607649 },
    //   { date: 12009600, capital: 6704404 },
    //   { date: 12096000, capital: 6734821 },
    //   { date: 12182400, capital: 6807325 },
    //   { date: 12268800, capital: 6838454 },
    //   { date: 12355200, capital: 6870105 },
    //   { date: 12441600, capital: 6951459 },
    //   { date: 12528000, capital: 7033402 },
    //   { date: 12614400, capital: 7091465 },
    //   { date: 12700800, capital: 7091904 },
    //   { date: 12787200, capital: 7103459 },
    //   { date: 12873600, capital: 7192383 },
    //   { date: 12960000, capital: 7217312 },
    //   { date: 13046400, capital: 7300752 },
    //   { date: 13132800, capital: 7400527 },
    //   { date: 13219200, capital: 7416239 },
    //   { date: 13305600, capital: 7436961 }
    // ],
    // deployedProjects: [
    //   {
    //     title: 'proj1',
    //     time: 3369600,
    //     capital: 1900000,
    //     valuation: 3000000,
    //     cashflow: cashflow,
    //     accum_actual_cashflow: accum_actual_cashflow,
    //     projected_cashflow: projected_cashflow,
    //     actual_cashflow: actual_cashflow,
    //     accum_projected_cashflow: accum_projected_cashflow,
    //     summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //     latitude: 40.836370,
    //     longitude: -73.944585,
    //   },
    //   {
    //     title: 'proj2',
    //     time: 6825600,
    //     capital: 2500000,
    //     valuation: 4000000,
    //     cashflow: cashflow,
    //     accum_actual_cashflow: accum_actual_cashflow,
    //     projected_cashflow: projected_cashflow,
    //     actual_cashflow: actual_cashflow,
    //     accum_projected_cashflow: accum_projected_cashflow,
    //     summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //     latitude: 40.836370,
    //     longitude: -73.944585,
    //   },
    //   {
    //     title: 'proj3',
    //     time: 11318400,
    //     capital: 4436961,
    //     valuation: 6000000,
    //     cashflow: cashflow,
    //     accum_actual_cashflow: accum_actual_cashflow,
    //     projected_cashflow: projected_cashflow,
    //     actual_cashflow: actual_cashflow,
    //     accum_projected_cashflow: accum_projected_cashflow,
    //     summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //     latitude: 40.836370,
    //     longitude: -73.944585,
    //   }
    // ],
    // deployedProjectsValuationMinMax: deployedProjectsValuationMinMax(
    //   [
    //     {
    //       title: 'proj1',
    //       time: 3369600,
    //       capital: 1900000,
    //       valuation: 3000000
    //     },
    //     {
    //       title: 'proj2',
    //       time: 6825600,
    //       capital: 2500000,
    //       valuation: 4000000
    //     },
    //     {
    //       title: 'proj3',
    //       time: 11318400,
    //       capital: 4436961,
    //       valuation: 6000000
    //     }
    //   ]
    // ),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTokenPurchaseLogs: (crowdsale) => dispatch(fetchTokenPurchaseLogs(crowdsale))
  }
}

export class VotesGraph extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedProject: null
    };

    // this.fetchVotesViewData = this.fetchVotesViewData.bind(this);
  }

  componentDidMount () {
    this.props.fetchTokenPurchaseLogs(this.props.crowdsaleInstance);
  }

  render() {
    const { maxValuation, capitalBeingRaised, capitalTotal } = this.props;
      if (this.props.lineData) {
        return (
          <div className="votes-graph" style={{ marginTop: maxValuation / this.props.scalingConstant }}>
            <div className="vote-shift-tool-container"
              ref={node => this.voteShiftTool = node}
              style={{ top: -maxValuation / this.props.scalingConstant }}>
              {
                this.state.selectedProject &&
                <VoteShiftTool />
              }
            </div>
            <svg className="votes-view-svg" height={capitalTotal / this.props.scalingConstant}>
              <VotesViewCapitalRaised
                {...this.props}
                {...this.state}/>
              <VotesViewPitchedProjects
                {...this.props}
                {...this.state}
                voteShiftTool={this.voteShiftTool}
                toggleSelectedProject={selectedProject => this.setState({selectedProject})}/>
            </svg>
          </div>
        );
      }

      return [];
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(VotesGraph);

const cashflow = {
  "1": {
    "cashFlow": -36974,
    "isActuals": true
  },
  "2": {
    "cashFlow": -40018,
    "isActuals": true
  },
  "3": {
    "cashFlow": -16857,
    "isActuals": true
  },
  "4": {
    "cashFlow": -2915,
    "isActuals": true
  },
  "5": {
    "cashFlow": -20325,
    "isActuals": true
  },
  "6": {
    "cashFlow": 7864,
    "isActuals": true
  },
  "7": {
    "cashFlow": 25360,
    "isActuals": true
  },
  "8": {
    "cashFlow": 28107,
    "isActuals": true
  },
  "9": {
    "cashFlow": 28942,
    "isActuals": false
  },
  "10": {
    "cashFlow": 28696,
    "isActuals": false
  },
  "11": {
    "cashFlow": 29356,
    "isActuals": false
  },
  "12": {
    "cashFlow": 28854,
    "isActuals": false
  },
  "13": {
    "cashFlow": 28588,
    "isActuals": false
  },
  "14": {
    "cashFlow": 30781,
    "isActuals": false
  },
  "15": {
    "cashFlow": 29081,
    "isActuals": false
  },
  "16": {
    "cashFlow": 31887,
    "isActuals": false
  },
  "17": {
    "cashFlow": 51887,
    "isActuals": false
  },
  "18": {
    "cashFlow": 71887,
    "isActuals": false
  },
  "19": {
    "cashFlow": 30339,
    "isActuals": false
  },
  "20": {
    "cashFlow": 30718,
    "isActuals": false
  },
  "21": {
    "cashFlow": 31102,
    "isActuals": false
  },
  "22": {
    "cashFlow": 31491,
    "isActuals": false
  },
  "23": {
    "cashFlow": 31885,
    "isActuals": false
  },
  "24": {
    "cashFlow": 32283,
    "isActuals": false
  },
  "25": {
    "cashFlow": 32687,
    "isActuals": false
  },
  "26": {
    "cashFlow": 33096,
    "isActuals": false
  },
  "27": {
    "cashFlow": 33509,
    "isActuals": false
  },
  "28": {
    "cashFlow": 33928,
    "isActuals": false
  }
};

const cashflowData = calculateCashflowData(cashflow);
const { actual_cashflow, accum_actual_cashflow, accum_projected_cashflow, projected_cashflow } = cashflowData;
