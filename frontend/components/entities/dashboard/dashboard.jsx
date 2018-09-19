import React from 'react';
import TokenDashboardContainer from './token_dashboard/token_dashboard_container';
import ProjectDashboardContainer from './project_dashboard/project_graph_container';
import DrizzleConsumer from '../../drizzle/drizzleConsumer';
import ReadString from './readString';
import ReadStringContainer from './readStringContainer';
<<<<<<< HEAD
import SetString from './setString';
=======
import SetString from './SetString';
>>>>>>> 1a490a6bd4caf9ea921c4b30f174361784e5259d
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
