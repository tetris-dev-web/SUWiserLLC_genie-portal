import React, { useEffect } from "react";

import TransactionModal from "./entities/transaction_modal/transaction_modal";

import Navbar from "./entities/navbar/navbar_container";
import Dashboard from "./entities/dashboard/dashboard";
import ProjectModalStructure from "./entities/dashboard/project_dashboard/project_modals/project_modal_structure";
import FourOhFourPage from "./404_page/404_page";

import { notifyTransactionCompletion } from "../actions/ui_actions";
import { connect } from "react-redux";
import { updateNetwork } from "../actions/chain_actions/network_actions";
import "./app.scss";
import "./landing/landing.scss";

import InvestorContent from "./investor";

const App = (props) => {
  const {
    provider,
    account,
    history,
    web3,
    updateNetwork,
    notifyTransactionCompletion,
    crowdsaleInstance,
    votingInstance,
    dividendsInstance,
    projectFactoryInstance,
  } = props;

  const setAccount = () => {
    provider.eth.getCoinbase((err, _account) => {
      const account = _account ? _account : false;
      if (account) {
        return provider.eth.getBalance(account).then((balance) => {
          updateNetwork({ account, balance });
        });
      }
    });
  };
  const watchAccountChange = () => {
    web3.currentProvider.on("update", (network) => {
      setAccount();
    });
  };
  const watchProjectPitch = () => {
    projectFactoryInstance.ProjectPitch().watch((error, event) => {
      notifyTransactionCompletion(
        "Your project pitch transaction has been mined to the blockchain.",
      );
    });
  };
  const watchTokenPurchase = () => {
    crowdsaleInstance.TokenPurchase().watch((error, event) => {
      notifyTransactionCompletion(
        "Your token purchase transaction has been mined to the blockchain.",
      );
    });
  };
  const watchVoteChange = () => {
    votingInstance.VoteChange().watch((error, event) => {
      notifyTransactionCompletion("Your votes have been mined to the blockchain");
    });
  };
  const watchReceiveDividends = () => {
    dividendsInstance.ReceiveDividends().watch((error, event) => {
      notifyTransactionCompletion("Your cashflows have been mined to the blockchain");
    });
  };

  useEffect(() => {
    setAccount();
    watchAccountChange();
    watchProjectPitch();
    watchTokenPurchase();
    watchVoteChange();
    watchReceiveDividends();
  }, []);

  if (
    history.location.pathname === "/dashboard/demo" &&
    (!account || account === process.env.DEV_ACCOUNT)
  ) {
    return (
      <FourOhFourPage
        title={"Account 404"}
        description={
          "Please log in to your ethereum account on metamask or use one of our demo accounts."
        }
      />
    );
  } else if (history.location.pathname == "/dashboard/investor") {
    return (
      <div className="rootDiv">
        <InvestorContent />
      </div>
    );
  } else {
    return (
      <div className="rootDiv">
        <TransactionModal />
        <Dashboard />
        <ProjectModalStructure />
        <Navbar />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    eventSubscription: state.network.eventSubscription,
    web3: state.network.web3,
    account: state.network.account,
    web3Provider: state.network.web3Provider,
    projectFactoryInstance: state.network.projectFactoryInstance,
    crowdsaleInstance: state.network.crowdsaleInstance,
    votingInstance: state.network.votingInstance,
    dividendsInstance: state.network.dividendsInstance,
    provider: state.network.provider,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNetwork: (network) => dispatch(updateNetwork(network)),
    notifyTransactionCompletion: (notification) =>
      dispatch(notifyTransactionCompletion(notification)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
