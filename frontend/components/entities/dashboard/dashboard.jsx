import React from 'react';
import TokenDashboard from './token_dashboard/token_dashboard_container';
import ProjectDashboard from './project_dashboard/project_dashboard_container';

const Dashboard = () => (
  <div className="box">
    <TokenDashboard />
    <ProjectDashboard />
  </div>
);

export default Dashboard;
