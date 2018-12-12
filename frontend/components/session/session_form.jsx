import React from 'react';
import { withRouter } from 'react-router-dom';
// import PasswordResetModal from './password_reset_container';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      public_key: '',
      bylaw_agreement: false,
      errors: props.errors
    };

    this.renderErrors = this.renderErrors.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/dashboard');
    }
  }

  update(property) {
    return (e) => {
      e.preventDefault();
      this.setState({ [property]: e.currentTarget.value });
    };
  }


  renderErrors() {
    let currentErrors;
    if (this.props.errors) {
      if (typeof this.props.errors === "object") {
        currentErrors = this.props.errors;
        for (const errType in currentErrors) {
          return(
            <ul className="errors">
              <li>
                {`${errType} ${currentErrors[errType]}`}
              </li>
            </ul>
          );
        }
      } else {
        currentErrors = this.props.errors;
        return(
          <ul className="errors">
            <li>
              {currentErrors}
            </li>
          </ul>
        );
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.clearSessionErrors();

    let parsedUsername = '';

    if (this.state.email && this.state.email.includes('@')) {
      parsedUsername = this.state.email.match(/^([^@]*)@/)[1];
    }

    /*
    since the user does not input a username upon signup, we use
    regex to truncate the username from the user's email address
    */

    const user = {
      email: this.state.email,
      username: parsedUsername,
      password: this.state.password,
      public_key: this.state.public_key,
      bylaw_agreement: this.state.bylaw_agreement
    };


    if (this.props.type === "Log In") {
      // this.props.login(user);
      this.props.login({email: user.email, password: user.password});
    } else {
      this.props.signup(user);
    }
  }

  toggleCheckboxChange() {
    this.setState({ bylaw_agreement: !this.state.bylaw_agreement });
  }

  render() {

    let { email, password, bylaw_agreement, public_key } = this.state;

    if (this.props.type === "Log In") {
      return(
        <form className="form-box">
          {this.renderErrors()}
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={this.update('email')}
            className="session-input" />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={this.update('password')}
            className="session-input" />
          <input
            type="submit"
            value="Log In"
            className="submit-button"
            onClick={this.handleSubmit} />
          <div className="blue-close-modal-button close-modal-button"
            onClick={this.props.closeModal}>&times;</div>
        </form>
      );
    } else {
      return(
        <form className="form-box">
          {this.renderErrors()}
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={this.update('email')}
            className="session-input" />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={this.update('password')}
            className="session-input" />
            <input
              type="text"
              placeholder="public key"
              value={public_key}
              onChange={this.update('public_key')}
              className="session-input" />
          <div className="checkbox-container">
            <input
              className="checkbox"
              type="checkbox"
              checked={bylaw_agreement}
              onChange={this.toggleCheckboxChange} />
            <p className="checkbox-text"> In applying for a membership interest, I certify that I have read and agreed to <a href="#" className="link">the bylaws</a> and that I have a direct relationship to those in the club.</p>
          </div>
          <input
            className="submit-button"
            type="submit"
            value="Apply"
            onClick={this.handleSubmit}/>
          <p className="confirmed">If confirmed, you will receive a confirmation email with your wallet address and further instructions.</p>
            <div className="blue-close-modal-button close-modal-button"
              onClick={this.props.closeModal}>&times;</div>
        </form>
      );
    }
  }
}

export default withRouter(SessionForm);


{/*
  original error rendering

  renderErrors() {
  return(
  <ul className="errors">
  {this.props.errors.map((error, i) => (
  <li key={`error-${i}`}>
  {error}
  </li>
  ))}
  </ul>
  );
  }
  */}
