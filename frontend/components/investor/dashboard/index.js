import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from './cards/card';
import DashboardDetails from './details';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { fetchSharedProjectGraphData } from "../../../actions/chain_actions/project_actions";
import { fetchInvestorSummary } from "../../../actions/chain_actions/dividends_actions";
import { showCurrencyValue } from "../../../util/function_util";

const Dashboard = (props) => {
  const { account, fetchSharedProjectGraphData, currency} = props;

  const [isLoading, setIsLoading] = React.useState(false);
  const [countAssets, setCountAssets] = React.useState(0);
  const [purchaseTotal, setPurchaseTotal] = React.useState(0);
  const [earningTotal, setEarningTotal] = React.useState(0);
  const [assetList, setAssetList] = React.useState({});
  const [walletBalance, setWalletBalance] = React.useState(0);

  let taskCount = 0;

  useEffect(() => {
    setIsLoading(true);

    // Fetch Project Data
    console.log('fetch graph');
    fetchSharedProjectGraphData().then((projectGraphData) => {
      setCountAssets(Object.keys(projectGraphData.projects).length);
      setAssetList(projectGraphData.projects);

      taskComplete();
    });

    // Fetch Investor Summary
    console.log('fetch summary : ' + account);
    fetchInvestorSummary(account).then((summary) => {
      setEarningTotal(Number(summary.dividend) + Number(summary.dividendOwed));
      setWalletBalance(summary.accountBalance);
      setPurchaseTotal(Number(summary.purchaseTotal));

      taskComplete();
    });

  }, [account]);

  const taskComplete = () => {
    taskCount ++;
    if (taskCount == 2) setIsLoading(false);
  }

  return (
    <Grid container spacing={2}>
      {/* Total Assets */}
      <Grid item xs={12} md={3} lg={3}>
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
      <Grid item xs={12} md={3} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Card
            title = "Total Investments Value"
            amount = {showCurrencyValue(purchaseTotal, currency)}
          />
        </Paper>
      </Grid>   

      {/* Total Earnings */}
      <Grid item xs={12} md={3} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Card
            title = "Total Earnings"
            amount = {showCurrencyValue(earningTotal, currency)}
          />
        </Paper>
      </Grid>

      {/* Wallet Balance */}
      <Grid item xs={12} md={3} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Card
            title = "Wallet Balance"
            amount = {showCurrencyValue(walletBalance, currency)}
          />
        </Paper>
      </Grid>  

      {/* Details */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <DashboardDetails
            assetList = {assetList}
            setLoading = {setIsLoading}
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
    fetchInvestorSummary: (account) => dispatch(fetchInvestorSummary(account)),
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
    currency: state.settings.currency
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);