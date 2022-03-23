import React, { useState, useEffect } from "react";
import Loader from "../../../dashboard/loader/loader";
import { merge } from "lodash";

import { connect } from "react-redux";

import { fetchInvestorSummary } from "../../../../../actions/chain_actions/dividends_actions";

const InvestorDashboard = (props) => {
  const { account } = props;

  const [isLoading, setIsLoading] = React.useState(true);
  const [purchaseTotal, setPurchaseTotal] = React.useState(0);
  const [dividend, setDividend] = React.useState(0);
  const [dividendOwned, setDividendOwned] = React.useState(0);
  const [walletBalance, setWalletBalance] = React.useState(0);
  const [ary, setARY] = React.useState(0);

  useEffect(() => {
    fetchInvestorSummary(account).then((summary) => {
      setDividend(Number(summary.dividend));
      setDividendOwned(Number(summary.dividendOwed));
      setWalletBalance(summary.accountBalance);
      setPurchaseTotal(Number(summary.purchaseTotal));

      const earning = Number(summary.dividend) + Number(summary.dividendOwed);
      if (Number(summary.purchaseTotal) > 0) setARY(Math.round(earning * 100 / Number(summary.purchaseTotal)));

      setIsLoading(false);
    });

  }, [account]);

  return (
    <div className="profile_items">
      {isLoading ? <Loader /> : '' }
      <div className="profile_item">
        <div className={`profile_item_type`}>Total Investments (wei)</div>
        <span className="profile_item_value">{new Intl.NumberFormat().format(purchaseTotal)}</span>
      </div>
      <div className="profile_item">
        <div className={`profile_item_type`}>Total Earning (wei)</div>
        <span className="profile_item_value">{new Intl.NumberFormat().format(dividend + dividendOwned)}</span>
      </div>
      <div className="profile_item">
        <div className={`profile_item_type`}>Annual Rental Yield (%)</div>
        <span className="profile_item_value">{new Intl.NumberFormat().format(dividend + ary)}</span>
      </div>
      <div className="profile_item">
        <div className={`profile_item_type`}>Wallent Balance (wei)</div>
        <span className="profile_item_value">{new Intl.NumberFormat().format(dividend + walletBalance)}</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.network.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchInvestorSummary: (account) => dispatch(fetchInvestorSummary(account)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestorDashboard);
