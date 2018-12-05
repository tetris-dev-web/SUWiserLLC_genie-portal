import React from 'react';
import { keys, merge } from 'lodash';
import CashFlowGraph from '../../../../entities/dashboard/project_dashboard/project_modules_cashflow';
import ThumbsUp from '../thumbs_up_svg';
import { calculateAccumulatedRevenue,  processCashData } from '../../../../../util/project_api_util';

class CashFlowInputSheet extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      cashflow: this.props.cashflow,
      currentQuarter: this.props.quarter,
      accumulatedRevenue: '',
      actual_cashflow: '',
      accum_actual_cashflow: '',
      projected_cashflow: '',
      accum_projected_cashflow: '',
    };

    // this.state.currentQuarter ? '' : this.setState({currentQuarter: sampleCurrentQuarter});

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderColor = this.renderColor.bind(this);
    // console.log("Props are: ", this.props);
    this.update = this.update.bind(this);
    this.downloadJSONSample = this.downloadJSONSample.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.closeModalAndSendCashflowDataToPitchForm = this.closeModalAndSendCashflowDataToPitchForm.bind(this);
    // this.findCurrentQuarter = this.findCurrentQuarter.bind(this);
  }

  handleSubmit(e) {
    const { cashflow } = this.state;
    console.log("Cashflow from inputsheet is: ", cashflow);
    e.preventDefault();
    this.props.updateCashflow(cashflow)(e);
  }

  update(quarter) {
    // console.log("Type of quarter is: ", typeof quarter);
    return e => {
      e.preventDefault();
      let cashflow = merge({}, this.state.cashflow);
      cashflow[quarter].cashFlow = parseInt(e.currentTarget.value);
      const accumulatedRevenue = calculateAccumulatedRevenue(cashflow);
      this.setState({ cashflow, accumulatedRevenue });
    };
  }

  renderColor(quarter) {
    return quarter < this.state.currentQuarter ? "actual-quarter-blue" : "expected-quarter-black";
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

  closeModalAndSendCashflowDataToPitchForm(e){
    this.handleSubmit(e);
    this.props.closeModal();
    // this.props.receiveCashflowData(this.state)
  }

  // setupCashflow(cashflow, currentQuarter) {
  //   // Formats cashflow keys from "##" to "##A" or "##P". If keys already formatted
  //   // this way, no need to update the JSON.
  //   const cashflowKeys= keys(cashflow).sort();
  //   if (cashflowKeys[0][2] === "A" || cashflowKeys[0][2] === "P") {
  //     return cashflow;
  //   }
  //   const newCashflow = {};
  //   cashflowKeys.forEach(quarter => {
  //     let letter = parseInt(quarter) <= currentQuarter ? "A" : "P";
  //     newCashflow[`${quarter}${letter}`] = cashflow[quarter];
  //   });
  //   return newCashflow;
  // }

  downloadJSONSample() {
    let jsonFile = "data:text/json;charset=utf-8,";
    jsonFile += encodeURIComponent(JSON.stringify(sampleProject));
    return <a href={jsonFile} download="example.json">Download Sample JSON</a>;
  }
  // Has been moved to project_form.jsx
  // findCurrentQuarter(quarters) {
  //   const { cashflow } = this.state;
  //   let currentQuarter;
  //   quarters.some(quarter => {
  //     if (!cashflow[quarter.toString()]["isActuals"]) {
  //       currentQuarter = quarter;
  //       return !cashflow[quarter.toString()]["isActuals"];
  //     }
  //   })
  //   this.setState({currentQuarter});
  // }

  componentDidMount(){
    // let { cashflowData } = this.props;
    // let promise;
    // if (cashflowData instanceof File) {
    //   //file reader to read file, parse json, substitute json in for cashflow below
    //   //doesnt work when you pass file into function, file in function is undefined
    //   let content;
    //   let cashflow;
    //   promise = new Promise(function(resolve, reject){
    //     let fileReader = new FileReader();
    //     fileReader.onload = () => {
    //       console.log("Promise is running");
    //       content = fileReader.result;
    //       cashflowData = content;
    //       resolve(cashflowData)
    //     };
    //     // console.log("Resolve return",fileReader.readAsText(cashflowData));
    //     fileReader.readAsText(cashflowData);
    //
    //
    //     fileReader.onerror = () => {
    //       fileReader.abort();
    //       reject(new DOMException("Problem parsing input file."));
    //     };
    //
    //   })
    //
    //   promise.then((cashflowData) => {
    //     cashflow = processCashData(cashflowData);
    //     // cashflow = this.setupCashflow(cashflow, currentQuarter)
    //     let quarters = Object.keys(cashflow).map(Number).sort((a, b) => a - b);
    //     console.log('quarters is:', quarters);
    //
    //     this.setState({
    //       cashflow,
    //       accumulatedRevenue: calculateAccumulatedRevenue(cashflow)
    //     });
    //     this.findCurrentQuarter(quarters);
    //     console.log("currquar: ", this.state.currentQuarter);
    //   })
    // } else {
    //   let cashflow;
    //   cashflowData ? cashflow = cashflowData :  cashflow = sampleProject;
    //   // cashflow = this.setupCashflow(cashflow, currentQuarter);
    //   console.log("Else clause is running");
    //   console.log("Cashflow is: ", cashflow);
    //   this.setState({
    //     cashflow,
    //     accumulatedRevenue: calculateAccumulatedRevenue(cashflow),
    //   });
    // }
  }

  componentWillUnmount(){

  }

  render() {
    // 7 years of data is the standard, translating to 28 quarters
    const { cashflow, accumulatedRevenue } = this.state;
    const quarters = keys(cashflow);
    let quartersList = quarters.map((quarter, idx) => {
      return(
        <li className="flex-display" key={idx}>
          <label htmlFor={`quarter-${quarter}`}>{`${quarter.substring(0, 2)}`}</label>
          <input className={this.renderColor(quarter)}
            id={`quarter-${quarter}`}
            type="number"
            placeholder="10,000"
            onChange={this.update(quarter)}
            value={cashflow[quarter]["cashFlow"]} />
        </li>
      );
    });
    return(
      <div className="cashflow-upload">
        <div className="cashflow-title-flex">
          <h3>quarter</h3>
          <h3>cashflow</h3>
        </div>
        <ul className="scrollable">
          { quartersList }
        </ul>
        <div>
          <p>
            The cashflow JSON should reflect 7 years of financial data, actual and expected.
            Projections should be based in deep economic research, showcased in the uploaded business plan.
          </p>
          {this.downloadJSONSample()}
        </div>
        <div className="cashflow-submit">
          <input type="submit" value="SUBMIT"
            onClick={this.closeModalAndSendCashflowDataToPitchForm} />
        </div>
        <div className="blue-close-modal-button close-modal-button"
          onClick={this.closeModalAndSendCashflowDataToPitchForm}>&times;</div>
      </div>
    );
  }
}
// {
//   !accumulatedRevenue ?  <p>Loading...</p> :
//   <CashFlowGraph
//   cashflow={cashflow}
//   valuation={"?"}
//   accumulatedRevenue={accumulatedRevenue} />
// }

export default CashFlowInputSheet;

// cashflow represented as single string for graph
const sampleProject = {
  "1": {
    "cashFlow": -30000,
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

const sampleCurrentQuarter = 18;
