import React from 'react';
import { keys } from 'lodash';
import CashFlowGraph from '../../../../entities/dashboard/project_dashboard/project_cashflow_graph';
import ThumbsUp from '../thumbs_up_svg';

class CashFlow extends React.Component {
  constructor(props) {
    super(props);
    // Uploading local JSON files may not be possible. May have to refactor
    // ProjectForm later to account for that.
    let { cashflowData, currentQuarter  } = this.props;
    const project = cashflowData ? cashflowData : sampleProject;
    currentQuarter = currentQuarter ? currentQuarter : sampleCurrentQuarter;
    this.state = {
      project,
      accumulatedRevenue: this.calculateAccumulatedRevenue(project),
      currentQuarter
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.processJSONForGraph = this.processJSONForGraph.bind(this);
    this.renderColor = this.renderColor.bind(this);
    this.update = this.update.bind(this);
    this.calculateAccumulatedRevenue = this.calculateAccumulatedRevenue.bind(this);
  }


  handleSubmit() {

  }

  update(quarter) {
    return e => {
      let project = Object.assign({}, this.state.project);
      project[quarter] = e.currentTarget.value;
      const accumulatedRevenue = this.calculateAccumulatedRevenue(project);
      this.setState({ project, accumulatedRevenue });
    };
  }

  calculateAccumulatedRevenue(project) {
    const accumulatedRevenue = {};
    let accumulatedSum = 0;
    const quarters = keys(project).sort();
    quarters.forEach(quarter => {
      accumulatedSum += project[quarter];
      accumulatedRevenue[quarter] = accumulatedSum;
    });
    return accumulatedRevenue;
  }

  processJSONForGraph(project) {
    return JSON.stringify(project);
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
    const { project,
      // accumulatedRevenue, // Add in when incorporating cashflowgraph
      currentQuarter } = this.state;
    const quarters = keys(project);
    return(
      <form onSubmit={this.handleSubmit}>
        <h3>Quarter</h3>
        <h3>Cashflow</h3>
        <div>
          {quarters.map((quarter, idx) => {
            return(
              <React.Fragment key={idx}>
                <label htmlFor={`quarter-${quarter}`}>{`${quarter}`}</label>
                <input className={this.renderColor(currentQuarter, quarter)}
                  id={`quarter-${quarter}`}
                  type="number"
                  placeholder="10,000"
                  onChange={this.update(quarter)}
                  value={project[quarter]} />
              </React.Fragment>
            );
          })}
        </div>
        <button>Download Json Sample</button>

        <input type="submit" value="Submit" />
        <div className="blue-close-modal-button close-modal-button"
          onClick={this.props.closeModal}>&times;</div>
        <ThumbsUp />
      </form>
    );
  }
}

export default CashFlow;

// Add graph later, after refactor is complete
// <CashFlowGraph
// cashflow={this.processJSONForGraph(project)}
// valuation={"?"}
// currrentQuarter={currentQuarter}
// accumulatedRevenue={this.processJSONForGraph(accumulatedRevenue)} />

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