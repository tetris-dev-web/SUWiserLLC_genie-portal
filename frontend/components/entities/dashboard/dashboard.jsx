import React from 'react';
import TokenDashboardContainer from './token_dashboard/token_dashboard_container';
import ProjectDashboardContainer from './project_dashboard/project_dashboard_container';
import PropTypes from 'prop-types';
import CurrentVotingCycle from './project_dashboard/votes_view/current_voting_cycle';


const Dashboard = () => {
  return (
    <div className="box">
      <TokenDashboardContainer />
      <ProjectDashboardContainer />
    </div>
  );
};




export default Dashboard;
