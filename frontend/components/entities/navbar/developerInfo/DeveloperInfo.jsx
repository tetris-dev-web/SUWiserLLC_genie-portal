import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import DevInfoDropdown from "./DevInfoDropdown";
import { setDemoType } from "../../../../actions/ui_actions";

const DeveloperInfo = (props) => {
  const { setDemoType, history } = props;

  const tag = history.location.pathname.split("/").pop();

  const handleClick = () => {
    // console.log('PathName:', pathname);
    setDemoType("");
    history.push("/");
  };

  const DevLogo = () => (
    <div className="DevLogo" onClick={handleClick}>
      <img className="gen-logo" src="https://s3.amazonaws.com/genie-portal-dev/static/logo.png" />
      <div className="genus-dev-dash">
        <div className={`gen-dev ${tag === "demoDeveloper" ? "active" : void 0}`}>
          {" "}
          GENUS DEVELOPMENT{" "}
        </div>
        <div className={`gen-dash ${tag === "demoInvestor" ? "active" : void 0}`}>
          {" "}
          GENIE DASHBOARD{" "}
        </div>
      </div>
    </div>
  );

  return (
    <div className="navbar-left">
      <DevLogo />
      <DevInfoDropdown />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDemoType: (demoType) => dispatch(setDemoType(demoType)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(DeveloperInfo));
