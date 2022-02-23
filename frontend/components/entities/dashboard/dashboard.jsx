//libraries
import React, { useState } from "react";
//components
import DashboardGraph from "./dashboard_graph_container";
//project graph types
import LocGraphContainer from "./project_dashboard/loc_view/loc_graph_container";
import VotesGraphContainer from "./project_dashboard/votes_view/votes_graph_container";
import { voteViewIcon, locViewIcon } from "./project_dashboard/ProjectDashboardIcons";

//token graph types
import TokenGraph from "./token_dashboard/token_view/token_graph";
import { byUserIcon, allUsersIcon } from "./token_dashboard/TokenDashboardIcons";

// import Loader from './loader/loader';
import TimeAxis from "./time_axis/time_axis";

const Dashboard = (props) => {
  const [stateLower, setStateLower] = useState({
    LowerDashboardisClosed: true,
    LowerGraphNeedsAnAxis: false,
  });
  const [stateUpper, setStateUpper] = useState({
    UpperDashboardisClosed: true,
    UpperGraphNeedsAnAxis: false,
  });

  const [showAxis, setShowAxis] = useState(false);

  const showAxisFunc = (ThisDashboardNeedsanAxis, dashboardIsClosed, dashboardType) => {
    if (dashboardType === "token") {
      setStateUpper({
        // ...stateUpper,
        UpperDashboardisClosed: dashboardIsClosed,
        UpperGraphNeedsAnAxis: ThisDashboardNeedsanAxis,
      });
    }
    if (dashboardType === "project") {
      setStateLower({
        // ...stateLower,
        LowerDashboardisClosed: dashboardIsClosed,
        LowerGraphNeedsAnAxis: ThisDashboardNeedsanAxis,
      });
    }

    if (stateLower.LowerDashboardisClosed && !stateUpper.UpperDashboardisClosed) {
      if (stateUpper.UpperGraphNeedsAnAxis) {
        setShowAxis((c) => true);
      } else {
        setShowAxis((c) => false);
      }
    } else if (stateUpper.UpperDashboardisClosed && !stateLower.LowerDashboardisClosed) {
      if (stateLower.LowerGraphNeedsAnAxis) {
        setShowAxis((c) => true);
      } else {
        setShowAxis((c) => false);
      }
    } else {
      setShowAxis((c) => false);
    }
  };
  const updateTimeAxis = (startTime, endTime) => {};

  console.log(stateLower.LowerDashboardisClosed, stateLower.LowerDashboardisClosed, "lower, upper");

  const boxClass =
    !stateLower.LowerDashboardisClosed || !stateUpper.UpperDashboardisClosed === true
      ? "dashboardsOpenClass"
      : "dashboardClosedClass";

  return (
    <div className={`dashboardBox ${boxClass}`}>
      <DashboardGraph
        showAxis={showAxisFunc}
        updateTimeAxis={updateTimeAxis}
        graphs={{
          "BY USER": <TokenGraph currentView="BY USER" />,
          "BY ALL": <TokenGraph currentView="BY ALL" />,
        }}
        graphsNeedingAxis={["BY USER", "BY ALL"]}
        dashboardType="token"
        dashboardTitle="TOKEN DASHBOARD"
        dashboardDescription="The token dashboard tracks the performance of the portal's token, providing investors perspective on the deployment and earnings history of tokens in circulation."
        optionIcons={{
          "BY USER": byUserIcon,
          "BY ALL": allUsersIcon,
        }}
      />
      {showAxis ? <TimeAxis /> : <div></div>}
      <DashboardGraph
        showAxis={showAxisFunc}
        updateTimeAxis={updateTimeAxis}
        graphs={{
          "LOCATION VIEW": <LocGraphContainer currentView="LOCATION VIEW" />,
          "VOTE VIEW": <VotesGraphContainer currentView="VOTE VIEW" />,
        }}
        graphsNeedingAxis={["VOTE VIEW"]}
        dashboardType="project"
        dashboardTitle="PROJECT DASHBOARD"
        dashboardDescription="The project dashboard tracks the performance of the projects providing investors a comparative framework to provide direction on which investments to focus on."
        optionIcons={{
          "VOTE VIEW": voteViewIcon,
          "LOCATION VIEW": locViewIcon,
        }}
      />
    </div>
  );
};

export default Dashboard;
