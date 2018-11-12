import React from 'react';
import { keys } from 'lodash';
import CashFlowGraph from '../../../../entities/dashboard/project_dashboard/project_cashflow_graph';
import ThumbsUp from '../thumbs_up_svg';
import { calculateAccumulatedRevenue,  processCashData } from '../../../../../util/project_api_util';

class CashFlow extends React.Component {
  constructor(props) {
    super(props);
    let { cashflowData, currentQuarter  } = this.props;
    currentQuarter = currentQuarter ? currentQuarter : sampleCurrentQuarter;
    let cashflow = cashflowData ? processCashData(cashflowData) : sampleProject;
    cashflow = this.setupCashflow(cashflow, currentQuarter);
    this.state = {
      cashflow,
      accumulatedRevenue: calculateAccumulatedRevenue(cashflow),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderColor = this.renderColor.bind(this);
    this.update = this.update.bind(this);
    this.downloadJSONSample = this.downloadJSONSample.bind(this);
  }

  handleSubmit() {
    const { cashflow } = this.state;
    this.props.updateCashflow(cashflow);
  }

  update(quarter) {
    return e => {
      e.preventDefault();
      let cashflow = Object.assign({}, this.state.cashflow);
      cashflow[quarter] = e.currentTarget.value;
      const accumulatedRevenue = calculateAccumulatedRevenue(cashflow);
      this.setState({ cashflow, accumulatedRevenue });
    };
  }

  renderColor(quarter) {
    return quarter[2] === "A" ? "actual-quarter-blue" : "expected-quarter-black";
  }

  setupCashflow(cashflow, currentQuarter) {
    // Formats cashflow keys from "##" to "##A" or "##P". If keys already formatted
    // this way, no need to update the JSON.
    const cashflowKeys= keys(cashflow).sort();
    if (cashflowKeys[0][2] === "A" || cashflowKeys[0][2] === "P") {
      return cashflow;
    }
    const newCashflow = {};
    cashflowKeys.forEach(quarter => {
      let letter = parseInt(quarter) <= currentQuarter ? "A" : "P";
      newCashflow[`${quarter}${letter}`] = cashflow[quarter];
    });
    return newCashflow;
  }

  downloadJSONSample() {
    let jsonFile = "data:text/json;charset=utf-8,";
    jsonFile += encodeURIComponent(JSON.stringify(sampleProject));
    return <a href={jsonFile} download="example.json">Download Sample JSON</a>;
  }

  render() {
    // 7 years of data is the standard, translating to 28 quarters
    const { cashflow, accumulatedRevenue } = this.state;
    const quarters = keys(cashflow);
    return(
      <form onSubmit={this.handleSubmit} className="cashflow-upload">
        <div className="flex-display">
          <h3>Quarter</h3>
          <h3>Cashflow</h3>
        </div>
        <ul className="scrollable">
          {quarters.map((quarter, idx) => {
            return(
              <li className="flex-display" key={idx}>
                <label htmlFor={`quarter-${quarter}`}>{`${quarter.substring(0, 2)}`}</label>
                <input className={this.renderColor(quarter)}
                  id={`quarter-${quarter}`}
                  type="number"
                  placeholder="10,000"
                  onChange={this.update(quarter)}
                  value={cashflow[quarter]} />
              </li>
            );
          })}
        </ul>
        <div>
          <p>
            The cashflow JSON should reflect 7 years of financial data, actual and expected.
            Projections should be based in deep economic research, showcased in the uploaded business plan.
          </p>
          {this.downloadJSONSample()}
        </div>
        <CashFlowGraph
          cashflow={cashflow}
          valuation={"?"}
          accumulatedRevenue={accumulatedRevenue} />
        <label>
          <input type="submit" value="Submit" />
          <ThumbsUp />
        </label>
        <div className="blue-close-modal-button close-modal-button"
          onClick={this.props.closeModal}>&times;</div>
      </form>
    );
  }
}

export default CashFlow;

// cashflow represented as single string for graph
const sampleProject = {
  "01": -36974,
  "02": -40018,
  "03": -16857,
  "04": -2915,
  "05": -20325,
  "06": 7864,
  "07": 25360,
  "08": 28107,
  "09": 28942,
  "10": 28696,
  "11": 29356,
  "12": 28854,
  "13": 28588,
  "14": 30781,
  "15": 29081,
  "16": 31887,
  "17": 51887,
  "18": 71887,
  "19": 30339,
  "20": 30718,
  "21": 31102,
  "22": 31491,
  "23": 31885,
  "24": 32283,
  "25": 32687,
  "26": 33096,
  "27": 33509,
  "28": 33928,
};

const sampleCurrentQuarter = 18;