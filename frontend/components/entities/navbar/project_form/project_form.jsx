import React from 'react';
import { totalData } from '../../../../util/token_data_util';
import { roundToTwo, getFileExtension } from '../../../../util/function_util';
import DivWithCorners from './withCorners';
import CashFlowModal from './cashflow_modal/cashflow_modal';
import PDFModal from './pdf_modal/pdf_modal';
// import { getFailedProjects } from '../../../../util/project_api_util';
import Finance from 'financejs';
import { calculateAccumulatedRevenue, processCashData } from '../../../../util/project_api_util';


class ProjectForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      latitude: '',
      longitude: '',
      revenue: '',
      valuation: '1',
      model_id: '7syizSLPN60',
      city: 'New York',
      country: 'USA',
      continent: 'North America',
      icon: '',
      description: '',
      imageUrl: '',
      coins: '****',
      status: 'pitched',
      summary: 'summary',
      openModal: false,
      currentQuarter: '',
      actual_cashflow: '',
      accum_actual_cashflow: '',
      projected_cashflow: '',
      accum_projected_cashflow: '',
      cashflow: '',
      cashflowJSONName: '',
      accumulatedRevenue: '',
      capital_required: '',
      planFilePDFDataURL: '',
      planFilePDFName: ''
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
  }

  componentDidMount() {
    this.renderFileName();
  }

  componentWillUnmount() {
    this.props.clearProjectErrors();
  }

  handleSubmit(e) {
    e.preventDefault();

    const file = this.state.imageFile;
    const data = new FormData();
    const {drizzle, drizzleState} = this.props;
    const GNITokenCrowdsale = drizzle.contracts.GNITokenCrowdsale;

    if (file) data.append("project[file]", file);
    data.append("project[title]", this.state.title);

    data.append("project[latitude]", this.state.latitude);
    data.append("project[longitude]", this.state.longitude);

    data.append("project[city]", this.state.city);
    data.append("project[country]", this.state.country);
    data.append("project[continent]", this.state.continent);

    data.append("project[valuation]", this.state.valuation);
    data.append("project[cashflow]", this.state.cashflow);
    data.append("project[creator_id]", this.props.currentUser.id);

    data.append("project[model_id]", this.state.model_id);
    data.append("project[summary]", this.state.summary);
    data.append("project[capital_required]", this.state.capital_required);


    // data.append("project[revenue]", this.state.revenue);
    // formData.append("project[icon]", this.state.icon);
    // formData.append("project[description]", this.state.description);
    // formData.append("project[status]", this.state.status);


    this.props.closeModal();
  }
  // Moved until data is properly structured
  // this.props.createProject(data)
  // .then( () => {
  //   const pitchedProject = GNITokenCrowdsale.methods.pitchProject.cacheSend(this.state.titlethis.state.valuation, { from: drizzleState.accounts[0] });
  // });

  dropPinClick() {
    if(this.state.latitude != '' && this.state.longitude != '') {
      this.setState({latlngpresence: true});
      this.openModal();
    } else {
      this.setState({droppinclicked: true});
    }
  }

  openModal() {
    this.setState({openModal: true});
  }

  closeModal() {
    this.setState({openModal: false});
  }

  renderLatLngErrors(presence, clicked) {
    if (!presence && clicked) {
      return (
        <ul className="project-errors">
          <li>Latitude and Longitude can't be blank</li>
        </ul>
      );
    }
  }

  updateLatLng(pos) {
    this.setState({latitude: pos.lat, longitude: pos.lng});
  }

  updateAddress(address) {
    if(address) {
      let addr = address.split(',');
      this.setState({street: addr[0], city: addr[1], continent: addr[3]});
    }
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

  findCurrentQuarter(quarters, cashflow = this.state.cashflow) {
    // const { cashflow } = this.state
    let currentQuarter;
    console.log("Cashflow from function is: ", cashflow);
    quarters.some(quarter => {
      if (!cashflow[quarter.toString()]["isActuals"]) {
        currentQuarter = quarter;
        return !cashflow[quarter.toString()]["isActuals"];
      }
    })
    return currentQuarter;
  }

  calculateTotalCapitalDeployed(){
    let capital = 0;
    Object.values(this.props.projects).forEach((project) => {
      if(project.cashflow){
        let jsonProjectCashflow = processCashData(project.cashflow);
        let quarters = Object.keys(jsonProjectCashflow).sort();
        let currentQuarter = this.findCurrentQuarter(quarters);
        let valuesForActualQuarters = Object.values(jsonProjectCashflow).slice(0, currentQuarter + 1);
        capital += valuesForActualQuarters.reduce((acc, el) => acc + el);
      }
    });
    return capital;
  }

  calculateCapitalRequired() {
    setState({capital_required: this.state.accumulatedRevenue.min()});
  }

  calculateDiscountFactor(){
    // console.log(this.getFailedProjects());
    let capitalDeployed = this.calculateTotalCapitalDeployed();
    let discountFactor = (50 - ((capitalDeployed/190000.0) + (this.getFailedProjects() * 6)));
    if (discountFactor > 10) {
      return discountFactor;
    } else {
      return 10;
    }
  }

  calculateNetPresentValue(projectCashflows){
    let discountFactor = this.calculateDiscountFactor();
    let cashflows = Object.values(processCashData(projectCashflows));
    //change above line to account for new structure
    let finance = new Finance();
    let netPresentValue = finance.NPV(discountFactor, 0, ...cashflows);
    return netPresentValue;
  }

  receiveCashflowData(cashflowVars){
    cashflowVars;
    console.log(this);
    //   const {actual_cashflow,
    //   accum_actual_cashflow,
    //   projected_cashflow,
    //   accum_projected_cashflow,
    //   cashflow} = cashflowVars
    // this.setState({
    //   actual_cashflow,
    //   accum_actual_cashflow,
    //   projected_cashflow,
    //   accum_projected_cashflow,
    //   cashflow
    // })
  }

  update(property) {
    return (e) => {
      this.setState({ [property]: e.currentTarget.value });

      // const { revenue } = this.state;
      // const price = 70;
      // const coins = roundToTwo(revenue / price);
      //
      // if (revenue || revenue > 0) {
      //   this.setState({ coins });
      // } else {
      //   this.setState({ coins: '****' });
      // }
    };
  }

  updateCashflow(cashflow) {
    // Needed to update project state with cashflow state
    console.log("Updating cashflow with Project Form's function: ", this);
    return e => {
      console.log("Event is: ", e);
      console.log("This from updateCashflow function: ", this);
      e.preventDefault();
      this.setState({ 'cashflow': cashflow });
    };
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
            this.setState({
              cashflow,
              cashflowJSONName: file.name,
              accumulatedRevenue: calculateAccumulatedRevenue(cashflow),
              currentQuarter: this.findCurrentQuarter(quarters, cashflow),
            });
            // this.setState({currentQuarter: this.findCurrentQuarter(quarters)});
          });
          break;
        case "planFilePDF":
          this.parseInputFile(file).then(planFilePDFDataURL => {
            this.setState({
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

  renderFileName() {
    const inputs = document.querySelectorAll( '.file-input' );
    Array.prototype.forEach.call( inputs, function( input ) {
      const label	 = input.nextElementSibling;
      const labelVal = label.innerHTML;

      input.addEventListener('change', function(e) {
        let fileName = e.target.value.split( '\\' ).pop();
        // let fileName = '';
        // if (this.files && this.files.length > 1 ) {
        //   fileName = ( this.getAttribute('data-multiple-caption' ) || '')
        //                 .replace('{count}', this.files.length);
        // } else {
        //   fileName = e.target.value.split( '\\' ).pop();
        // }

        if (fileName) {
          label.querySelector('span').innerHTML = fileName;
        } else {
          label.innerHTML = labelVal;
        }
      });
    });
  }

  render() {
    // console.log("Finance is ", Finance);
    // console.log("Finance.NPV is ", new Finance().NPV);
    // console.log("Net Present Value is: ", this.calculateNetPresentValue(Object.values(processCashData(this.props.projects))[0].cashflow));
    // console.log("Discount factor is: ", this.calculateDiscountFactor());
    // console.log("Capital is: ", this.calculateTotalCapitalDeployed());
    // console.log("Cashflow is: ", this.state.cashflow);

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

    let { title, latitude, longitude, summary,
      // revenue, valuation, description, model_id, city, country, continent, icon
    } = this.state;
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
            <span className="text">Drop Pin</span>
          </DivWithCorners>
        </div>
        <div className="flexed">
          <div>

            <div className="file-input-container">
              <div className="file-input">
                <input 
                  type="file"
                  onChange={this.updateFile('cashflowJSON')} />
                <svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg"><path d="m456 176h-52c-.847656-2.175781-1.777344-4.390625-2.785156-6.679688l36.800781-36.800781c9.378906-9.375 9.378906-24.578125 0-33.953125l-56.558594-56.558594c-9.375-9.378906-24.578125-9.378906-33.953125 0l-36.800781 36.800782c-2.289063-1.007813-4.503906-1.9375-6.679687-2.785156v-52.023438c0-13.253906-10.746094-24-24-24h-80.023438c-13.253906 0-24 10.746094-24 24v52c-2.175781.847656-4.390625 1.777344-6.679688 2.785156l-36.800781-36.800781c-9.375-9.378906-24.578125-9.378906-33.953125 0l-56.566406 56.558594c-9.359375 9.382812-9.359375 24.570312 0 33.953125l36.800781 36.800781c-1.007812 2.289063-1.9375 4.503906-2.785156 6.679687h-52.015625c-13.253906 0-24 10.746094-24 24v80.023438c0 13.253906 10.746094 24 24 24h52c.847656 2.175781 1.777344 4.390625 2.785156 6.679688l-36.800781 36.800781c-9.378906 9.375-9.378906 24.578125 0 33.953125l56.558594 56.558594c9.382812 9.359374 24.570312 9.359374 33.953125 0l36.800781-36.800782c2.289063 1.007813 4.503906 1.9375 6.679687 2.785156v52.023438c0 13.253906 10.746094 24 24 24h80.023438c13.253906 0 24-10.746094 24-24v-52c2.175781-.847656 4.390625-1.777344 6.679688-2.785156l36.800781 36.800781c9.382812 9.359375 24.570312 9.359375 33.953125 0l56.566406-56.558594c9.359375-9.382812 9.359375-24.570312 0-33.953125l-36.800781-36.800781c1.007812-2.289063 1.9375-4.503906 2.785156-6.679687h52.015625c13.253906 0 24-10.746094 24-24v-80.023438c0-13.253906-10.746094-24-24-24zm8 104c0 4.417969-3.582031 8-8 8h-57.601562c-3.417969 0-6.457032 2.171875-7.566407 5.40625-1.847656 5.300781-4.003906 10.492188-6.449219 15.546875-1.449218 3.066406-.808593 6.714844 1.601563 9.101563l40.71875 40.722656c1.503906 1.5 2.351563 3.539062 2.351563 5.664062s-.847657 4.160156-2.351563 5.664063l-56.558594 56.558593c-3.171875 3.019532-8.15625 3.019532-11.328125 0l-40.71875-40.71875c-2.390625-2.410156-6.039062-3.050781-9.105468-1.601562-5.054688 2.445312-10.242188 4.597656-15.542969 6.449219-3.265625 1.097656-5.460938 4.164062-5.449219 7.605469v57.601562c0 4.417969-3.582031 8-8 8h-80c-4.417969 0-8-3.582031-8-8v-57.601562c0-3.417969-2.171875-6.457032-5.40625-7.566407-5.300781-1.847656-10.492188-4.003906-15.546875-6.449219-3.066406-1.449218-6.714844-.808593-9.101563 1.601563l-40.722656 40.71875c-3.171875 3.019531-8.152344 3.019531-11.328125 0l-56.558593-56.558594c-1.503907-1.5-2.351563-3.539062-2.351563-5.664062s.847656-4.164063 2.351563-5.664063l40.71875-40.71875c2.410156-2.390625 3.050781-6.039062 1.601562-9.105468-2.445312-5.054688-4.597656-10.242188-6.449219-15.542969-1.097656-3.265625-4.164062-5.460938-7.605469-5.449219h-57.601562c-4.417969 0-8-3.582031-8-8v-80c0-4.417969 3.582031-8 8-8h57.601562c3.417969 0 6.457032-2.171875 7.566407-5.40625 1.847656-5.300781 4.003906-10.492188 6.449219-15.546875 1.449218-3.066406.808593-6.714844-1.601563-9.101563l-40.71875-40.722656c-1.503906-1.5-2.351563-3.539062-2.351563-5.664062s.847657-4.160156 2.351563-5.664063l56.558594-56.558593c3.167969-3.027344 8.160156-3.027344 11.328125 0l40.71875 40.71875c2.390625 2.410156 6.039062 3.050781 9.105468 1.601562 5.054688-2.445312 10.242188-4.597656 15.542969-6.449219 3.265625-1.097656 5.460938-4.164062 5.449219-7.605469v-57.601562c0-4.417969 3.582031-8 8-8h80c4.417969 0 8 3.582031 8 8v57.601562c0 3.417969 2.171875 6.457032 5.40625 7.566407 5.300781 1.847656 10.492188 4.003906 15.546875 6.449219 3.066406 1.449218 6.714844.808593 9.101563-1.601563l40.722656-40.71875c3.171875-3.019531 8.152344-3.019531 11.328125 0l56.558593 56.558594c1.503907 1.5 2.351563 3.539062 2.351563 5.664062s-.847656 4.164063-2.351563 5.664063l-40.71875 40.71875c-2.410156 2.390625-3.050781 6.039062-1.601562 9.105468 2.445312 5.054688 4.597656 10.242188 6.449219 15.542969 1.097656 3.265625 4.164062 5.460938 7.605469 5.449219h57.601562c4.417969 0 8 3.582031 8 8zm0 0" /><path d="m240 136c-57.4375 0-104 46.5625-104 104s46.5625 104 104 104 104-46.5625 104-104c-.066406-57.410156-46.589844-103.933594-104-104zm0 192c-48.601562 0-88-39.398438-88-88s39.398438-88 88-88 88 39.398438 88 88c-.058594 48.578125-39.421875 87.941406-88 88zm0 0" /></svg>
              </div>
                <label htmlFor="json-file">{this.state.cashflowJSONName || " #| choose json"}</label>
            </div>

            <div className="text-input-container current-quarter-input">
              <input id="current-quarter"
                type="number"
                onChange={this.update('currentQuarter')} />
              <label htmlFor="current-quarter"> current qtr</label>
            </div>

          </div>

          <DivWithCorners>
            <span className="text">
              <CashFlowModal quarter={this.state.currentQuarter ? this.state.currentQuarter : 9}
                cashflow={this.state.cashflow ? this.state.cashflow : sampleProject}
                updateCashflow={this.updateCashflow}
                receiveCashflowData={this.receiveCashflowData} />
            </span>
          </DivWithCorners>
        </div>

        <div className="rates-box">
          <div className="discounts-box">
            discount rate
            <div className="amount-box">
              12
            </div>
          </div>

          <div className="cap-row">
            <span>valuation</span>
            <div className="style2">$830,000</div>
            <div className="style2">$130,000</div>
            <span>capital <br />  required</span>
          </div>

          <div className="coins">
            <div className="style2">
              10,000
            </div>
            coins to be issued
          </div>

        </div>

        <div className="flexed">
          <div className="file-input-container">
            <div className="file-input">
              <input
                id="file"
                type="file"
                onChange={this.updateFile('planFilePDF')} />
              <svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg"><path d="m456 176h-52c-.847656-2.175781-1.777344-4.390625-2.785156-6.679688l36.800781-36.800781c9.378906-9.375 9.378906-24.578125 0-33.953125l-56.558594-56.558594c-9.375-9.378906-24.578125-9.378906-33.953125 0l-36.800781 36.800782c-2.289063-1.007813-4.503906-1.9375-6.679687-2.785156v-52.023438c0-13.253906-10.746094-24-24-24h-80.023438c-13.253906 0-24 10.746094-24 24v52c-2.175781.847656-4.390625 1.777344-6.679688 2.785156l-36.800781-36.800781c-9.375-9.378906-24.578125-9.378906-33.953125 0l-56.566406 56.558594c-9.359375 9.382812-9.359375 24.570312 0 33.953125l36.800781 36.800781c-1.007812 2.289063-1.9375 4.503906-2.785156 6.679687h-52.015625c-13.253906 0-24 10.746094-24 24v80.023438c0 13.253906 10.746094 24 24 24h52c.847656 2.175781 1.777344 4.390625 2.785156 6.679688l-36.800781 36.800781c-9.378906 9.375-9.378906 24.578125 0 33.953125l56.558594 56.558594c9.382812 9.359374 24.570312 9.359374 33.953125 0l36.800781-36.800782c2.289063 1.007813 4.503906 1.9375 6.679687 2.785156v52.023438c0 13.253906 10.746094 24 24 24h80.023438c13.253906 0 24-10.746094 24-24v-52c2.175781-.847656 4.390625-1.777344 6.679688-2.785156l36.800781 36.800781c9.382812 9.359375 24.570312 9.359375 33.953125 0l56.566406-56.558594c9.359375-9.382812 9.359375-24.570312 0-33.953125l-36.800781-36.800781c1.007812-2.289063 1.9375-4.503906 2.785156-6.679687h52.015625c13.253906 0 24-10.746094 24-24v-80.023438c0-13.253906-10.746094-24-24-24zm8 104c0 4.417969-3.582031 8-8 8h-57.601562c-3.417969 0-6.457032 2.171875-7.566407 5.40625-1.847656 5.300781-4.003906 10.492188-6.449219 15.546875-1.449218 3.066406-.808593 6.714844 1.601563 9.101563l40.71875 40.722656c1.503906 1.5 2.351563 3.539062 2.351563 5.664062s-.847657 4.160156-2.351563 5.664063l-56.558594 56.558593c-3.171875 3.019532-8.15625 3.019532-11.328125 0l-40.71875-40.71875c-2.390625-2.410156-6.039062-3.050781-9.105468-1.601562-5.054688 2.445312-10.242188 4.597656-15.542969 6.449219-3.265625 1.097656-5.460938 4.164062-5.449219 7.605469v57.601562c0 4.417969-3.582031 8-8 8h-80c-4.417969 0-8-3.582031-8-8v-57.601562c0-3.417969-2.171875-6.457032-5.40625-7.566407-5.300781-1.847656-10.492188-4.003906-15.546875-6.449219-3.066406-1.449218-6.714844-.808593-9.101563 1.601563l-40.722656 40.71875c-3.171875 3.019531-8.152344 3.019531-11.328125 0l-56.558593-56.558594c-1.503907-1.5-2.351563-3.539062-2.351563-5.664062s.847656-4.164063 2.351563-5.664063l40.71875-40.71875c2.410156-2.390625 3.050781-6.039062 1.601562-9.105468-2.445312-5.054688-4.597656-10.242188-6.449219-15.542969-1.097656-3.265625-4.164062-5.460938-7.605469-5.449219h-57.601562c-4.417969 0-8-3.582031-8-8v-80c0-4.417969 3.582031-8 8-8h57.601562c3.417969 0 6.457032-2.171875 7.566407-5.40625 1.847656-5.300781 4.003906-10.492188 6.449219-15.546875 1.449218-3.066406.808593-6.714844-1.601563-9.101563l-40.71875-40.722656c-1.503906-1.5-2.351563-3.539062-2.351563-5.664062s.847657-4.160156 2.351563-5.664063l56.558594-56.558593c3.167969-3.027344 8.160156-3.027344 11.328125 0l40.71875 40.71875c2.390625 2.410156 6.039062 3.050781 9.105468 1.601562 5.054688-2.445312 10.242188-4.597656 15.542969-6.449219 3.265625-1.097656 5.460938-4.164062 5.449219-7.605469v-57.601562c0-4.417969 3.582031-8 8-8h80c4.417969 0 8 3.582031 8 8v57.601562c0 3.417969 2.171875 6.457032 5.40625 7.566407 5.300781 1.847656 10.492188 4.003906 15.546875 6.449219 3.066406 1.449218 6.714844.808593 9.101563-1.601563l40.722656-40.71875c3.171875-3.019531 8.152344-3.019531 11.328125 0l56.558593 56.558594c1.503907 1.5 2.351563 3.539062 2.351563 5.664062s-.847656 4.164063-2.351563 5.664063l-40.71875 40.71875c-2.410156 2.390625-3.050781 6.039062-1.601562 9.105468 2.445312 5.054688 4.597656 10.242188 6.449219 15.542969 1.097656 3.265625 4.164062 5.460938 7.605469 5.449219h57.601562c4.417969 0 8 3.582031 8 8zm0 0" /><path d="m240 136c-57.4375 0-104 46.5625-104 104s46.5625 104 104 104 104-46.5625 104-104c-.066406-57.410156-46.589844-103.933594-104-104zm0 192c-48.601562 0-88-39.398438-88-88s39.398438-88 88-88 88 39.398438 88 88c-.058594 48.578125-39.421875 87.941406-88 88zm0 0" /></svg>
            </div>
            <label htmlFor="file">{this.state.planFilePDFName || " #|choose pdf"}</label>
          </div>

          <DivWithCorners>
            <span className="text">
              <PDFModal planFilePDFDataURL={this.state.planFilePDFDataURL}/>
            </span>
          </DivWithCorners>
        </div>
        <div className="flexed">
          <input className="text-input inputfile" id="file2"
            type="file"/>
          <label htmlFor="file">#|model id</label>

          <DivWithCorners>
            <span className="text">Poly Model</span>
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
