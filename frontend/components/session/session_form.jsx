import React from 'react';
import { withRouter } from 'react-router-dom';
import './session_form.scss';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      bylaw_agreement: false,
      errors: props.errors
    };

  }


  render() {
    return (
      <div className='session-form'>
        <div className="login-text">Please login with MetaMask</div>
        <a href="https://metamask.io/" target="_blank" className="metaMask-Button">Download MetaMask</a>
      </div>
    )
  }
}

export default withRouter(SessionForm);
