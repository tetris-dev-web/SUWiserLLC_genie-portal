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
    this.state = {
      cashflow: ''
    }


    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderColor = this.renderColor.bind(this);
    this.update = this.update.bind(this);
    this.downloadJSONSample = this.downloadJSONSample.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleSubmit() {
    const { cashflow } = this.state;
    this.props.updateCashflow(cashflow);
  }

  update(quarter) {
    return e => {
      e.preventDefault();
      console.log("State from update function", this.state);
      let cashflow = Object.assign({}, this.state.cashflow);
      cashflow[quarter] = e.currentTarget.value;
      const accumulatedRevenue = calculateAccumulatedRevenue(cashflow);
      this.setState({ cashflow, accumulatedRevenue });
      console.log(this.state.cashflow);
    };
  }

  renderColor(quarter) {
    return quarter[2] === "A" ? "actual-quarter-blue" : "expected-quarter-black";
  }

  handleFile(file, content){
    let fileReader = new FileReader();
    fileReader.onload = () => {
      content = fileReader.result;
      console.log(content);
    };
    fileReader.readAsText(file);
    // return content;
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

  componentDidMount(){
    let { cashflowData, currentQuarter  } = this.props;
    let promise;
    if (cashflowData instanceof File) {
      //file reader to read file, parse json, substitute json in for cashflow below
      //doesnt work when you pass file into function, file in function is undefined
      let content;
      promise = new Promise(function(resolve, reject){
        let fileReader = new FileReader();
        fileReader.onload = () => {
          console.log("Promise is running");
          content = fileReader.result;
          cashflowData = content;
          resolve(cashflowData)
        };
        // console.log("Resolve return",fileReader.readAsText(cashflowData));
        fileReader.readAsText(cashflowData);


        fileReader.onerror = () => {
          fileReader.abort();
          reject(new DOMException("Problem parsing input file."));
        };

      })
      promise.then((cashflowData)=> {
        // console.log("Cashflowdata is: ", cashflowData);
        // console.log("Promise resolved");
        // console.log("Content is: ", content);
        let cashflow = processCashData(cashflowData);
        cashflow = this.setupCashflow(cashflow, currentQuarter);
        this.setState({
          cashflow,
          accumulatedRevenue: calculateAccumulatedRevenue(cashflow),
        });
        console.log(this.state);
        // console.log("Keys is ", keys);
      })

    } else {
      let cashflow = sampleProject;
      cashflow = this.setupCashflow(cashflow, currentQuarter);
      this.setState({
        cashflow,
        accumulatedRevenue: calculateAccumulatedRevenue(cashflow),
      });
    }
  }

  render() {
    // 7 years of data is the standard, translating to 28 quarters
    console.log("Is this working?");
    const { cashflow, accumulatedRevenue } = this.state;
    // console.log(cashflow);
    console.log("AccRev is: ", accumulatedRevenue);
    console.log("Rendered state is: ", this.state);
    const quarters = keys(cashflow);
    return(
      <form onSubmit={this.handleSubmit} className="cashflow-upload">
        <div className="cashflow-title-flex">
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
        <div className="cashflow-submit">
          <input type="submit" value="SUBMIT" />
        </div>
        {
          !accumulatedRevenue ?  <p>Loading...</p> :
          <CashFlowGraph
          cashflow={cashflow}
          valuation={"?"}
          accumulatedRevenue={accumulatedRevenue} />
      }
        <div className="blue-close-modal-button close-modal-button"
          onClick={this.props.closeModal}>&times;</div>
      </form>
    );
  }
}

export default CashFlow;

// cashflow represented as single string for graph
const sampleProject = {
  "01": -50000,
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
