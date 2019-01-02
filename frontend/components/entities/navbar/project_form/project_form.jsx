import React from 'react';
import { totalData } from '../../../../util/token_data_util';
import { roundToTwo, getFileExtension } from '../../../../util/function_util';
import DivWithCorners from './withCorners';
import CashFlowModal from './cashflow_modal/cashflow_modal';
import PDFModal from './pdf_modal/pdf_modal';
// import { getFailedProjects } from '../../../../util/project_api_util';
import Finance from 'financejs';
import { formatProjectData, processCashData } from '../../../../util/project_api_util';
import DropPinModal from './drop_pin_modal/drop_pin_modal';
import { merge } from 'lodash';
import PolyModal from './poly_modal/poly_modal';
import './project_modal.scss';
import './geoContainer.scss';
import './projectPitchMod.scss';

class ProjectForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projectData: {
        title: '',
        latitude: '',
        longitude: '',
        city: 'New York',
        country: 'USA',
        continent: 'North America',
        valuation: '1',
        cashflow: '',
        creator_id: this.props.currentUser.id,
        model_id: '870fb9d9-b5d2-4565-a6dd-65f9a1f4d00e',
        summary: 'summary',
        capital_required: '',
        actual_cashflow: '',
        accum_projected_cashflow: '',
        accum_actual_cashflow: '',
        projected_cashflow: '',
        revenue: .1,
        description: 'hkopt'
      },
      icon: '',
      imageUrl: '',
      coins: '****',
      status: 'pitched',
      openModal: false,
      currentQuarter: '',
      cashflowJSONName: '',
      accumulatedRevenue: '',
      planFilePDF: '',
      planFilePDFDataURL: '',
      planFilePDFName: '',
      drop_pin_clicked: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.updateCashflow = this.updateCashflow.bind(this);
    this.calculateDiscountFactor = this.calculateDiscountFactor.bind(this);
    this.getFailedProjects = this.getFailedProjects.bind(this);
    this.findCurrentQuarter = this.findCurrentQuarter.bind(this);
    this.calculateTotalCapitalDeployed = this.calculateTotalCapitalDeployed.bind(this);
    this.calculateNetPresentValue = this.calculateNetPresentValue.bind(this);
    this.receiveCashflowData = this.receiveCashflowData.bind(this);
    // this.parseCashflowData = this.parseCashflowData.bind(this);
    this.renderLatLngErrors = this.renderLatLngErrors.bind(this);
    this.dropPinClick = this.dropPinClick.bind(this);
    this.updateLatLng = this.updateLatLng.bind(this);
    // this.parseCashflowData = this.parseCashflowData.bind(this);
    this.renderLatLngErrors = this.renderLatLngErrors.bind(this);
    this.dropPinClick = this.dropPinClick.bind(this);
    this.updateLatLng = this.updateLatLng.bind(this);
    this.storeAddress = this.storeAddress.bind(this);
    this.calculateCapitalRequired = this.calculateCapitalRequired.bind(this);
    this.parseInputFile = this.parseInputFile.bind(this);
    this.updateCashflowValue = this.updateCashflowValue.bind(this);
    this.updateActuals = this.updateActuals.bind(this);
  }

  componentDidMount() {
    // this.renderFileName();
  }

  componentWillUnmount() {
    this.props.clearProjectErrors();
  }

  handleSubmit(e) {
    e.preventDefault();

    // const file = this.state.imageFile;
    // const data = new FormData();
    //
    // // const projectData = merge({}, this.state);
    //
    //
    // if (file) data.append("project[file]", file);
    // data.append("project[title]", this.state.projectData.title);
    // data.append("project[description]", this.state.projectData.description);
    //
    // data.append("project[latitude]", this.state.projectData.latitude);
    // data.append("project[longitude]", this.state.projectData.longitude);
    //
    // data.append("project[city]", this.state.projectData.city);
    // data.append("project[country]", this.state.projectData.country);
    // data.append("project[continent]", this.state.projectData.continent);
    //
    // data.append("project[valuation]", this.state.projectData.valuation);
    // data.append("project[cashflow]", this.state.projectData.cashflow);
    // data.append("project[creator_id]", this.state.projectData.creator_id);
    //
    // data.append("project[model_id]", this.state.projectData.model_id);
    // data.append("project[summary]", this.state.projectData.summary);
    // data.append("project[capital_required]", this.state.projectData.capital_required);
    // data.append("project[cashflow]", JSON.stringify(this.state.projectData.cashflow));
    // data.append("project[actual_cashflow]", JSON.stringify(this.state.projectData.actual_cashflow));
    // data.append("project[accum_projected_cashflow]", JSON.stringify(this.state.projectData.accum_projected_cashflow));
    // data.append("project[accum_actual_cashflow]", JSON.stringify(this.state.projectData.accum_actual_cashflow));
    // data.append("project[projected_cashflow]", JSON.stringify(this.state.projectData.projected_cashflow));
    // data.append("project[revenue]", this.state.projectData.revenue);
    // data.append("project[pdf_file]", this.state.planFilePDF);
    //FormData objects append JavaScript objects as the string, "[object, Object]", therefore
    //all data is lost when sent to the backend. Recommend JSON.stringigying object, and retreiving
    //Object in frontend with JSON.parse

    // formData.append("project[icon]", this.state.icon);
    // formData.append("project[description]", this.state.description);
    // formData.append("project[status]", this.state.status);

    // Moved until data is properly structured
    // this.props.createProject(projectData);


    // pdf_file: this.state.planFilePDF,
    const projectData = Object.assign(
      {},
      this.state.projectData,
      {
        cashflow: JSON.stringify(this.state.projectData.cashflow),
        actual_cashflow: JSON.stringify(this.state.projectData.actual_cashflow),
        projected_cashflow: JSON.stringify(this.state.projectData.projected_cashflow),
        accum_projected_cashflow: JSON.stringify(this.state.projectData.accum_projected_cashflow),
        accum_actual_cashflow: JSON.stringify(this.state.projectData.accum_actual_cashflow)
     });

    this.props.createProject(this.props.crowdsaleInstance, projectData, this.props.account).then(() => {
      if (this.props.errors.length == 0) {
        this.props.closeModal();
        // window.location.reload();
      }
    });
  }

  dropPinClick() {
    this.setState({drop_pin_clicked: true});
  }

  renderLatLngErrors(clicked) {
    if (this.state.projectData.latitude == '' && this.state.projectData.longitude == '' && clicked) {
      return (
        <ul className="project-errors">
          <li>Latitude and Longitude can't be blank</li>
        </ul>
      );
    }
  }

  updateLatLng(pos) {
    const projectData = merge({}, this.state.projectData, {latitude: parseFloat(pos.lat), longitude: parseFloat(pos.lng)});
    this.setState(projectData);
  }

  storeAddress(city, continent) {
    const projectData = merge({}, this.state.projectData, {city, continent});
    this.setState(projectData);
  }

  getFailedProjects(){
    let failedProjectCount = 0;
    // currentDate = new Date
    Object.values(this.props.projects).map((project) => {
      if (project.close_date < new Date().toISOString()){
        failedProjectCount += 1;
      }
    });
    // console.log("Failed Project count is ", failedProjectCount);
    return failedProjectCount;
  }

  findCurrentQuarter(quarters, cashflow = this.state.projectData.cashflow) {
    let currentQuarter;
    quarters.some(quarter => {
      if (!cashflow[quarter.toString()]["isActuals"]) {
        currentQuarter = quarter;
        return !cashflow[quarter.toString()]["isActuals"];
      }
    });

    return currentQuarter;
  }

  calculateTotalCapitalDeployed(){
    let capital = 0;
    Object.values(this.props.projects).forEach((project) => {
      if(project.cashflow){
        let jsonProjectCashflow = processCashData(project.cashflow);
        if (jsonProjectCashflow["1"]) {
          let quarters = Object.keys(jsonProjectCashflow).sort();
          let currentQuarter = this.findCurrentQuarter(quarters, jsonProjectCashflow);
          let valuesForActualQuarters = Object.values(jsonProjectCashflow).slice(0, currentQuarter + 1);
          capital += valuesForActualQuarters.reduce((acc, el) => {
            return acc + el["cashFlow"];}, 0);
        }
      }
    });
    return capital;
  }

  calculateCapitalRequired(accumulatedRevenue) {
    console.log(accumulatedRevenue);
    let valuesArray = Object.values(accumulatedRevenue);
    let min = Math.min(...valuesArray);
    return min * -1;
    // this.setState({capital_required: min});
  }

  calculateDiscountFactor(){
    // console.log("Failed Projects are: ", this.getFailedProjects());
    let capitalDeployed = this.calculateTotalCapitalDeployed();
    let discountFactor = (.50 - ((capitalDeployed/190000.0) + (this.getFailedProjects() * 0.06)));
    if (discountFactor > .10) {
      return discountFactor;
    } else {
      return .10;
    }
  }

  calculateNetPresentValue(projectCashflows){
    let discountFactor = this.calculateDiscountFactor();
    // let cashflows = Object.values(processCashData(projectCashflows)).map(el => el["cashFlow"]);
    let finance = new Finance();
    let netPresentValue = finance.NPV(discountFactor, 0, ...projectCashflows);
    return netPresentValue;
  }

  // calculateValuation(){
  //
  // }


  receiveCashflowData(cashflowVars){
    return calculateCashflowData(cashflowVars)
  }

  update(property) {
    return (e) => {
      if (this.state.hasOwnProperty(property)) {
        this.setState({ [property]: e.currentTarget.value });
      } else {
        const projectData = merge({}, this.state.projectData, { [property]: e.currentTarget.value });
        this.setState({projectData});
      }
    };
  }

  updateCashflow(cashflow) {
    // Needed to update project state with cashflow state
    return e => {
      e.preventDefault();
      this.setState({ projectData: cashflow });
    };
  }

  updateCashflowValue(quarter) {
    // console.log("Type of quarter is: ", typeof quarter);
    console.log("Is the cashflow value being updated?");
    return e => {
      e.preventDefault();
      let cashflow = merge({}, this.state.projectData.cashflow);
      cashflow[quarter].cashFlow = parseInt(e.currentTarget.value);
      const accumulatedRevenue = calculateAccumulatedRevenue(cashflow);
      const projectData = merge({}, this.state.projectData, { cashflow });
      this.setState({
        projectData,
        accumulatedRevenue
      });
    };
  }

  updateActuals(quarter) {
      console.log('i have second entried');
      let cashflow = merge({}, this.state.projectData.cashflow);
      cashflow[quarter].isActuals = !cashflow[quarter].isActuals;
      const projectData = merge({}, this.state.projectData, { cashflow });
      this.setState({ projectData });
  }

  updateFile(fileType) {
    // Update to handle other file types eventually. (now handles JSON and PDF)
    // this.parseCashflowData();
    // console.log('Cashflow state is', this.state.cashflow);
    return e => {
      let file = e.currentTarget.files[0];

      switch (fileType) {
        case "cashflowJSON":
          this.parseInputFile(file).then(cashflowData => {
            let cashflow = processCashData(cashflowData);
            // cashflow = this.setupCashflow(cashflow, currentQuarter)
            let quarters = Object.keys(cashflow).map(Number).sort((a, b) => a - b);
            // console.log('quarters is:', quarters);
            // console.log('Cashflow is:', cashflow);

            // const data = formatProjectData(cashflow);
            // const currentQuarter = this.findCurrentQuarter(quarters, cashflow);
            // const capital_required = this.calculateCapitalRequired(data.accumulated_revenue);
            // const valuation = this.calculateNetPresentValue(Object.values(data.projected_cashflow).slice(currentQuarter - 1));
            //
            // const newProjectData = merge({}, data, { cashflow, capital_required, valuation });
            // const projectData = merge({}, this.state.projectData, newProjectData);


            const {
              projected_cashflow,
              actual_cashflow,
              accum_actual_cashflow,
              accum_projected_cashflow,
              accumulated_revenue
            } = formatProjectData(cashflow);

            const currentQuarter = this.findCurrentQuarter(quarters, cashflow);
            const capital_required = this.calculateCapitalRequired(accumulated_revenue);
            const valuation = this.calculateNetPresentValue(Object.values(projected_cashflow).slice(currentQuarter - 1));
            const projectData = merge({}, this.state.projectData,
              {
                cashflow,
                projected_cashflow,
                actual_cashflow,
                accum_actual_cashflow,
                accum_projected_cashflow,
                capital_required,
                valuation
            });

            this.setState(merge({},
              {
                projectData,
                cashflowJSONName: file.name,
                currentQuarter
              }
            ));
          });
          break;
        case "planFilePDF":
          this.parseInputFile(file).then(planFilePDFDataURL => {
            this.setState({
              planFilePDF: file,
              planFilePDFDataURL,
              planFilePDFName: file.name
            });
          });
          break;
        default:
          break;
      }
    };
  }

  parseInputFile(file) {
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
  }

  renderErrors() {
    if (this.props.errors) {
      return (
        <ul className="project-errors">
          {this.props.errors.map((error, idx) => (
            <li key={idx}>
              {error}
            </li>
          ))}
        </ul>
      );
    }
  }

  // renderFileName() {
  //   const inputs = document.querySelectorAll( '.file-input' );
  //   Array.prototype.forEach.call( inputs, function( input ) {
  //     const label	 = input.nextElementSibling;
  //     const labelVal = label.innerHTML;
  //
  //     input.addEventListener('change', function(e) {
  //       let fileName = e.target.value.split( '\\' ).pop();
  //       // let fileName = '';
  //       // if (this.files && this.files.length > 1 ) {
  //       //   fileName = ( this.getAttribute('data-multiple-caption' ) || '')
  //       //                 .replace('{count}', this.files.length);
  //       // } else {
  //       //   fileName = e.target.value.split( '\\' ).pop();
  //       // }
  //
  //       if (fileName) {
  //         label.querySelector('span').innerHTML = fileName;
  //       } else {
  //         label.innerHTML = labelVal;
  //       }
  //     });
  //   });
  // }

  render() {
    let modelLink;
    if (this.state.modelId === "") {
      modelLink = "https://poly.google.com"
    } else {
      modelLink = "https://poly.google.com/view/" + this.state.modelId
    }

    const geojsons = [];
    const fileId = ["file1", "file2", "file3", "file4", "file5"];
    for (let i = 0; i < 5; i++) {
      geojsons.push(
        <div className="geo-row-container" key={i}>
          <div className="file-container">
            <input id={fileId[i]}
              name={fileId[i]}
              className="file-input"
              type="file" />
            <label htmlFor={fileId[i]}>
              <span>choose geojson</span>
            </label>
          </div>
          <select className="heir-input">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <input className="opacity-input"
            type="number"
            min="0"
            max="1"
            placeholder="0.5" />
        </div>
      );
    }

    let { title, latitude, longitude, model_id
      // revenue, valuation, description, model_id, city, country, continent, icon
    } = this.state.projectData;

    let { currentQuarter } = this.state;

    return (
      <form className="form-box p-form-box" onSubmit={this.handleSubmit}>
        <div className="text-input-container project-title-input-container">
          <input className="text-input project-title-input"
            type="text"
            placeholder="project name"
            value={title}
            onChange={this.update('title')} />
        </div>

        <div className="flexed">
          <div className="text-input-container lat-input-container">
            <input className="text-input lat-input"
              type="number"
              step="any"
              placeholder="lat"
              value={latitude}
              onChange={this.update('latitude')} />
          </div>
          <div className="text-input-container long-input-container">
            <input className="text-input long-input"
              type="number"
              step="any"
              placeholder="long"
              value={longitude}
              onChange={this.update('longitude')} />
          </div>
          <DivWithCorners>
              <DropPinModal
                lat={parseFloat(this.state.latitude)}
                lng={parseFloat(this.state.longitude)}
                title={this.state.title}
                updateLatLng={this.updateLatLng}
                dropPinClick={this.dropPinClick}
                storeAddress={this.storeAddress}
                city={this.state.city}
                continent={this.state.continent}
                />
          </DivWithCorners>
        </div>
        {this.renderLatLngErrors(this.state.drop_pin_clicked)}
        <div className="flexed cashflows-section">
          <div>
            <div className="file-input-container">
              <div className="file-input">
                <input
                  type="file"
                  onChange={this.updateFile('cashflowJSON')} />
                  <svg viewBox="2 2 17 17">
                    <g>
                      <defs>
                        <rect id="SVGID_1_" x="-3.9" width="27.3" height="16.1"/>
                      </defs>
                      <path className="st1" d="M13.9,7.3c0-0.2-0.1-0.3-0.3-0.3H8.3H6.6H5.4C5.2,7,5.1,7.1,5.1,7.3v7.5c0,0.2,0.1,0.3,0.3,0.3h8.7
                        c0.2,0,0.3-0.1,0.3-0.3V9c0-0.2-0.1-0.3-0.3-0.3h-0.2V7.3z M9.4,11.4l-0.5,0.5c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.1-0.3,0-0.4
                        l1.2-1.2l1.2,1.2c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.3,0.1-0.4,0L10,11.4v1.8c0,0.2-0.1,0.3-0.3,0.3s-0.3-0.1-0.3-0.3V11.4z
                        M13.3,7.6v1.2H9.6L8.8,7.6H13.3z"/>
                    </g>
                  </svg>
              </div>
                <label htmlFor="json-file">{this.state.cashflowJSONName || "choose json"}</label>
            </div>

            <div className="text-input-container current-quarter-input-container">
              <input className="current-quarter-input"
                type="number"
                value={currentQuarter}
                onChange={this.update('currentQuarter')} />
              <label htmlFor="current-quarter"> current qtr</label>
            </div>
          </div>

          <DivWithCorners>
            <span className="text">
              <CashFlowModal quarter={this.state.currentQuarter ? this.state.currentQuarter : 9}
                cashflow={this.state.cashflow ? this.state.cashflow : sampleProject}
                updateCashflow={this.updateCashflow}
                receiveCashflowData={this.receiveCashflowData}
                updateActuals={this.updateActuals}
                updateCashflowValue={this.updateCashflowValue}
                />
            </span>
          </DivWithCorners>
        </div>

        <div className="rates-box">
          <div className="discounts-box">
            discount rate
            <div className="amount-box">
              {this.calculateDiscountFactor()}
            </div>
          </div>

          <div className="cap-row">
            <span>valuation</span>

            <div className="style2">{"$" + this.state.projectData.valuation}</div>
            <div className="style2">{"$" + this.state.projectData.capital_required}</div>
            <span>capital <br />  required</span>
          </div>

          <div className="coins">
            <div className="style2">
              10,000
            </div>
            coins to be issued
          </div>

        </div>

        <div className="flexed pdf-section">
          <div className="file-input-container">
            <div className="file-input">
              <input
                id="file"
                type="file"
                onChange={this.updateFile('planFilePDF')} />
                <svg viewBox="2 2 17 17">
                  <g>
                    <defs>
                      <rect id="SVGID_1_" x="-3.9" width="27.3" height="16.1"/>
                    </defs>
                    <path className="st1" d="M13.9,7.3c0-0.2-0.1-0.3-0.3-0.3H8.3H6.6H5.4C5.2,7,5.1,7.1,5.1,7.3v7.5c0,0.2,0.1,0.3,0.3,0.3h8.7
                      c0.2,0,0.3-0.1,0.3-0.3V9c0-0.2-0.1-0.3-0.3-0.3h-0.2V7.3z M9.4,11.4l-0.5,0.5c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.1-0.3,0-0.4
                      l1.2-1.2l1.2,1.2c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.3,0.1-0.4,0L10,11.4v1.8c0,0.2-0.1,0.3-0.3,0.3s-0.3-0.1-0.3-0.3V11.4z
                      M13.3,7.6v1.2H9.6L8.8,7.6H13.3z"/>
                  </g>
                </svg>
            </div>
            <label htmlFor="file">{this.state.planFilePDFName || "choose pdf"}</label>
          </div>

          <DivWithCorners>
              <PDFModal planFilePDFDataURL={this.state.planFilePDFDataURL}/>
          </DivWithCorners>
        </div>
        <div className="flexed model-id-section">
          <div className="text-input-container model-id-container">
            <input className="text-input model-id-input"
              placeholder="model id"
              value={model_id}
              onChange={this.update('model_id')} />
          </div>

          <DivWithCorners>
            <div className="project-form-button model-id">
              <a href={modelLink} target="_blank">
                <svg className="project-form-button-icons" viewBox="-8 -8 160 160"><g><g><rect x="127.026" y="103.44" transform="matrix(0.8661 0.4999 -0.4999 0.8661 69.9909 -49.9074)" width="2.251" height="4.499" /><path d="M122.188,104.845l-3.863-2.23l2.25-3.896l3.863,2.23L122.188,104.845z M114.462,100.383l-3.863-2.23    l2.25-3.896l3.863,2.23L114.462,100.383z M106.734,95.921l-3.864-2.23l2.25-3.896l3.864,2.23L106.734,95.921z M99.007,91.459    l-3.863-2.23l2.25-3.896l3.863,2.23L99.007,91.459z M91.28,86.997l-3.864-2.23l2.25-3.896l3.864,2.23L91.28,86.997z     M83.552,82.535l-3.863-2.23l2.25-3.896l3.863,2.23L83.552,82.535z" /><polygon points="75.825,78.073 75.001,77.598 74.177,78.073 71.927,74.177 75.001,72.402 78.075,74.177   " /><path d="M27.812,104.843l-2.25-3.896l3.863-2.231l2.251,3.896L27.812,104.843z M35.539,100.381l-2.25-3.896    l3.864-2.23l2.25,3.896L35.539,100.381z M43.267,95.919l-2.25-3.896l3.863-2.23l2.25,3.896L43.267,95.919z M50.995,91.458    l-2.251-3.896l3.864-2.231l2.25,3.896L50.995,91.458z M58.722,86.996l-2.25-3.896l3.864-2.23l2.25,3.896L58.722,86.996z     M66.45,82.534l-2.25-3.896l3.863-2.23l2.25,3.896L66.45,82.534z" /><rect x="19.599" y="104.562" transform="matrix(0.5001 0.866 -0.866 0.5001 102.4474 33.9166)" width="4.499" height="2.251" /></g><g><rect x="72.751" y="72.75" width="4.5" height="2.25" /><path d="M77.251,68.288h-4.5v-4.462h4.5V68.288z M77.251,59.365h-4.5v-4.462h4.5V59.365z M77.251,50.442h-4.5    V45.98h4.5V50.442z M77.251,41.519h-4.5v-4.461h4.5V41.519z M77.251,32.596h-4.5v-4.462h4.5V32.596z M77.251,23.673h-4.5v-4.462    h4.5V23.673z" /><rect x="72.751" y="12.5" width="4.5" height="2.25" /></g><g><path d="M75.001,140.098l-56.377-32.549V42.451L75.001,9.902l56.375,32.551v65.098L75.001,140.098z     M23.124,104.951l51.877,29.951l51.875-29.949V45.051L75.001,15.098L23.124,45.049V104.951z" /><polygon points="75.001,77.598 19.749,45.698 21.999,41.802 75.001,72.402 128.001,41.804 130.251,45.7   " /><rect x="72.751" y="75" width="4.5" height="62.5" /></g></g></svg>
              </a>
            </div>
          </DivWithCorners>
        </div>

        <textarea className="description-area" value="description" onChange={this.update('description')} />
        <input type="submit" value="Pitch"/>
        {this.renderErrors()}
        <div className="blue-close-modal-button close-modal-button"
          onClick={this.props.closeModal}>&times;</div>

      </form>
    );
  }
}

