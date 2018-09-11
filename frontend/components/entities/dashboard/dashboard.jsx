import React from 'react';
import TokenDashboard from './token_dashboard/token_dashboard_container';
import ProjectGraph from './project_dashboard/project_graph_container';

const Dashboard = () => (
  <div className="box">
    <TokenDashboard />
    <ProjectGraph />
  </div>
);

export default Dashboard;
