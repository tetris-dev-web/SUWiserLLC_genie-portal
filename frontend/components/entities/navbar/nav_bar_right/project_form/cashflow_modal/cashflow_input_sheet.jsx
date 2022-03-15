import React from "react";
import { keys, merge } from "lodash";
import ThumbsUp from "../thumbs_up_svg";
import {
  calculateAccumulatedRevenue,
  processCashData,
} from "../../../../../../util/project_api_util";

const CashFlowInputSheet = (props) => {
  const { cashflow, updateCashflow } = props;
  const { updateCashflowValue, updateActuals } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCashflow(cashflow)(e);
  };

  const renderColor = (quarter) => {
    return cashflow[quarter].isActuals ? "actual-quarter-blue" : "expected-quarter-black";
  };

  const handleFile = (file, content) => {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      content = fileReader.result;
      // console.log(content);
    };
    fileReader.readAsText(file);
    // return content;
  };

  const closeModalAndSendCashflowDataToPitchForm = (e) => {
    handleSubmit(e);
    props.closeModal();
    // this.props.receiveCashflowData(this.state)
  };

  const downloadJSONSample = () => {
    let jsonFile = "data:text/json;charset=utf-8,";
    jsonFile += encodeURIComponent(JSON.stringify(sampleProject));
    return (
      <a href={jsonFile} download="example.json">
        Download Sample JSON
      </a>
    );
  };

  //prepare to render

  const quarters = keys(cashflow);
  let checked;

  let quartersList = quarters.map((quarter, idx) => {
    return (
      <li className="flex-display" key={idx}>
        <label htmlFor={`quarter-${quarter}`}>{`${quarter.substring(0, 2)}`}</label>
        <input
          className={renderColor(quarter)}
          id={`quarter-${quarter}`}
          type="number"
          placeholder="10,000"
          onChange={updateCashflowValue(quarter, cashflow[quarter])}
          value={cashflow[quarter]["cashFlow"]}
        />
        <input
          type="checkbox"
          name={quarter}
          onChange={() => updateActuals(quarter, cashflow[quarter])}
          defaultChecked={cashflow[quarter].isActuals}
        />
      </li>
    );
  });

  return (
    <div className="cashflow-upload">
      <div className="cashflow-title-flex">
        <h3>quarter</h3>
        <h3>cashflow</h3>
        <h3>actuals</h3>
      </div>
      <ul className="scrollable">{quartersList}</ul>
      <div>
        <p>
          The cashflow JSON should reflect 7 years of financial data, actual and expected.
          Projections should be based in deep economic research, showcased in the uploaded business
          plan.
        </p>
        {downloadJSONSample()}
      </div>
      <div className="cashflow-submit">
        <input type="submit" value="SUBMIT" onClick={closeModalAndSendCashflowDataToPitchForm} />
      </div>
      <div
        className="blue-close-modal-button close-modal-button"
        onClick={closeModalAndSendCashflowDataToPitchForm}
      >
        &times;
      </div>
    </div>
  );
};

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
  1: {
    cashFlow: -30000,
    isActuals: true,
  },
  2: {
    cashFlow: -40018,
    isActuals: true,
  },
  3: {
    cashFlow: -16857,
    isActuals: true,
  },
  4: {
    cashFlow: -2915,
    isActuals: true,
  },
  5: {
    cashFlow: -20325,
    isActuals: true,
  },
  6: {
    cashFlow: 7864,
    isActuals: true,
  },
  7: {
    cashFlow: 25360,
    isActuals: true,
  },
  8: {
    cashFlow: 28107,
    isActuals: true,
  },
  9: {
    cashFlow: 28942,
    isActuals: false,
  },
  10: {
    cashFlow: 28696,
    isActuals: false,
  },
  11: {
    cashFlow: 29356,
    isActuals: false,
  },
  12: {
    cashFlow: 28854,
    isActuals: false,
  },
  13: {
    cashFlow: 28588,
    isActuals: false,
  },
  14: {
    cashFlow: 30781,
    isActuals: false,
  },
  15: {
    cashFlow: 29081,
    isActuals: false,
  },
  16: {
    cashFlow: 31887,
    isActuals: false,
  },
  17: {
    cashFlow: 51887,
    isActuals: false,
  },
  18: {
    cashFlow: 71887,
    isActuals: false,
  },
  19: {
    cashFlow: 30339,
    isActuals: false,
  },
  20: {
    cashFlow: 30718,
    isActuals: false,
  },
  21: {
    cashFlow: 31102,
    isActuals: false,
  },
  22: {
    cashFlow: 31491,
    isActuals: false,
  },
  23: {
    cashFlow: 31885,
    isActuals: false,
  },
  24: {
    cashFlow: 32283,
    isActuals: false,
  },
  25: {
    cashFlow: 32687,
    isActuals: false,
  },
  26: {
    cashFlow: 33096,
    isActuals: false,
  },
  27: {
    cashFlow: 33509,
    isActuals: false,
  },
  28: {
    cashFlow: 33928,
    isActuals: false,
  },
};

const sampleCurrentQuarter = 18;
