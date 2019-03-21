import React from 'react';

import Login from './login';
import UserDropdown from './user_dropdown/user_dropdown';
import BuyFormModal from './buy_form/buy_form_modal';
import ProjectFormModal from './project_form/project_form_modal';
import DeveloperInfo from './developerInfo/DeveloperInfo';

import './navbar.scss';

class Navbar extends React.Component {

  render() {
    const LoggedInNavbar = () => (
      <nav className="series navbar-container">
        <DeveloperInfo />
        <div className="navbar-right">
          <UserDropdown/>
          <BuyFormModal />
          <ProjectFormModal />
        </div>
      </nav>
    )

    if (this.props.account) {
      return <LoggedInNavbar />;
    } else {
      return <Login/>;
    }

  }
}

export default Navbar;
