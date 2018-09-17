import React from 'react';
import TokenDashboardContainer from './token_dashboard/token_dashboard_container';
import ProjectDashboardContainer from './project_dashboard/project_graph_container';
import DrizzleConsumer from '../../drizzle/drizzleConsumer';
import ReadString from './readString';
import ReadStringContainer from './readStringContainer';
<<<<<<< HEAD
=======
import SetString from './SetString';
>>>>>>> 823b62caefe08249d8b48ed6b6f00f3717cfa0fb
import SetString from './setString';
import {drizzleConnect} from 'drizzle-react';
import PropTypes from 'prop-types'

const Dashboard = () => {
  return (
    <div className="box">
      <TokenDashboardContainer />
      <ProjectDashboardContainer />
      <DrizzleConsumer component={ReadString}/>
      <DrizzleConsumer component={SetString}/>
    </div>
  );
}




export default Dashboard;
