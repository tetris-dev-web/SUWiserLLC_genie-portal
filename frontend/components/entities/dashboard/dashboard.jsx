import React from 'react';
import TokenDashboardContainer from './token_dashboard/token_dashboard_container';
import ProjectDashboardContainer from './project_dashboard/project_graph_container';
import DrizzleConsumer from '../../drizzle/drizzleConsumer';
import ReadString from './readString';
import ReadStringContainer from './readStringContainer';
<<<<<<< HEAD
import SetString from './SetString';
=======
import SetString from './setString';
>>>>>>> ChainFrameworkMatt
import {drizzleConnect} from 'drizzle-react';
import PropTypes from 'prop-types';

const Dashboard = () => {
  return (
    <div className="box">
      <TokenDashboardContainer />
      <ProjectDashboardContainer />
      <DrizzleConsumer component={ReadString}/>
      <DrizzleConsumer component={SetString}/>
    </div>
  );
};




export default Dashboard;
