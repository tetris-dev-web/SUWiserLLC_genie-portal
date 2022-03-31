import React from "react";
import { withRouter } from "react-router";

const DemoOptions = (props) => {
  const { history } = props;

  const handleClick = (demoType) => {
    history.push(`/dashboard/${demoType}`);
  };

  return (
    <div className="demo_options">
      <DashBoardOption
        userDisplay={"demo investor dashboard"}
        navigateToDashBoard={() => handleClick("demoInvestor")}
      />
      <DashBoardOption
        userDisplay={"demo developer dashboard"}
        navigateToDashBoard={() => handleClick("demoDeveloper")}
      />
      <DashBoardOption
        userDisplay={"investor dashboard(new)"}
        navigateToDashBoard={() => handleClick("investor")}
      />
    </div>
  );
};

const DashBoardOption = ({ userDisplay, navigateToDashBoard }) => {
  return (
    <div className="bounceOnHover demo_option">
      <p onClick={navigateToDashBoard}>{`${userDisplay}`}</p>
    </div>
  );
};

export default withRouter(DemoOptions);

// <DashBoardOption userDisplay={'demo with your own account'} navigateToDashBoard={() => this.handleClick('demo')}/>
