import React, { useState } from "react";
import { roundToTwo, getFileExtension } from "../../../../../util/function_util";
import DivWithCorners from "./withCorners";
import CashFlowModal from "./cashflow_modal/cashflow_modal";
import PDFModal from "./pdf_modal/pdf_modal";
import { sampleProject } from "./cashflow/sampleProjectJson";
// import { getFailedProjects } from '../../../../util/project_api_util';
import Finance from "financejs";
import {
  calculateCashflowData,
  formatProjectData,
  processCashData,
} from "../../../../../util/project_api_util";
import DropPinModal from "./drop_pin_modal/drop_pin_modal";
import { merge } from "lodash";
import "./project_form.scss";

const LocInput = ({ lat, lng, title, update2, updateLatLng }) => (
  <div className="form-box-container">
    <h1 className="form-box-title with-border">WHERE IS IT?</h1>
    <div className="form-box-border-layer">
      <div className="form-box-lat-long-section">
        <div className="lat-longitude-input-container">
          <TextInputWithUpdate input="latitude" placeholder="lat" value={lat} update2={update2} />
          <TextInputWithUpdate input="longitude" placeholder="long" value={lng} update2={update2} />
        </div>
        <DivWithCorners>
          <DropPinModal
            lat={parseFloat(lat)}
            lng={parseFloat(lng)}
            title={title}
            updateLatLng={updateLatLng}
          />
        </DivWithCorners>
      </div>
    </div>
  </div>
);

const TextInputWithUpdate = (props) => (
  <div className={`text-input-container ${props.input}-input-container`}>
    <input
      className={`text-input ${props.input}-input`}
      key={props.input}
      type="text"
      placeholder={props.placeholder}
      name={props.input}
      onChange={props.update2}
      value={props.value}
    />
  </div>
);

const CashFlowFileInput = (props) => (
  <div>
    <div className="file-input-container">
      <div className="file-input">
        <input type="file" onChange={props.updateFile("cashflowJSON")} />
        <CashFlowIcon />
      </div>
      <label htmlFor="json-file">{props.cashflowJSONName || "choose json"}</label>
    </div>
    <CurrentQuarterSelector update={props.update} currentQuarter={props.currentQuarter} />
  </div>
);

const CashFlowIcon = () => (
  <svg viewBox="2 2 17 17">
    <g>
      <defs>
        <rect id="SVGID_1_" x="-3.9" width="27.3" height="16.1" />
      </defs>
      <path
        className="st1"
        d="M13.9,7.3c0-0.2-0.1-0.3-0.3-0.3H8.3H6.6H5.4C5.2,7,5.1,7.1,5.1,7.3v7.5c0,0.2,0.1,0.3,0.3,0.3h8.7
            c0.2,0,0.3-0.1,0.3-0.3V9c0-0.2-0.1-0.3-0.3-0.3h-0.2V7.3z M9.4,11.4l-0.5,0.5c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.1-0.3,0-0.4
            l1.2-1.2l1.2,1.2c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.3,0.1-0.4,0L10,11.4v1.8c0,0.2-0.1,0.3-0.3,0.3s-0.3-0.1-0.3-0.3V11.4z
            M13.3,7.6v1.2H9.6L8.8,7.6H13.3z"
      />
    </g>
  </svg>
);

const CurrentQuarterSelector = (props) => (
  <div className="text-input-container current-quarter-input-container">
    <input
      className="current-quarter-input"
      type="number"
      name="currentQuarter"
      value={props.currentQuarter}
      onChange={(e) => props.update(e)}
    />
    <label htmlFor="current-quarter">current qtr</label>
  </div>
);

const FinancialInputs = (props) => {
  const { state, projectData } = props;

  return (
    <div className="form-box-container">
      <h1 className="form-box-title with-border">HOW MUCH MONEY WILL IT MAKE?</h1>
      <div className="form-box-border-layer">
        <div className="cashflows-section">
          <CashFlowFileInput
            currentQuarter={state.currentQuarter}
            update={props.update}
            updateFile={props.updateFile}
          />

          <DivWithCorners>
            <span className="text">
              <CashFlowModal
                quarter={state.currentQuarter ? state.currentQuarter : 9}
                cashflow={state.cashflow ? state.cashflow : sampleProject}
                updateCashflow={props.updateCashflow}
                receiveCashflowData={props.receiveCashflowData}
                updateActuals={props.updateActuals}
                updateCashflowValue={props.updateCashflowValue}
              />
            </span>
          </DivWithCorners>
        </div>

        <div className="rates-box">
          <div className="discounts-box">
            discount rate
            <div className="amount-box">{props.calculateDiscountFactor()}</div>
          </div>
          <div className="cap-row">
            <span>valuation</span>
            <div className="style2">
              {projectData.projected_cashflow
                ? "$" +
                  props.calculateNetPresentValue(
                    Object.values(projectData.projected_cashflow).slice(state.currentQuarter - 1),
                  )
                : "0"}
            </div>
            <div className="style2">
              {projectData.capital_required ? "$" + projectData.capital_required : "0"}
            </div>
            <span>
              capital
              <br />
              required
            </span>
          </div>
          <div className="coins">
            <div className="style2">10,000</div>
            coins to be issued
          </div>
        </div>
      </div>
    </div>
  );
};

