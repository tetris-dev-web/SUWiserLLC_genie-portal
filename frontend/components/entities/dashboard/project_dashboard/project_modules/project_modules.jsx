import React from 'react';
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
      const { project, isInvestor, isModalOpen, closeModalOnClick } = this.props;
      const { model_link } = this.state;
      // const noDataComponent = <h1 className="nodata-text">No data available</h1>

      return (
        // <Modal
        //   isOpen={isModalOpen}
        //   onRequestClose={closeModalOnClick}
        //   contentLabel="Project Graph Modal"
        //   style={ModalStyle}
        //   className="modal-container">

        //   <CloseButton closeModal = {closeModalOnClick} />

          // { projectClicked &&
            <React.Fragment>
              <Title nameOfProject={project.title}/>
              <div className="project-modal-grid">

                <IframeFor3dModel projectClicked={project}
                                  model_link ={model_link}/>
                <ProjectThermo    project={project}/>

                <CashFlowGraph
                                  actual_cashflow = {project.actual_cashflow}
                                  accum_actual_cashflow = {project.accum_actual_cashflow}
                                  projected_cashflow = {project.projected_cashflow}
                                  accum_projected_cashflow ={project.accum_projected_cashflow}
                                  height={200}
                                  width={300}/>

                <SummaryAndPlan
                                  handleKeyPress = {null}
                                  isInvestor = {isInvestor}
                                  summary = {project.summary}
                                  bus_plan_link = {project.bus_plan_link} />

                <ProjectMap       projectClicked={ project } />

              </div>
            </React.Fragment>
          // }
        // </Modal>
      );
    }
}


export default ProjectModules;
