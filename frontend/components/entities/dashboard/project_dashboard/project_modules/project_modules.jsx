import React from "react";
import ProjectMap from "./project_modules_map";
import ProjectThermo from "./project_modules_thermo";
import DepositCashFlow from "./project_modules_deposit_cashflow";
import CashFlowGraph from "./project_modules_cashflow";
import Loader from "../../loader/loader";
import {
  Title,
  IframeFor3dModel,
  CloseButton,
  SummaryAndPlan,
} from "./project_modules_subcomponents";
import { fetchProjectModuleData } from "../../../../../actions/chain_actions/project_actions";
import { editProject } from "../../../../../actions/project_actions";
import { calculateCashflowData } from "../../../../../util/project_api_util";
import { connect } from "react-redux";
import { merge } from "lodash";

const mapStateToProps = (state, ownProps) => {
  // const cashflow = state.entities.projectGraph.projects[ownProps.project.id].cashFlow;
  const project = state.entities.projectGraph.projects[ownProps.projectId];
  return {
    project,
    capitalBeingRaised: state.entities.projectGraph.capitalBeingRaised,
    projectContract: state.network.projectContract,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjectModuleData: (address) => dispatch(fetchProjectModuleData(address)),
  };
};

const ProjectModules = (props) => {
  const [state, setState] = React.useState({
    model_link: "https://poly.google.com/view/" + "7syizSLPN60" + "/embed",
    modalState: false,
  });
};
const { project, fetchProjectModuleData, projectClicked } = props;
const { address } = project;

useEffect(() => {
  fetchProjectModuleData(address);
}, [fetchProjectModuleData, address]);
//we can listen for changes in later with websockets
useEffect(() => {
  const convert3dModelIDtoLink = () => {
    if (projectClicked && projectClicked.model_id && !this.state.model_link) {
      if (projectClicked.model_id.search("-") != -1) {
        setState(
          merge({}, state, {
            model_link:
              "https://3dwarehouse.sketchup.com/embed.html?autostart=1&mid=" +
              projectClicked.model_id +
              "&noEmbedWatermark=true",
          }),
        );
      } else {
        setState(
          merge({}, state, {
            model_link: "https://poly.google.com/view/" + projectClicked.model_id + "/embed",
          }),
        );
      }
    }
  };

  convert3dModelIDtoLink();
}, [projectClicked]);

const watchReceiveCashflow = () => {
  const { project } = props;
  project.ReceiveCashFlow().watch((error, event) => {
    fetchProjectModuleData(project.address);
  });
};

const { isInvestor, isModalOpen, closeModalOnClick } = props;

if (project.cashFlow) {
  const { projected_cashflow, actual_cashflow, accum_projected_cashflow, accum_actual_cashflow } =
    calculateCashflowData(project.cashFlow);
  const { model_link } = state;

  return (
    <React.Fragment>
      <Title nameOfProject={project.title} />

      <DepositCashFlow projectAddress={project.address} />

      <div className="project-modal-grid">
        <IframeFor3dModel projectClicked={project} model_link={model_link} />

        <CashFlowGraph
          actual_cashflow={actual_cashflow}
          accum_actual_cashflow={accum_actual_cashflow}
          projected_cashflow={projected_cashflow}
          accum_projected_cashflow={accum_projected_cashflow}
          valuation={project.valuation}
          length={Object.keys(project.cashFlow).length}
          address={project.address}
          height={200}
          width={300}
        />

        <SummaryAndPlan
          handleKeyPress={null}
          isInvestor={isInvestor}
          summary={project.description}
          bus_plan_link={project.bus_plan_link}
        />

        <ProjectMap projectClicked={project} />
      </div>
    </React.Fragment>
  );

  // return <Loader/>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModules);