const PlanIcon = () => (
  <svg viewBox="2 2 17 17">
    <g>
      <defs>
        <rect id="SVGID_1_" x="-3.9" width="27.3" height="16.1" />
      </defs>
      <path
        className="st1"
        d="M13.9,7.3c0-0.2-0.1-0.3-0.3-0.3H8.3H6.6H5.4C5.2,7,5.1,7.1,5.1,7.3v7.5c0,0.2,0.1,0.3,0.3,0.3h8.7
            c0.2,0,0.3-0.1,0.3-0.3V9c0-0.2-0.1-0.3-0.3-0.3h-0.2V7.3z M9.4,11.4l-0.5,0.5c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.1-0.3,0-0.4
            l1.2-1.2l1.2,1.2c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.3,0.1-0.4,0L10,11.4v1.8c0,0.2-0.1,0.3-0.3,0.3s-0.3-0.1-0.3-0.3V11.4z
            M13.3,7.6v1.2H9.6L8.8,7.6H13.3z"
      />
    </g>
  </svg>
);

const ModelIcon = () => (
  <svg className="project-form-button-icons" viewBox="-8 -8 160 160">
    <g>
      <g>
        <rect
          x="127.026"
          y="103.44"
          transform="matrix(0.8661 0.4999 -0.4999 0.8661 69.9909 -49.9074)"
          width="2.251"
          height="4.499"
        />
        <path d="M122.188,104.845l-3.863-2.23l2.25-3.896l3.863,2.23L122.188,104.845z M114.462,100.383l-3.863-2.23    l2.25-3.896l3.863,2.23L114.462,100.383z M106.734,95.921l-3.864-2.23l2.25-3.896l3.864,2.23L106.734,95.921z M99.007,91.459    l-3.863-2.23l2.25-3.896l3.863,2.23L99.007,91.459z M91.28,86.997l-3.864-2.23l2.25-3.896l3.864,2.23L91.28,86.997z     M83.552,82.535l-3.863-2.23l2.25-3.896l3.863,2.23L83.552,82.535z" />
        <polygon points="75.825,78.073 75.001,77.598 74.177,78.073 71.927,74.177 75.001,72.402 78.075,74.177   " />
        <path d="M27.812,104.843l-2.25-3.896l3.863-2.231l2.251,3.896L27.812,104.843z M35.539,100.381l-2.25-3.896    l3.864-2.23l2.25,3.896L35.539,100.381z M43.267,95.919l-2.25-3.896l3.863-2.23l2.25,3.896L43.267,95.919z M50.995,91.458    l-2.251-3.896l3.864-2.231l2.25,3.896L50.995,91.458z M58.722,86.996l-2.25-3.896l3.864-2.23l2.25,3.896L58.722,86.996z     M66.45,82.534l-2.25-3.896l3.863-2.23l2.25,3.896L66.45,82.534z" />
        <rect
          x="19.599"
          y="104.562"
          transform="matrix(0.5001 0.866 -0.866 0.5001 102.4474 33.9166)"
          width="4.499"
          height="2.251"
        />
      </g>
      <g>
        <rect x="72.751" y="72.75" width="4.5" height="2.25" />
        <path d="M77.251,68.288h-4.5v-4.462h4.5V68.288z M77.251,59.365h-4.5v-4.462h4.5V59.365z M77.251,50.442h-4.5    V45.98h4.5V50.442z M77.251,41.519h-4.5v-4.461h4.5V41.519z M77.251,32.596h-4.5v-4.462h4.5V32.596z M77.251,23.673h-4.5v-4.462    h4.5V23.673z" />
        <rect x="72.751" y="12.5" width="4.5" height="2.25" />
      </g>
      <g>
        <path d="M75.001,140.098l-56.377-32.549V42.451L75.001,9.902l56.375,32.551v65.098L75.001,140.098z     M23.124,104.951l51.877,29.951l51.875-29.949V45.051L75.001,15.098L23.124,45.049V104.951z" />
        <polygon points="75.001,77.598 19.749,45.698 21.999,41.802 75.001,72.402 128.001,41.804 130.251,45.7   " />
        <rect x="72.751" y="75" width="4.5" height="62.5" />
      </g>
    </g>
  </svg>
);

