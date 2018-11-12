import React from 'react';
import { keys } from 'lodash';
import CashFlowGraph from '../../../../entities/dashboard/project_dashboard/project_cashflow_graph';
import ThumbsUp from '../thumbs_up_svg';
<<<<<<< HEAD
import { calculateAccumulatedRevenue,  processCashData } from '../../../../../util/project_api_util';
=======
>>>>>>> f234ed41bb42670a8bc8a619df390d9b466b0410

class CashFlow extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    // Uploading local JSON files may not be possible. May have to refactor
    // ProjectForm later to account for that.
    let { cashflowData, currentQuarter  } = this.props;
    const project = cashflowData ? processCashData(cashflowData) : sampleProject;
    currentQuarter = currentQuarter ? currentQuarter : sampleCurrentQuarter;
    this.state = {
      project,
      accumulatedRevenue: calculateAccumulatedRevenue(project),
      currentQuarter
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.processJSONForGraph = this.processJSONForGraph.bind(this);
    this.renderColor = this.renderColor.bind(this);
    this.update = this.update.bind(this);
  }

=======
    // Because the cashFlowGraph requires cashflow to be a string that is parsed into JSON,
    // setting up an example file is difficult. All the cashflow data has to be placed on
    // one line in test.json to work. Currently it stands at around 1300 characters long.
    // Suggested project refactoring in the future for easier user input.

    // const { cashflowData } = this.props;
    // const project = cashflowData === '' ? sampleProject : cashflowData;
    // If json files cannot be uploaded and read the above lines will return undefined
    const project = sampleProject;
    this.state = {
      project
    };

    this.defaultCashValue = this.defaultCashValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.processJSONForGraph = this.processJSONForGraph.bind(this);
  }

  defaultCashValue(value) {
    return value === undefined ? '' : value;
  }
>>>>>>> f234ed41bb42670a8bc8a619df390d9b466b0410

  handleSubmit() {

  }

