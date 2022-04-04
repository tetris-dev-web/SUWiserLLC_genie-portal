import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from './cards/card';
import DashboardDetails from './details';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { fetchSharedProjectGraphData } from "../../../actions/chain_actions/project_actions";

const Dashboard = (props) => {
  const { account, fetchSharedProjectGraphData } = props;

  const [isLoading, setIsLoading] = React.useState(true);
  const [countAssets, setCountAssets] = React.useState(0);
  const [assetList, setAssetList] = React.useState({});

  useEffect(() => {
    // Fetch Project Data
    fetchSharedProjectGraphData().then((projectGraphData) => {
      setCountAssets(Object.keys(projectGraphData.projects).length);
      setAssetList(projectGraphData.projects);
      setIsLoading(false);
    });

  }, [account]);

  return (
    <Grid container spacing={3}>
      {/* Total Assets */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Card 
            title = "Total Assets Invested"
            amount = {countAssets + " Assets"}
          />
        </Paper>
      </Grid>

      {/* Total Investments */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Card
            title = "Total Investments Value"
            amount = "$356,000"
          />
        </Paper>
      </Grid>   

      {/* Total Earnings */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Card
            title = "Total Earnings"
            amount = "$23,000"
          />
        </Paper>
      </Grid>  

      {/* Details */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <DashboardDetails
            assetList = {assetList}
          />
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSharedProjectGraphData: () => dispatch(fetchSharedProjectGraphData()),
  };
};

const mapStateToProps = (state) => {

  return {
    //token related props
    crowdsale: state.network.crowdsaleInstance,
    account: state.network.account,
    //projects related props
    web3: state.network.web3,
    crowdsaleInstance: state.network.crowdsaleInstance,
    projectContract: state.network.projectContract,
    projectFactoryInstance: state.network.projectFactoryInstance,
    capitalBeingRaised: state.chain_data.capitalBeingRaised, //undefined
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
