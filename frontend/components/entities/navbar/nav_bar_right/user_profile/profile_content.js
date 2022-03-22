import React, { useState, useEffect } from "react";
import {
  fetchTokenBalances,
  fetchDemoInvestorBalances,
  collectDemoInvestorDividend,
} from "../../../../../actions/chain_actions/token_actions";
import { activateDemoInvestorPending } from "../../../../../actions/chain_actions/dividends_actions";
import { connect } from "react-redux";
import { merge } from "lodash";
import Loader from "../../../dashboard/loader/loader";

const ProfileContent = (props) => {
  const { inactiveTokenInstance, activeTokenInstance, account, dividendsInstance, balance } = props;

  const [state, setState] = React.useState({
    account: "",
    ETH: "",
    "GNI (vesting)": "",
    "GNI (pending)": 0,
    "GNI (active)": "",
    "Dividend Owed": 0,
  });

  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // this.props.fetchTokenBalances(inactiveTokenInstance, activeTokenInstance, account).then(balances => {
    //   const { totalActive, totalInactive, accountActive, accountTotal } = balances;
    //   this.setState({
    //     totalActive: Number(totalActive),
    //     totalInactive: Number(totalInactive),
    //     accountActive: Number(accountActive),
    //     accountTotal: Number(accountTotal)
    //   })
    // });
    fetchDemoInvestorBalances().then((balances) => {
      const {
        accountActive,
        accountInactive,
        accountPending,
        accountDividend,
        account,
        accountBalance,
      } = balances;

      console.log(balances, "sup");
      setIsLoading(false);
      
      const newState = merge({}, state, {
        account,
        ETH: Number(accountBalance),
        "GNI (vesting)": Number(accountInactive),
        "GNI (pending)": Number(accountPending),
        "GNI (active)": Number(accountActive),
        "Dividend Owed": Number(accountDividend),
      });
      setState(newState);
    });
    watchTransfer(inactiveTokenInstance);
    watchTransfer(activeTokenInstance);
    // this.watchDividendCollection();
    // this.watchTokenActivation();
  }, []);

  useEffect(() => {
    const newState = merge({}, state, { ETH: balance });
    setState(newState);
  }, [balance]);

  const activateTokens = () => {
    inactiveTokenInstance.activateDemoInvestorPending();
  };

  const collectDividend = () => {
    dividendsInstance.collectDemoInvestorDividend();
  };

  const watchTransfer = (token) => {
    token.Transfer().watch((error, event) => {
      let newState = merge({}, state);
      const value = Number(event.args.value);
      if (event.args.from === "0x0000000000000000000000000000000000000000") {
        if (token === inactiveTokenInstance) {
          newState = merge({}, newState, { totalInactive: state.totalInactive + value });
        } else {
          newState = merge({}, newState, { totalActive: state.totalActive + value });
        }
      }

      if (event.args.to === "0x0000000000000000000000000000000000000000") {
        if (token === inactiveTokenInstance) {
          newState = merge({}, newState, { totalInactive: state.totalInactive - value });
        } else {
          newState = merge({}, newState, { totalActive: state.totalActive - value });
        }
      }

      if (event.args.to === account) {
        if (token === inactiveTokenInstance) {
          newState = merge({}, newState, { accountInactive: state.accountInactive + value });
        } else {
          newState = merge({}, newState, { totalAactive: state.accountActive + value });
        }
      }

      if (event.args.from === account) {
        if (token === inactiveTokenInstance) {
          newState = merge({}, newState, { accountInactive: state.accountInactive - value });
        } else {
          newState = merge({}, newState, { totalAactive: state.accountActive - value });
        }
      }

      setState(newState);
    });
  };

  const watchDividendCollection = () => {
    dividendsInstance.DividendCollection().watch((error, event) => {
      if (event.args.account === account) {
        //we need to populate state with the correct account (hardcode for demo)
        const newState = merge({}, state, { "Dividend Owed": 0 });
        setState(newState);
      }
    });
  };

  const watchTokenActivation = () => {
    inactiveTokenInstance.TokenActivation().watch((error, event) => {
      if (event.args.account === account) {
        const newState = merge({}, state, {
          "GNI (pending)": 0,
          "GNI (active)": state["GNI (active)"] + event.args.amount,
        });
        setState(newState);
      }
    });
  };

  const userInfo = Object.keys(state).map((item, idx) => {
    const content =
      item === "GNI (pending)" || item === "Dividend Owed" ? (
        <div className="profile_item_right">
          <div className="profile_item_content">{`${state[item]}`}</div>
          <div
            className="profile_item_button"
            onClick={item === "GNI (pending)" ? activateTokens : collectDividend}
          >
            {state[item] > 0 ? `${item === "GNI (pending)" ? "acitvate" : "collect"}` : ""}
          </div>
        </div>
      ) : (
        <div className="profile_item_content">{`${state[item]}`}</div>
      );

    return (
      <div key={idx} className="profile_item">
        <div className="profile_item_type">{`${item}`}</div>
        {content}
      </div>
    );
  });

  return (
    <div className="profile_items">
      {isLoading ? <Loader /> : '' }
      {userInfo}
    </div>
  );
};
// {
//   item === "GNI (pending)" || item === "Dividend Owed" ?
//   <div className='profile_item_button'>{`${item === "GNI (pending)" ? "acitvate tokens" : "collect dividend"}`}</div> :
//   <div></div>
// }

const mapStateToProps = (state) => {
  return {
    inactiveTokenInstance: state.network.inactiveTokenInstance,
    activeTokenInstance: state.network.activeTokenInstance,
    dividendsInstance: state.network.dividendsInstance,
    account: state.network.account,
    balance: state.network.balance,
    // tokenBalances: state.chain_data.tokenBalances,
    fetchTokenBalances: (inactiveTokenInstance, activeTokenInstance, account) =>
      fetchTokenBalances(inactiveTokenInstance, activeTokenInstance, account),
    fetchDemoInvestorBalances: () => fetchDemoInvestorBalances(),
    collectDemoInvestorDividend: () => collectDemoInvestorDividend(),
    activateDemoInvestorPending: () => activateDemoInvestorPending(),
  };
};

export default connect(mapStateToProps)(ProfileContent);