<<<<<<< HEAD
  update(quarter) {
    return e => {
      e.preventDefault();
      let project = Object.assign({}, this.state.project);
      project[quarter] = e.currentTarget.value;
      const accumulatedRevenue = calculateAccumulatedRevenue(project);
      this.setState({ project, accumulatedRevenue });
    };
  }

  renderColor(currentQuarter, quarter) {
    if (quarter <= currentQuarter) {
      return "actual-quarter-blue";
    } else {
      return "expected-quarter-black";
    }
=======
  processJSONForGraph(project) {
    project.cashflow = JSON.stringify(project.cashflow);
    return project;
>>>>>>> f234ed41bb42670a8bc8a619df390d9b466b0410
  }

  render() {
    // 7 years of data is the standard, translating to 28 quarters
<<<<<<< HEAD
    const { project,
      accumulatedRevenue,
      currentQuarter } = this.state;
    const quarters = keys(project);
    return(
      <form onSubmit={this.handleSubmit}>
        <h3>Quarter</h3>
        <h3>Cashflow</h3>
=======
    const { ExpectedNet, Actual } = this.state.project.cashflow;
    const quarters = keys(ExpectedNet);
    return(
      <form onSubmit={this.handleSubmit}>
        <h3>Quarter</h3>
        <h3>Expected</h3>
        <h3>Actual</h3>
>>>>>>> f234ed41bb42670a8bc8a619df390d9b466b0410
        <div>
          {quarters.map((quarter, idx) => {
            return(
              <React.Fragment key={idx}>
<<<<<<< HEAD
                <label htmlFor={`quarter-${quarter}`}>{`${quarter}`}</label>
                <input className={this.renderColor(currentQuarter, quarter)}
                  id={`quarter-${quarter}`}
                  type="number"
                  placeholder="10,000"
                  onChange={this.update(quarter)}
                  value={project[quarter]} />
=======
                <p>{`${quarter}`}</p>
                <input type="number" placeholder="10,000" value={this.defaultCashValue(ExpectedNet[quarter])} />
                <input type="number" placeholder="10,000" value={this.defaultCashValue(Actual[quarter])} />
>>>>>>> f234ed41bb42670a8bc8a619df390d9b466b0410
              </React.Fragment>
            );
          })}
        </div>
        <button>Download Json Sample</button>
<<<<<<< HEAD
        <CashFlowGraph
          cashflow={project}
          valuation={"?"}
          accumulatedRevenue={accumulatedRevenue} />
        <input type="submit" value="Submit">
          <ThumbsUp />
        </input>
        <div className="blue-close-modal-button close-modal-button"
          onClick={this.props.closeModal}>&times;</div>
=======
        <CashFlowGraph project={this.processJSONForGraph(this.state.project)} />
        <input type="submit" value="Submit" />
        <div className="blue-close-modal-button close-modal-button"
          onClick={this.props.closeModal}>&times;</div>
        <ThumbsUp />
>>>>>>> f234ed41bb42670a8bc8a619df390d9b466b0410
      </form>
    );
  }
}

export default CashFlow;
<<<<<<< HEAD

// cashflow represented as single string for graph
const sampleProject = {
  "01A": -36974,
  "02A": -40018,
  "03A": -16857,
  "04A": -2915,
  "05A": -20325,
  "06A": 7864,
  "07A": 25360,
  "08A": 28107,
  "09A": 28942,
  "10A": 28696,
  "11A": 29356,
  "12A": 28854,
  "13A": 28588,
  "14A": 30781,
  "15A": 29081,
  "16A": 31887,
  "17A": 51887,
  "18A": 71887,
  "19P": 30339,
  "20P": 30718,
  "21P": 31102,
  "22P": 31491,
  "23P": 31885,
  "24P": 32283,
  "25P": 32687,
  "26P": 33096,
  "27P": 33509,
  "28P": 33928,
};

const sampleCurrentQuarter = 18;
=======
// cashflow represented as single string for graph
const sampleProject = {
  "valuation": 10000000,
  "cashflow": {
    "ExpectedNet": {
      "1": -35673,
      "2": -39513,
      "3": -16726,
      "4": -2851,
      "5": -20019,
      "6": 7389,
      "7": 23906,
      "8": 26108,
      "9": 27480,
      "10": 28224,
      "11": 28409,
      "12": 27812,
      "13": 28160,
      "14": 28512,
      "15": 28868,
      "16": 29229,
      "17": 29595,
      "18": 29965,
      "19": 30339,
      "20": 30718,
      "21": 31102,
      "22": 31491,
      "23": 31885,
      "24": 32283,
      "25": 32687,
      "26": 33096,
      "27": 33509,
      "28": 33928
    },
    "Actual": {
      "1": -36974,
      "2": -40018,
      "3": -16857,
      "4": -2915,
      "5": -20325,
      "6": 7864,
      "7": 25360,
      "8": 28107,
      "9": 28942,
      "10": 28696,
      "11": 29356,
      "12": 28854,
      "13": 28588,
      "14": 30781,
      "15": 29081,
      "16": 31887,
      "17": 51887,
      "18": 71887
    },
    "ExpectedAccumulatedGainorLoss":{
      "1": -77678,
      "2": -183498,
      "3": -250476,
      "4": -261938,
      "5": -266505,
      "6": -187214,
      "7": -19324,
      "8": 207228,
      "9": 487017,
      "10": 808317,
      "11": 1137949,
      "12": 1473943,
      "13": 1492367,
      "14": 1511022,
      "15": 1529910,
      "16": 1549033,
      "17": 1568396,
      "18": 1588001,
      "19": 1607851,
      "20": 1627949,
      "21": 1648299,
      "22": 1668903,
      "23": 1689764,
      "24": 1710886,
      "25": 1732272,
      "26": 1753925,
      "27": 1775849,
      "28": 1798048
    },
    "ActualAccumulatedGainorLoss":{
      "1": -38839,
      "2": -91749,
      "3": -125238,
      "4": -130969,
      "5": -133252,
      "6": -93607,
      "7": -9662,
      "8": 103614,
      "9": 243508,
      "10": 404158,
      "11": 568974,
      "12": 736971,
      "13": 846183,
      "14": 955511,
      "15": 1000000,
      "16": 1100000,
      "17": 1200000,
      "18": 1300000
    }
  }
};
>>>>>>> f234ed41bb42670a8bc8a619df390d9b466b0410
