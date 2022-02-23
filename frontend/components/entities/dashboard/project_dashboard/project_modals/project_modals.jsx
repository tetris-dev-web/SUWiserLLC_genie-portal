import React, { useState, useEffect } from "react";
import ProjectMap from "./project_modals_map";
import ProjectThermo from "./project_modals_thermo";
import CashFlowGraph from "./project_modals_cashflow";
import Loader from "../../loader/loader";
import {
  Title,
  IframeFor3dModel,
  CloseButton,
  SummaryAndPlan,
} from "./project_modals_subcomponents";
import { calculateCashflowData } from "../../../../../util/project_api_util";
import "./project_modals.scss";

const ProjectModules = (props) => {
  const { openProject, capitalBeingRaised } = props;
  const [modalLink, setModalLink] = useState(
    "https://poly.google.com/view/" + "7syizSLPN60" + "/embed",
  );

  useEffect(() => {
    const convert3dModelIDtoLink = () => {
      if (openProject && openProject.model_id && !modalLink) {
        if (openProject.model_id.search("-") != -1) {
          setModalLink(
            "https://3dwarehouse.sketchup.com/embed.html?autostart=1&mid=" +
              openProject.model_id +
              "&noEmbedWatermark=true",
          );
        } else {
          setModalLink("https://poly.google.com/view/" + openProject.model_id + "/embed");
        }
      }
    };
    convert3dModelIDtoLink();
  }, [openProject]);

  const isInvestor = true;
  if (openProject) {
    const { projected_cashflow, actual_cashflow, accum_projected_cashflow, accum_actual_cashflow } =
      calculateCashflowData(openProject.prePortalCashflow);

    return (
      <React.Fragment>
        <Title nameOfProject={openProject.title} />
        <div className="project-modal-grid">
          <IframeFor3dModel projectClicked={openProject} model_link={modalLink} />

          <CashFlowGraph
            actual_cashflow={actual_cashflow}
            accum_actual_cashflow={accum_actual_cashflow}
            projected_cashflow={projected_cashflow}
            accum_projected_cashflow={accum_projected_cashflow}
            valuation={openProject.valuation}
            length={Object.keys(openProject.prePortalCashflow).length}
            address={openProject.address}
            height={400}
            width={600}
          />

          <SummaryAndPlan
            handleKeyPress={null}
            isInvestor={isInvestor}
            summary={openProject.description}
            busLink={openProject.busLink}
          />

          <ProjectMap projectClicked={openProject} />
        </div>
      </React.Fragment>
    );
  }

  return <Loader />;
};

// CONTAINER
import { connect } from "react-redux";
// import {  fetchProjectPerformanceData  } from '../../../../../actions/modal_actions';
import { editProject } from "../../../../../actions/project_actions";

const mapStateToProps = (state, ownProps) => {
  // const cashflow = state.chain_data.projectGraph.projects[ownProps.project.id].cashFlow;

  return {
    // openProject: state.ui.modals.openProject,
    capitalBeingRaised: state.chain_data.projectGraph.capitalBeingRaised,
    projectContract: state.network.projectContract,
    projectAddress: state.ui.modals.projectAddress,
  };
};

//
// const mapDispatchToProps = dispatch => {
//   return {
//      fetchProjectPerformanceData : (projectAddress) => dispatch( fetchProjectPerformanceData (projectAddress))
//   }
// }

export default connect(mapStateToProps)(ProjectModules);