const PlanUpload = (props) => (
  <div className="flexed pdf-section">
    <div className="file-input-container">
      <div className="file-input">
        <input id="file" type="file" onChange={props.updateFile("planFilePDF")} />
        <PlanIcon />
      </div>
      <label htmlFor="file">{props.state.planFilePDFName || "choose pdf"}</label>
    </div>
    <DivWithCorners>
      <PDFModal planFilePDFDataURL={props.state.planFilePDFDataURL} />
    </DivWithCorners>
  </div>
);

const PlanInputs = (props) => {
  const { state, model_id, update, updateFile } = props;
  let modelLink;
  if (state.modelId === "") {
    modelLink = "https://poly.google.com";
  } else {
    modelLink = "https://poly.google.com/view/" + state.modelId;
  }

  return (
    <div className="form-box-container">
      <h1 className="form-box-title with-border">WHAT'S YOUR PLAN?</h1>
      <div className="form-box-border-layer">
        <PlanUpload state={state} updateFile={updateFile} />

        <div className="flexed model-id-section">
          <div className="text-input-container model-id-container">
            <input
              className="text-input model-id-input"
              placeholder="model id"
              name="model_id"
              value={model_id}
              onChange={(e) => update(e)}
            />
          </div>
          <DivWithCorners>
            <div className="project-form-button model-id">
              <a href={modelLink} target="_blank">
                <ModelIcon />
              </a>
            </div>
          </DivWithCorners>
        </div>
      </div>
    </div>
  );
};

const SummaryInput = (props) => (
  <div className="form-box-container">
    <div className="description-section">
      <h1 className="form-box-title">SUMMARY DESCRIPTION</h1>
      <textarea
        className="description-area"
        value={props.description}
        name="description"
        onChange={(e) => props.update(e)}
      />
      <input className="submit-button" type="submit" value="Pitch" />
      {props.renderErrors()}
    </div>
  </div>
);

