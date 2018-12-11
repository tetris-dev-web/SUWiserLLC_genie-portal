import React from 'react';
import TokenDashboardContainer from './token_dashboard/token_dashboard_container';
import ProjectDashboardContainer from './project_dashboard/project_dashboard_container';
import DrizzleConsumer from '../../drizzle/drizzleConsumer';
import {drizzleConnect} from 'drizzle-react'; //remove?
import PropTypes from 'prop-types';

const Dashboard = () => {
  return (
    <div className="box">
      <TokenDashboardContainer />
      <ProjectDashboardContainer />
    </div>
  );
};




export default Dashboard;
