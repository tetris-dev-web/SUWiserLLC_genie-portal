import React from 'react';
import { keys } from 'lodash';
import CashFlowGraph from '../../../../entities/dashboard/project_dashboard/project_cashflow_graph';
import ThumbsUp from '../thumbs_up_svg';

class CashFlow extends React.Component {
  constructor(props) {
    super(props);
    // Uploading local JSON files may not be possible. May have to refactor
    // ProjectForm later to account for that.
    let { cashflowData, currentQtr  } = this.props;
    const project = cashflowData ? cashflowData : sampleProject;
    currentQtr = currentQtr ? currentQtr : 28;
    this.state = {
      project,
      currentQtr
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.processJSONForGraph = this.processJSONForGraph.bind(this);
    this.renderColor = this.renderColor.bind(this);
  }


  handleSubmit() {

  }

  processJSONForGraph(project) {
    project.cashflow = JSON.stringify(project.cashflow);
    return project;
  }

  renderColor(currentQuarter, quarter) {
    if (quarter <= currentQuarter) {
      return "actual-quarter-blue";
    } else {
      return "expected-quarter-black";
    }
  }

  render() {
    // 7 years of data is the standard, translating to 28 quarters
    const { project } = this.state;
    const quarters = keys(project);
    return(
      <form onSubmit={this.handleSubmit}>
        <h3>Quarter</h3>
        <h3>Cashflow</h3>
        <div>
          {quarters.map((quarter, idx) => {
            return(
              <React.Fragment key={idx}>
                <p>{`${quarter}`}</p>
                <input className={this.renderColor(this.state.currentQtr, quarter)}
                  type="number"
                  placeholder="10,000"
                  value={this.defaultCashValue(project[quarter])} />
              </React.Fragment>
            );
          })}
        </div>
        <button>Download Json Sample</button>
        <CashFlowGraph project={this.processJSONForGraph(this.state.project)} />
        <input type="submit" value="Submit" />
        <div className="blue-close-modal-button close-modal-button"
          onClick={this.props.closeModal}>&times;</div>
        <ThumbsUp />
      </form>
    );
  }
}

export default CashFlow;
// cashflow represented as single string for graph
const sampleProject = {
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
