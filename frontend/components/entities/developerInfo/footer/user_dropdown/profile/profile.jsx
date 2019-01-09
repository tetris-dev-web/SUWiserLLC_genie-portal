import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      email: '',
      zipcode: '',
      first_name: '',
      last_name: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return (e) => {
      e.preventDefault();
      this.setState({ [property]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    let stateUsername = this.state.username;
    let propsUsername = this.props.currentUser.username;

    let parsedUsername = this.props.currentUser.username;

    if (this.state.email && this.state.email.includes('@') && stateUsername !== propsUsername) {
      parsedUsername = this.state.email.match(/^([^@]*)@/)[1];
    }

    /*
    Again, we use regex to truncate the username from the email,
    but we check to see if the updated username piece of state differs from
    the props username so it is only updated if they differ.
    */

    let updatedUser = {
      id: this.state.id,
      email: this.state.email,
      // password: (this.state.password.length > 6) ? this.state.password : "",
      password: this.state.password,
      zipcode: this.state.zipcode,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    };

    this.props.updateUser(updatedUser).then(() => {
      this.props.updateUsernameDisplay(updatedUser);
      // $("#dropdown-container").removeClass('dropdown open').addClass('dropdown');
    });
  }

  /*
  After we updated the user on the backend, we update the user's display
  name on the underlying Navbar Component before closing the modal
  */

  componentDidMount() {
    let updatedUser = this.props.currentUser;

    // used an empty '' so that it doesn't return null for the value
    this.setState({
      id: updatedUser.id || '',
      email: updatedUser.email || '',
      zipcode: updatedUser.zipcode || '',
      first_name: updatedUser.first_name || '',
      last_name: updatedUser.last_name || ''
    });
  }

  // ComponentWillReceiveProps() {
  //   let updatedUser = this.props.currentUser;
  //
  //   this.setState({
  //     id: updatedUser.id,
  //     email: updatedUser.email,
  //     zipcode: updatedUser.zipcode,
  //     first_name: updatedUser.first_name,
  //     last_name: updatedUser.last_name
  //   });
  // }


  /*
  We use the componentWillMount lifecycle method to autopopulate the profile
  update fields to reflect any changes they may have just made by fetching the
  current user from the backend and returning the most up-to-date data.
  */

  render() {

    let { email, password, zipcode, first_name, last_name } = this.state;

    return(
      <form className="profile-form-box">
        <input
          type="text"
          placeholder="email"
          autoComplete="new-email"
          value={email}
          onChange={this.update('email')}
          className="profile-input"
          />
        <br/>
        <input
          type="password"
          placeholder="password"
          autoComplete="new-password"
          value={password}
          onChange={this.update('password')}
          className="profile-input"
          />
        <br/>
        <input
          type="zipcode"
          placeholder="zipcode"
          autoComplete="new-zipcode"
          value={zipcode}
          onChange={this.update('zipcode')}
          className="profile-input"
          />
        <br/>
        <input
          type="first_name"
          placeholder="first name"
          autoComplete="new-first_name"
          value={first_name}
          onChange={this.update('first_name')}
          className="profile-input"
          />
        <br/>
        <input
          type="last_name"
          placeholder="last name"
          autoComplete="new-last_name"
          value={last_name}
          onChange={this.update('last_name')}
          className="profile-input"
          />
        <br/>
        <input
          type="submit"
          value="update"
          className="submit-button"
          onClick={this.handleSubmit}/><br/>
      </form>
    );
  }
}

export default Profile;
