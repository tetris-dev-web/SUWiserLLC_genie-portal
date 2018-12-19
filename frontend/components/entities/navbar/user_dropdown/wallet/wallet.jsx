import React from 'react';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newWalletID: ''
    };

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
    $("#dropdown-container").removeClass('dropdown open').addClass('dropdown');
    console.log('New Wallet ID', this.state.newWalletID);
  }

  render() {

    let { newWalletID } = this.state;
    return(
      <form className="wallet-form">
        <div className="wallet current-wallet">
          <p className="wallet-label current-wallet-label">current wallet</p>
          <div className="wallet-id current-wallet-id">#889341hdaf7g759g0440g</div>
        </div>
        <div className="wallet integrate-wallet">
          <p className="wallet-label integrate wallet-label">integrate new wallet</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="################"
              value={ newWalletID }
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
