import React from 'react';
import SessionFormContainer from '../../session/session_form_container';

class Login extends React.Component {

  render() {
    return (
      <nav className="series navbar-container">
        <div className= "navbar-left">
          <img className="gen-logo" src="https://s3.amazonaws.com/temp-genie-portal/GDCoin.png" />
          <div className="genus-dev-dash">
            <div className="gen-dev">GENUS DEVELOPMENT</div>
            <div className="gen-dash">GENIE DASHBOARD</div>
          </div>
        </div>
        <div className="navbar-right">
          <SessionFormContainer type="Log In"/>
          <SessionFormContainer type="Sign Up"/>
        </div>
      </nav>
    );
  }
}

export default Login;
