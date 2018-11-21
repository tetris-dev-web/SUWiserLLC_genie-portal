import React from 'react';
import ProjectGraph from './project_graph';
import Modal from 'react-modal';
import ModalStyle from './modal_style';
import ProjectMap from './project_modules_map';
import ProjectThermo from './project_thermo';
import CashFlowGraph from './project_modules_cashflow';
import { calculateAccumulatedRevenue, processCashData } from '../../../../util/project_api_util';
import $ from 'jquery';


function CloseButton (props){
  return <div className="black-close-modal-button close-modal-button"
    onClick={props.closeModal}>&times;</div>
}

function Title (props){
  return (<div className="ft-modal-header-cont">
    <div className="ft-modal-header bylaws-header">
      {props.projectClicked.title}
    </div>
  </div>)
}





class ProjectModules extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      //projectClicked : "",
      showText: false,
      model_link: "",
      summary: this.props.summary,
      doIHaveData : false
    };


    this.toggleTextShowing = this.toggleTextShowing.bind(this);
    this.checkForData = this.checkForData.bind(this);

  }



  toggleTextShowing() {
    this.setState({ showText:!this.state.showText });
  }

  checkForData (projectClicked) {
    console.log("dataCheck", doIHaveData)
    projectClicked.summary
    ? this.setState( {doIHaveData:true })
    : this.setState( {doIHaveData:false })
  }

  componentWillMount () {
    this.checkForData(this.props.projectClicked)
    //this.setState({projectClicked: this.props.projectClicked})

        // if(this.state.model_id.search('-') != -1) {
        //   this.setState({ model_link: "https://3dwarehouse.sketchup.com/embed.html?autostart=1&mid=" + projectClicked.model_id + "&noEmbedWatermark=true"});
        // } else {
        //   this.setState({ model_link: "https://poly.google.com/view/" + projectClicked.model_id + "/embed" });
        // }
  }






  // handleKeyPress(e) {
  //   alert('PRESSED'); //if enter key pressed, save to database
  // }

  render() {

      const { projectClicked,showText} = this.props
      const {doIHaveData} = this.state

      console.log("Module state: ",this.state, "module props : ", this.props)

      const noDataComponent = <h1 className="nodata-text">No data available</h1>

      return (
            <Modal
              isOpen={this.props.openModal}
              onRequestClose={this.props.closeModal}
              contentLabel="Project Graph Modal"
              style={ModalStyle}
              className="modal-container">

              <CloseButton closeModal = {this.props.closeModal}/>

              { !doIHaveData? noDataComponent :

                <React.Fragment>


                  <div className="project-modal-grid">
                      {!projectClicked.model_id ? <div></div> :
                        <div className="iframe">
                          <iframe id="iframe" src={ `${this.state.model_link}` } frameBorder="0" allowvr="yes" allow="vr; accelerometer; magnetometer; gyroscope;" allowFullScreen mozallowfullscreen="true" webkitallowfullscreen="true" ></iframe>
                        </div>
                      }

                    <Title closeModal = {this.props}/>




                      <div className="temp">
                        <div className="thermo-canvas-container">
                          <ProjectThermo project={projectClicked}
                                         showText={showText}
                                         toggleTextShowing={this.toggleTextShowing}/>
                        </div>
                      </div>


                      <div className="project-description">

                        <div className="project-text">
                          <div onKeyPress={this.handleKeyPress} contentEditable={!this.props.isInvestor} className="project-summary"  suppressContentEditableWarning={true}>
                            {projectClicked.summary}
                          </div>
                        </div>

                        <div className="bus-plan-download">
                          <a target="_blank" rel="noopener noreferrer" href={ `${projectClicked.bus_plan_link}` }>
                            <i className="fas fa-file-contract">
                              <span>business plan</span>
                            </i>
                          </a>
                        </div>

                    </div>

                    <div className="cashflow-graph">
                      <CashFlowGraph
                        cashflow={processCashData(projectClicked.cashflow)}
                        valuation={projectClicked.valuation}
                        accumulatedRevenue={
                          calculateAccumulatedRevenue(
                            processCashData(projectClicked.cashflow)
                          )
                        } />
                    </div>

                    <div className="project-map">
                      <ProjectMap projectClicked={ projectClicked } />
                    </div>
                  </div>
                </React.Fragment>
              }
            </Modal>
      );
    }
}

export default ProjectModules;
