import React from 'react';
import { keys } from 'lodash';
import CashFlowGraph from '../../../../entities/dashboard/project_dashboard/project_cashflow_graph';
import ThumbsUp from '../thumbs_up_svg';
import { calculateAccumulatedRevenue,  processCashData } from '../../../../../util/project_api_util';

class CashFlow extends React.Component {
  constructor(props) {
    super(props);
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


  handleSubmit() {

  }

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
  }

  render() {
    // 7 years of data is the standard, translating to 28 quarters
    const { project,
      accumulatedRevenue,
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
        <CashFlowGraph
          cashflow={project}
          valuation={"?"}
          accumulatedRevenue={accumulatedRevenue} />
        <input type="submit" value="Submit">
          <ThumbsUp />
        </input>
        <div className="blue-close-modal-button close-modal-button"
          onClick={this.props.closeModal}>&times;</div>
      </form>
    );
  }
}

export default CashFlow;

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