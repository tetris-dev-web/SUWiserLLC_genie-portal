import React from "react";
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
// import {DrizzleContext} from 'drizzle-react';
import TransactionNotifications from "./entities/notifications/notifications";
import Landing from "./landing/landing";
import App from "./app";
import FourOhFourPage from "./404_page/404_page";
import "./root.scss";

const Root = (props) => {
  const { store, window, networkVersion } = props;
  // console.log('networkVersion=', networkVersion);
  // console.log('store', store);
  // console.log("window", window);

  const RootApplication = () => {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="standardDiv" style={{ height: "100%" }}>
            <TransactionNotifications />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard/:userType" component={App} />
          </div>
        </HashRouter>
      </Provider>
    );
  };
  if (window.web3 && networkVersion === "3") {
    return <RootApplication />;
  } else {
    const web3 = window.web3;
    return (
      <FourOhFourPage
        title={web3 ? "Network Error" : "Web3 404"}
        description={
          web3
            ? "Please select the Ropsten network to continue. You may need to refresh"
            : "Unable to connect to your web3 provider. Please download Metamask to continue. You may need to refresh"
        }
        additionalContent={
          web3 ? (
            <div></div>
          ) : (
            <a href="https://metamask.io/" target="_blank" className="metaMask-Button">
              {web3 ? "" : "Download MetaMask"}
            </a>
          )
        }
      />
    );
  }
};

export default Root;
