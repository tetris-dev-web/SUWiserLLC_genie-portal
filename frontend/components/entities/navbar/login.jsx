import React from 'react';

class Login extends React.Component {

  render() {
    return (
      <nav className="series navbar-container">
        <div className= "navbar-left">
          <img className="gen-logo" src="https://s3.amazonaws.com/genie-portal-dev/static/logo.png" />
          <div className="genus-dev-dash">
            <div className="gen-dev">GENUS DEVELOPMENT</div>
            <div className="gen-dash">GENIE DASHBOARD</div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Login;




// <div className='login-prompt'>
//   <div className="login-text">Please login with MetaMask</div>
//   {web3 ? <div></div> : <a href="https://metamask.io/" target="_blank" className="metaMask-Button">Download MetaMask</a>}
// </div>
