import React from 'react';
import TokenDashboardContainer from './token_dashboard/token_dashboard_container';
import ProjectDashboardContainer from './project_dashboard/project_graph_container';

const Dashboard = () => (
  <div className="box">
    <TokenDashboardContainer />
    <ProjectDashboardContainer />
  </div>
);

export default Dashboard;