const ProjectForm = (props) => {
  const [state, setState] = useState({
    icon: "",
    imageUrl: "",
    coins: "****",
    status: "pitched",
    openModal: false,
    currentQuarter: "",
    cashflowJSONName: "",
    accumulatedRevenue: "",
    capital_required: "",
    planFilePDFDataURL: "",
    planFilePDFName: "",
    drop_pin_clicked: false,
    modelId: "",
  });

  const [projectData, setProjectData] = useState({
    title: "",
    latitude: "",
    longitude: "",
    city: "New York",
    country: "USA",
    continent: "North America",
    valuation: "1",
    cashflow: "",
    model_id: "870fb9d9-b5d2-4565-a6dd-65f9a1f4d00e",
    summary: "summary",
    capital_required: "",
    actual_cashflow: "",
    accum_projected_cashflow: "",
    accum_actual_cashflow: "",
    projected_cashflow: "",
    revenue: 0.1,
    description: "hkopt",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let {
      title,
      latitude,
      longitude,
      summary,
      description,
      city,
      country,
      continent,
      capital_required,
      valuation,
      creator_id,
    } = projectData;

    const params = {
      title,
      city,
      country,
      continent,
      summary,
      description,
      capital_required,
      latitude,
      longitude,
      valuation,
      busLink: "https://drive.google.com/open?id=1zxY4cZcdaAMpinQpdZmTb8Zy2i9dh2iZ",
      cashflow: JSON.stringify(projectData.cashflow),
      actual_cashflow: JSON.stringify(projectData.actual_cashflow),
      projected_cashflow: JSON.stringify(projectData.projected_cashflow),
      accum_projected_cashflow: JSON.stringify(projectData.accum_projected_cashflow),
      accum_actual_cashflow: JSON.stringify(projectData.accum_actual_cashflow),
    };

    props.pitchProjectForDemo(params);
    props.updateTransactionModal({
      isOpen: true,
      title: "YOUR TRANSACTION HAS BEEN SENT",
      message: "It may take a few minutes for your transaction to be processed by the blockchain.",
    });
  };

  // shouldComponentUpdate(nextProps, nextState){
  //  return nextState === this.nextState?  true : false
  // }

  const renderLatLngErrors = (clicked) => {
    if (projectData.latitude == "" && projectData.longitude == "" && clicked) {
      return (
        <ul className="project-errors">
          <li>Latitude and Longitude can't be blank</li>
        </ul>
      );
    }
  };

  const updateLatLng = (pos) => {
    const newProjectData = merge({}, projectData, {
      latitude: parseFloat(pos.lat),
      longitude: parseFloat(pos.lng),
    });
    setProjectData(newProjectData);
  };

  const storeAddress = (city, continent) => {
    const newProjectData = merge({}, projectData, { city, continent });
    setProjectData(projectData);
  };

  const getFailedProjects = () => {
    let failedProjectCount = 0;
    Object.values(props.projects).map((project) => {
      if (project.close_date < new Date().toISOString()) {
        failedProjectCount += 1;
      }
    });
    return failedProjectCount;
  };

  const findCurrentQuarter = (quarters, cashflow = projectData.cashflow) => {
    let currentQuarter;
    quarters.some((quarter) => {
      if (!cashflow[quarter.toString()]["isActuals"]) {
        currentQuarter = quarter;
        return !cashflow[quarter.toString()]["isActuals"];
      }
    });

    return currentQuarter;
  };

  const calculateTotalCapitalDeployed = () => {
    let capital = 0;

    Object.values(props.projects).forEach((project) => {
      if (project.cashflow) {
        let jsonProjectCashflow = processCashData(project.cashflow);
        if (jsonProjectCashflow["1"]) {
          let quarters = Object.keys(jsonProjectCashflow).sort();
          let currentQuarter = findCurrentQuarter(quarters, jsonProjectCashflow);
          let valuesForActualQuarters = Object.values(jsonProjectCashflow).slice(
            0,
            currentQuarter + 1,
          );
          capital += valuesForActualQuarters.reduce((acc, el) => {
            return acc + el["cashFlow"];
          }, 0);
        }
      }
    });
    return capital;
  };

  const calculateCapitalRequired = (accumulatedRevenue) => {
    console.log(accumulatedRevenue);
    let valuesArray = Object.values(accumulatedRevenue);
    let min = Math.min(...valuesArray);
    return min * -1;
  };

  const calculateDiscountFactor = () => {
    let capitalDeployed = calculateTotalCapitalDeployed();
    let discountFactor = 0.5 - (capitalDeployed / 190000.0 + getFailedProjects() * 0.06);
    if (discountFactor > 0.1) {
      return discountFactor;
    } else {
      return 0.1;
    }
  };

  const calculateNetPresentValue = (projectCashflows) => {
    let discountFactor = calculateDiscountFactor();
    let finance = new Finance();
    let netPresentValue = finance.NPV(discountFactor, 0, ...projectCashflows);
    return netPresentValue;
  };

  const receiveCashflowData = (cashflowVars) => {
    return calculateCashflowData(cashflowVars);
  };

  const updateCashflow = (cashflow) => {
    // Needed to update project state with cashflow state
    // should be combined with update
    return (e) => {
      e.preventDefault();
      const newProjectData = merge({}, projectData, { cashflow });
      setProjectData(newProjectData);
    };
  };

  const updateCashflowValue = (quarter, cashflow) => {
    return (e) => {
      e.preventDefault();
      let cashflows = merge({}, projectData.cashflow);
      let c = cashflows[quarter];

      c === undefined
        ? (cashflows[quarter] = {
            cashflow: cashflow.cashFlow,
            isActuals: cashflow.isActuals,
          })
        : void 0;

      cashflows[quarter].cashFlow = parseInt(e.currentTarget.value);
      // const accumulatedRevenue = calculateAccumulatedRevenue(cashflows);
      const newProjectData = merge({}, projectData, { cashflow: cashflows });
      setProjectData(newProjectData);
    };
  };

  const updateActuals = (quarter, cashflow) => {
    let cashflows = merge({}, projectData.cashflow);

    let c = cashflows[quarter];

    c === undefined
      ? (cashflows[quarter] = {
          cashflow: cashflow.cashFlow,
          isActuals: cashflow.isActuals,
        })
      : void 0;

    cashflows[quarter].isActuals = !cashflows[quarter].isActuals;
    const newProjectData = merge({}, projectData, { cashflow: cashflows });
    console.log("i have second entried", cashflows[quarter]);
    setProjectData(newProjectData);
  };

  const updateFile = (fileType) => {
    // TODO Update to handle other file types eventually. (now only handles JSON and PDF )
    return (e) => {
      let file = e.currentTarget.files[0];

      switch (fileType) {
        case "cashflowJSON":
          parseInputFile(file).then((cashflowData) => {
            let cashflow = processCashData(cashflowData);
            let quarters = Object.keys(cashflow)
              .map(Number)
              .sort((a, b) => a - b);

            const {
              projected_cashflow,
              actual_cashflow,
              accum_actual_cashflow,
              accum_projected_cashflow,
              accumulated_revenue,
            } = formatProjectData(cashflow);

            const currentQuarter = findCurrentQuarter(quarters, cashflow);
            const capital_required = calculateCapitalRequired(accumulated_revenue);
            const valuation = calculateNetPresentValue(
              Object.values(projected_cashflow).slice(currentQuarter - 1),
            );
            const newProjectData = merge({}, state, {
              cashflow,
              projected_cashflow,
              actual_cashflow,
              accum_actual_cashflow,
              accum_projected_cashflow,
              capital_required,
              valuation,
            });

            setState(newProjectData);

            setProjectData(
              merge({}, projectData, {
                cashflowJSONName: file.name,
                currentQuarter,
              }),
            );
          });
          break;
        case "planFilePDF":
          parseInputFile(file).then((planFilePDFDataURL) => {
            setState(
              merge({}, state, { pdf_file: file, planFilePDFDataURL, planFilePDFName: file.name }),
            );
          });
          break;
        default:
          break;
      }
    };
  };

  const parseInputFile = (file) => {
    if (file && file instanceof File) {
      let promise = new Promise(function (resolve, reject) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        switch (getFileExtension(file.name)) {
          case "json":
            fileReader.readAsText(file);
            break;
          case "pdf":
            fileReader.readAsDataURL(file);
            break;
          default:
            break;
        }

        fileReader.onerror = () => {
          fileReader.abort();
          reject(new DOMException("Problem parsing input file."));
        };
      });

      return promise;
    }
  };

  const renderErrors = () => {
    if (props.errors) {
      return (
        <ul className="project-errors">
          {props.errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      );
    }
  };

  const update = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    if (state.hasOwnProperty(property)) {
      setState(merge({}, state, { [property]: value }));
    } else {
      setProjectData(merge({}, projectData, { [property]: value }));
    }
  };

  let { title, latitude, longitude, model_id, currentQuarter, description } = projectData;

  // const updateFunction = update

  const update2 = (e) => {
    setProjectData(merge({}, projectData, { [e.target.name]: e.target.value }));
  };

  return (
    <form className="form-box p-form-box" onSubmit={handleSubmit}>
      <TextInputWithUpdate
        input="title"
        placeholder="WHAT'S IT'S NAME"
        value={projectData.title}
        update2={update2}
      />
      <LocInput
        lat={projectData.latitude}
        lng={projectData.longitude}
        title={projectData.title}
        update2={update2}
        updateLatLng={updateLatLng}
      />
      {renderLatLngErrors(state.drop_pin_clicked)}
      <FinancialInputs
        state
        projectData
        calculateDiscountFactor={calculateDiscountFactor}
        calculateNetPresentValue={calculateNetPresentValue}
        updateCashflow={updateCashflow}
        updateActuals={updateActuals}
        updateCashflowValue={updateCashflowValue}
        receiveCashflowData={receiveCashflowData}
        updateFile={updateFile}
        update={update}
      />
      <PlanInputs state model_id={projectData.model_id} update={update} updateFile={updateFile} />
      <SummaryInput
        description={projectData.description}
        renderErrors={renderErrors}
        update={update}
      />

      <div className="blue-close-modal-button close-modal-button" onClick={props.closeModal}>
        &times;
      </div>
    </form>
  );
};

export default ProjectForm;

//
// const TextHOC = (updateFunction) => {
//   return (props) => {
//       return (
//         <div className={`text-input-container ${props.input}-input-container`}>
//           <input className={`text-input ${props.input}-input`}
//             key={props.input}
//             type="text"
//             placeholder={props.placeholder}
//             value={props.title}
//             onChange={(e) => updateFunction(props.input, e.currentTarget.value)}
//             />
//         </div>
//       )
//   }
// }
//
