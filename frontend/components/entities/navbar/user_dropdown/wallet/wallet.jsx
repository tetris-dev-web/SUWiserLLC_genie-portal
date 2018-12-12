import React from 'react';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newWalletID: ''
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return(e) => {
      e.preventDefault();
      this.setState({ [property]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    // $("#dropdown-container").removeClass('dropdown open').addClass('dropdown');
    // console.log('New Wallet ID', this.state.newWalletID);
    let updatedUser = {
      id: this.props.currentUser.id,
      email: this.props.currentUser.email,
      // password: (this.state.password.length > 6) ? this.state.password : "",
      password: this.props.currentUser.password,
      zipcode: this.props.currentUser.zipcode,
      first_name: this.props.currentUser.first_name,
      last_name: this.props.currentUser.last_name
    };

    this.props.updateUser(updatedUser).then(() => {
      this.setState({newWalletID: ''})
      // this.props.updateUsernameDisplay(updatedUser);
      // $("#dropdown-container").removeClass('dropdown open').addClass('dropdown');
    });
  }

  render() {
    return(
      <form className="wallet-form">
        <div className="wallet current-wallet">
          <p className="wallet-label current-wallet-label">current wallet</p>
        </div>
        <div className="wallet integrate-wallet">
          <p className="wallet-label integrate wallet-label">integrate new wallet</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="################"
              onChange={ this.update('newWalletID') }
              className="wallet-id integrate-wallet-input"/>
            <button
              type="submit"
              onClick={ this.handleSubmit }>
              <img className="wallet-submit" src="https://s3.amazonaws.com/genie-portal-dev/static/wallet.svg" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Wallet;
