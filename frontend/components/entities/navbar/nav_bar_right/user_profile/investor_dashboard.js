import React, { useState, useEffect } from "react";
import Loader from "../../../dashboard/loader/loader";
import { merge } from "lodash";

import { connect } from "react-redux";

import { fetchInvestorDividend } from "../../../../../actions/chain_actions/dividends_actions";
import { fetchInvestorPurchaseTotal, fetchInvestorAccountBalance } from "../../../../../actions/chain_actions/token_actions";

const InvestorDashboard = (props) => {
  const { account } = props;

  const [isLoading, setIsLoading] = React.useState(true);
  const [purchaseTotal, setPurchaseTotal] = React.useState(0);
  const [dividend, setDividend] = React.useState(0);
  const [dividendOwned, setDividendOwned] = React.useState(0);
  const [walletBalance, setWalletBalance] = React.useState(0);
  const [ary, setARY] = React.useState(0);

  useEffect(() => {
    fetchInvestorDividend(account).then((amount) => {
      setDividend(Number(amount.dividendAmount));
      setDividendOwned(Number(amount.dividendOwedAmount));
      calcARY();
    });
    fetchInvestorPurchaseTotal(account).then((amount) => {
      setPurchaseTotal(Number(amount.purchaseTotal));
      calcARY();
    });
    
    fetchInvestorAccountBalance(account).then((amount) => {
      setWalletBalance(amount.accountBalance);
    });

  }, [account]);

  const calcARY = () => {
    const earning = dividend + dividendOwned;
    console.log(purchaseTotal);
    if (purchaseTotal > 0) setARY(Math.round(earning * 100 / purchaseTotal));
  }

  return (
    <div className="profile_items">
      {isLoading ? <Loader /> : '' }
      <div className="profile_item">
        <div className={`profile_item_type`}>Total Investments(wei)</div>
        <input
          className={`text-input email-input`}
          type="text"
          value={purchaseTotal}
          disabled
        />        
      </div>
      <div className="profile_item">
        <div className={`profile_item_type`}>Total Earning(wei)</div>
        <input
          className={`text-input email-input`}
          type="text"
          value={dividend + dividendOwned}
          disabled
        />        
      </div>
      <div className="profile_item">
        <div className={`profile_item_type`}>Annual Rental Yield (%)</div>
        <input
          className={`text-input email-input`}
          type="text"
          value={ary}
          disabled
        />        
      </div>
      <div className="profile_item">
        <div className={`profile_item_type`}>Wallent Balance</div>
        <input
          className={`text-input email-input`}
          type="text"
          value={walletBalance}
          disabled
        />        
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
    fetchInvestorDividend: (account) => dispatch(fetchInvestorDividend(account)),
    fetchInvestorPurchaseTotal: (account) => dispatch(fetchInvestorPurchaseTotal(account)),
    fetchInvestorAccountBalance: (account) => dispatch(fetchInvestorAccountBalance(account)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestorDashboard);
