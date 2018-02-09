import React from 'react';
// import PasswordResetModal from './password_reset_container';

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

    this.renderErrors = this.renderErrors.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentWillUnmount() {
  //   this.props.clearSessionErrors();
  // }

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
      // username: parsedUsername,
      password: this.state.password,
      bylaw_agreement: this.state.bylaw_agreement
    };


    if (this.props.type === "Log In") {
      this.props.login(user);
    } else {
      this.props.signup(user);
    }
  }

  toggleCheckboxChange() {
    this.setState({ bylaw_agreement: !this.state.bylaw_agreement });
  }

  render() {
    debugger
    let { email, password, bylaw_agreement } = this.state;

    if (this.props.type === "Log In") {
      return(
        <form className="session-form-box">
          {this.renderErrors()}
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={this.update('email')}
            className="session-input" />
          <br/>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={this.update('password')}
            className="session-input" />
          <br/>
          <input
            type="submit"
            value="Log In"
            className="submit-button"
            onClick={this.handleSubmit} />
          <br/>
        </form>
      );
    } else {
      return(
        <form className="session-form-box">
          {this.renderErrors()}
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={this.update('email')}
            className="session-input" />
          <br/>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={this.update('password')}
            className="session-input" />
          <br/>
          <div className="checkbox-container">
            <input
              className="checkbox"
              type="checkbox"
              checked={bylaw_agreement}
              onChange={this.toggleCheckboxChange} />
            <p className="checkbox-text"> In applying for a membership interest, I certify that I have read and agreed to <a href="#" className="link">the bylaws</a> and that I have a direct relationship to those in the club.</p>
            <br/>
          </div>
          <input
            className="submit-button"
            type="submit"
            value="Apply"
            onClick={this.handleSubmit}/>
          <br/>
          <p className="confirmed">If confirmed, you will receive a confirmation email with your wallet address and further instructions.</p>
        </form>
      );
    }
  }
}

export default SessionForm;


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
