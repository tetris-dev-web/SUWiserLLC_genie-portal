import React from 'react';
import './transfer.scss';
import { connect } from 'react-redux';
import { buyTokens, buyTokensWithDemoInvestor } from '../../../../../actions/chain_actions/token_actions';
import { updateTransactionModal } from  '../../../../../actions/ui_actions';

const mapStateToProps = state => {
  return {
    account: state.network.account,
    crowdsale: state.network.crowdsaleInstance,
    inactiveTokenInstace: state.network.inactiveTokenInstace
  }
}

const mapDipsatchToProps = dispatch => {
  return {
    buyTokens: (crowdsale, account, wei) => buyTokens(crowdsale, account, wei),
    buyTokensWithDemoInvestor: wei => buyTokensWithDemoInvestor(wei),
    updateTransactionModal: modalInfo => dispatch(updateTransactionModal(modalInfo))
  }
}

class BuyForm extends React.Component {
  constructor() {
    super();

    this.state = {
      shares: 0,
      price: 78,
      value: 0,
      bylaw_agreement: false
    };

    this.toggleBylawAgreement = this.toggleBylawAgreement.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeTransactionModal = this.closeTransactionModal.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value,
        value: e.currentTarget.value * this.state.price
      });
    };
  }

  toggleBylawAgreement() {
    this.setState({bylaw_agreement: !this.state.bylaw_agreement});
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.buyTokens(
    //   this.props.crowdsale,
    //   this.props.account,
    //   this.state.shares
    // );

    let title;
    let message;

    if (this.state.shares <= 80) {
      title = "YOUR TRANSACTION HAS BEEN SENT";
      message = "It may take a few minutes for your transaction to be processed by the blockchain."
      this.props.buyTokensWithDemoInvestor(this.state.shares);
      this.props.closeModal();
    } else {
      title = "TRANSACTION REJECTED";
      message = "For this demo, we limit token purchases to 80 wei. Please try again with a smaller wei amount."
    }

    this.props.updateTransactionModal({
      isOpen: true,
      title,
      message
    });
  }

  closeTransactionModal () {
    this.setState({
      transactionModalOpen: false
    })
  }

  render() {
    const { shares, price, value, bylaw_agreement } = this.state;

    return (
      <form className="form-box">
        <div className="price-breakdown">
          <div className="transfer-input-cont">
            <input
              type="number"
              placeholder="#| of shares"
              value={shares}
              className="transfer-input"
              onChange={this.update('shares')}
            />
          </div>
          <div className="transfer-price">$|{price}</div>
          <div className="transfer-value">$|{value}</div>
        </div>
        <div className="price-breakdown-labels">
          <div className="t-filler"></div>
          <div className="t-price-label">price</div>
          <div className="t-value-label">value</div>
        </div>
        <div className="t-checkbox-cont">
          <input
            className="t-checkbox"
            type="checkbox"
            checked={bylaw_agreement}
            onChange={this.toggleBylawAgreement} />
          <p className="t-checkbox-text">I certify that I have read and agreed to <a href="#" className="link">the bylaws</a>.</p>
        </div>
        <div className="transfer-button-cont">
          <input
            type="submit"
            value="buy"
            className="transfer-button"
            onClick={this.handleSubmit} />
        </div>
        <div className="blue-close-modal-button close-modal-button"
          onClick={this.props.closeModal}>&times;</div>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDipsatchToProps)(BuyForm);
