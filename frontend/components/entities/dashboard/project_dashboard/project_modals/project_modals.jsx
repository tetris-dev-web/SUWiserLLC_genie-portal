import React from 'react';
import ProjectMap from './project_modals_map';
import ProjectThermo from './project_modals_thermo';
import CashFlowGraph from './project_modals_cashflow';
import Loader from '../../loader/loader';
import {Title, IframeFor3dModel, CloseButton, SummaryAndPlan } from './project_modals_subcomponents';
import { calculateCashflowData } from '../../../../../util/project_api_util';
import './project_modals.scss';


class ProjectModules extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      model_link: "https://poly.google.com/view/" + "7syizSLPN60" + "/embed"
    };
  }

  // componentWillMount () {
  //   console.log("in mount")
  //   this.props.fetchProjectPerformanceData(this.props.projectAddress);
  // }

  UNSAFE_componentWillUpdate (prevProps, prevState) {
    const { openProject } = this.props;

    const convert3dModelIDtoLink = () => {
      if (openProject && openProject.model_id && !this.state.model_link) {
        if(openProject.model_id.search('-') != -1) {
          this.setState({ model_link: "https://3dwarehouse.sketchup.com/embed.html?autostart=1&mid=" + openProject.model_id + "&noEmbedWatermark=true" });
        } else {
          this.setState({ model_link: "https://poly.google.com/view/" + openProject.model_id + "/embed" });
        }
      }
    };

    convert3dModelIDtoLink();
  }

  render() {
      const { openProject} = this.props;
      console.log("openProject", openProject);
      const isInvestor = true;
      if(openProject) {
        const { projected_cashflow, actual_cashflow, accum_projected_cashflow, accum_actual_cashflow } = calculateCashflowData(openProject.prePortalCashflow);
        const { model_link } = this.state;

        return (
          <React.Fragment>
            <Title nameOfProject={openProject.title}/>
            <div className="project-modal-grid">

              <IframeFor3dModel projectClicked={openProject}
                model_link ={model_link}/>

              <CashFlowGraph
                actual_cashflow = {actual_cashflow}
                accum_actual_cashflow = {accum_actual_cashflow}
                projected_cashflow = {projected_cashflow}
                accum_projected_cashflow ={accum_projected_cashflow}
                valuation={openProject.valuation}
                length={Object.keys(openProject.prePortalCashflow).length}
                address={openProject.address}
                height={200}
                width={300}/>

              <SummaryAndPlan
                handleKeyPress = {null}
                isInvestor = {isInvestor}
                summary = {openProject.description}
                bus_plan_link = {openProject.bus_plan_link} />

              <ProjectMap
                projectClicked={ openProject } />

            </div>
          </React.Fragment>
        );
      }

      return <Loader />;
    }
}

// CONTAINER
import { connect } from 'react-redux';
// import {  fetchProjectPerformanceData  } from '../../../../../actions/modal_actions';
import { editProject } from '../../../../../actions/project_actions'

const mapStateToProps = (state, ownProps) => {
  // const cashflow = state.chain_data.projectGraph.projects[ownProps.project.id].cashFlow;

  return {
    // openProject: state.ui.modals.openProject,
    capitalBeingRaised: state.chain_data.projectGraph.capitalBeingRaised,
    projectContract: state.network.projectContract,
    projectAddress: state.ui.modals.projectAddress,
  }
}

//
// const mapDispatchToProps = dispatch => {
//   return {
//      fetchProjectPerformanceData : (projectAddress) => dispatch( fetchProjectPerformanceData (projectAddress))
//   }
// }

export default connect(mapStateToProps)(ProjectModules);
