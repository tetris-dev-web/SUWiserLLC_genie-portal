import React from 'react';
import { withRouter } from 'react-router';
import NavBarRight from './nav_bar_right/nav_bar_right'
import DeveloperInfo from './developerInfo/DeveloperInfo';

import './navbar.scss';

class Navbar extends React.Component {

  render() {
    const pathname = this.props.history.location.pathname;
    console.log(pathname, 'pathname')
    const LoggedInNavbar = () => (
      <nav className="series navbar-container">
        <DeveloperInfo />
        {
          pathname.length > 1 ?
            <NavBarRight pathname={pathname}/> :
            <div></div>
        }
      </nav>
    );

    // if (this.props.account) {
    //   return <LoggedInNavbar />;
    // } else {
    //   return <Login/>;
    // }

      return <LoggedInNavbar />;


  }
}

export default withRouter(Navbar);

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
