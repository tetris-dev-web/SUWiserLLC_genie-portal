import React from 'react';

import Login from './login';
import UserDropdown from './user_dropdown/user_dropdown';
import BuyFormModal from './buy_form/buy_form_modal';
import ProjectFormModal from './project_form/project_form_modal';
import DeveloperInfo from './developerInfo/DeveloperInfo';

import './navbar.scss';

class Navbar extends React.Component {

  render() {
    console.log('.....')
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

      return <LoggedInNavbar />;

  }
}

export default Navbar;
// if (this.props.account) {
// } else {
//   return <Login/>;
// }



// import React from 'react';
// import TokenInterface from './token_interface';
// import Login from './login';
// import './navbar.scss';

// class Navbar extends React.Component {
//
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       modalOpen: false
//     };
//   }
//
//   render() {
//
//
//   }
// }
//
// export default Navbar;

// if (this.props.account) {
//   return <TokenInterface />;
// } else {
//   return <Login/>;
// }
// //
// return(<div>
//   <TokenInterface />
//   <Login />
// </div>
// );
