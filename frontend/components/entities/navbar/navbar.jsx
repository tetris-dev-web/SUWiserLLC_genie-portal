import React from 'react';
import TokenInterface from './token_interface';
import Login from './login';

class Navbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  render() {
    if (this.props.currentUser) {
      return <TokenInterface />;
    } else {
      return <Login />;
    }
    //
    // return(<div>
    //   <TokenInterface />
    //   <Login />
    // </div>
    // );


  }
}

export default Navbar;
