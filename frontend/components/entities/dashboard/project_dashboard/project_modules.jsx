import React from 'react';
import ProjectGraph from './project_graph';
import Modal from 'react-modal';
import ModalStyle from './modal_style';
import ProjectMap from './project_modules_map';
import ProjectThermo from './project_thermo';
import CashFlowGraph from './project_modules_cashflow';
import { calculateAccumulatedRevenue, processCashData } from '../../../../util/project_api_util';
import $ from 'jquery';

class ProjectModules extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      // openModal: this.props.openModal,
      showText: false,
      model_link: this.props.model_link,
      summary: this.props.summary,
    };


    this.toggleTextShowing = this.toggleTextShowing.bind(this);

  }

  toggleTextShowing() {
    this.setState({ showText:!this.state.showText });
  }


  // handleKeyPress(e) {
  //   alert('PRESSED'); //if enter key pressed, save to database
  // }

  render() {
      const { projectClicked,showText,} = this.props;
      console.log("Module state: ",this.state, "module props : ", this.props)
      return (
            <Modal
              isOpen={this.props.openModal}
              onRequestClose={this.props.closeModal}
              contentLabel="Project Graph Modal"
              style={ModalStyle}
              className="modal-container">
              <div className="black-close-modal-button close-modal-button"
                onClick={this.props.closeModal}>&times;</div>
              {!projectClicked.summary ? <h1 className="nodata-text">No data available</h1> :
                <React.Fragment>
                  <div className="ft-modal-header-cont">
                    <div className="ft-modal-header bylaws-header">
                      {projectClicked.title}
                    </div>
                  </div>
                  <div className="project-modal-grid">
                    {!projectClicked.model_id ? <div></div> :
                      <div className="iframe">
                        <iframe id="iframe" src={ `${this.state.model_link}` } frameBorder="0" allowvr="yes" allow="vr; accelerometer; magnetometer; gyroscope;" allowFullScreen mozallowfullscreen="true" webkitallowfullscreen="true" ></iframe>
                      </div>
                    }
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
                          {this.state.summary}
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