export default ProjectForm;

// <select className="text-input continent-input"
//   value={continent}
//   onChange={this.update('continent')}>
//     <option value="" disabled>Continent</option>
//     <option value="North America">North America</option>
//     <option value="South America">South America</option>
//     <option value="Europe">Europe</option>
//     <option value="Africa">Africa</option>
//     <option value="Asia">Asia</option>
//     <option value="Australia">Australia</option>
// </select>
// <input className="text-input city-input"
//   type="text"
//   placeholder="#| city"
//   value={city}
//   onChange={this.update('city')} />
// <input className="text-input lat-input"
//   type="number"
//   step="any"
//   placeholder="#| latitude"
//   value={latitude}
//   onChange={this.update('latitude')} />
// <input className="text-input long-input"
//   type="number"
//   step="any"
//   placeholder="#| longitude"
//   value={longitude}
//   onChange={this.update('longitude')} />
// <input className="text-input revenue-input"
//   type="number"
//   placeholder="#| revenue"
//   value={revenue}
//   onChange={this.update('revenue')} />
// <div className="valuation-container">
//   <input className="valuation-input"
//     type="number"
//     placeholder="#| valuation"
//     value={valuation}
//     onChange={this.update('valuation')} />
//   <div className="coin-count">{this.state.coins}</div>
//   <div className="coin-text">coins to be issued</div>
// </div>
//
// <hr className="project-divider" />
//
// <div className="geo-container">
//   <header className="geo-row-container">
//     <h5>spatial overlays</h5>
//     <h5>hierarchy</h5>
//     <h5>opacity</h5>
//   </header>
//   {geojsons}
// </div>
//
// <hr className="project-divider" />
//
// <div className="fin-plan-container">
//   <div className="file-container">
//     <input id="fin-file"
//       name="fin-file"
//       className="file-input"
//       type="file" />
//     <label htmlFor="fin-file">
//       <span>choose csv</span>
//     </label>
//   </div>
//   <h5>financials</h5>
//   <div className="file-container">
//     <input id="plan-file"
//       name="plan-file"
//       className="file-input"
//       type="file"
//       multiple
//       onChange={this.updateFile} />
//     <label htmlFor="plan-file">
//       <span>choose a pdf</span>
//     </label>
//   </div>
//   <h5>plan</h5>
// </div>
//
// <div className="link-upload-cont">
//   <input type="text"
//     placeholder="paste model link url here"
//     value={model_id}
//     className="link-input"
//     onChange={this.update('model_id')} />
// </div>
//
// <div className="link-upload-cont">
//   <input type="text"
//     placeholder="paste icon image url here"
//     value={icon}
//     className="link-input"
//     onChange={this.update('icon')} />
// </div>
//
// <hr className="project-divider" />
//
// <label className="p-form-label">
//   description
//   <textarea
//     value={ description }
//     className="p-form-description"
//     onChange={this.update('description')} />
// </label>
// <div className="pitch-button-cont">
//   <input
//     className="pitch-button"
//     type="submit"
//     value="pitch"
//     onClick={this.handleSubmit} />
// </div>
//
const sampleProject = {
  "1": {
    "cashFlow": 50000,
    "isActuals": true
  },
  "2": {
    "cashFlow": 40018,
    "isActuals": true
  },
  "3": {
    "cashFlow": 16857,
    "isActuals": true
  },
  "4": {
    "cashFlow": -2915,
    "isActuals": true
  },
  "5": {
    "cashFlow": 20325,
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
}
;
