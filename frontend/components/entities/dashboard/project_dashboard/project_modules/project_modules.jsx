import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './modal_style';
import ProjectMap from './project_modules_map';
import ProjectThermo from './project_modules_thermo';
import CashFlowGraph from './project_modules_cashflow';
import {Title, IframeFor3dModel, CloseButton, SummaryAndPlan } from './project_modules_subcomponents';
import { editProject } from '../../../../../actions/project_actions'

class ProjectModules extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      model_link: "",
      modalState: false,
    };
  }

  UNSAFE_componentWillUpdate (prevProps, prevState) {
    const { projectClicked } = this.props;

    const convert3dModelIDtoLink = () => {
      if (projectClicked && projectClicked.model_id && !this.state.model_link) {
        if(projectClicked.model_id.search('-') != -1) {
          this.setState({ model_link: "https://3dwarehouse.sketchup.com/embed.html?autostart=1&mid=" + projectClicked.model_id + "&noEmbedWatermark=true" });
        } else {
          this.setState({ model_link: "https://poly.google.com/view/" + projectClicked.model_id + "/embed" });
        }
      }
    };

    convert3dModelIDtoLink();
  }

  render() {
      const { projectClicked, isInvestor, isModalOpen, closeModalOnClick } = this.props;
      const { model_link } = this.state;
      // const noDataComponent = <h1 className="nodata-text">No data available</h1>

      return (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModalOnClick}
          contentLabel="Project Graph Modal"
          style={ModalStyle}
          className="modal-container">

          <CloseButton closeModal = {closeModalOnClick} />

          { projectClicked &&
            <React.Fragment>
              <Title nameOfProject={projectClicked.title}/>
              <div className="project-modal-grid">

                <IframeFor3dModel projectClicked={projectClicked}
                                  model_link ={model_link}/>
                <ProjectThermo    project={projectClicked}/>

                <CashFlowGraph
                                  actual_cashflow = {projectClicked.actual_cashflow}
                                  accum_actual_cashflow = {projectClicked.accum_actual_cashflow}
                                  projected_cashflow = {projectClicked.projected_cashflow}
                                  accum_projected_cashflow ={projectClicked.accum_projected_cashflow}
                                  height={200}
                                  width={300}/>

                <SummaryAndPlan
                                  handleKeyPress = {null}
                                  isInvestor = {isInvestor}
                                  summary = {projectClicked.summary}
                                  bus_plan_link = {projectClicked.bus_plan_link} />

                <ProjectMap       projectClicked={ projectClicked } />

              </div>
            </React.Fragment>
          }
        </Modal>
      );
    }
}


export default ProjectModules;
