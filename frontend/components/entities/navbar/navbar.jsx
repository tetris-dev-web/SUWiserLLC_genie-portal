import React from "react";
import { withRouter } from "react-router";
import NavBarRight from "./nav_bar_right/nav_bar_right";
import DeveloperInfo from "./developerInfo/DeveloperInfo";

import "./navbar.scss";

const Navbar = (props) => {
  const { history } = props;
  const pathname = history.location.pathname;

  console.log(pathname, "pathname");

  const LoggedInNavbar = () => (
    <nav className="series navbar-container">
      <DeveloperInfo />
      {pathname.length > 1 ? <NavBarRight pathname={pathname} /> : <div></div>}
    </nav>
  );

  return <LoggedInNavbar />;
};

export default withRouter(Navbar);
