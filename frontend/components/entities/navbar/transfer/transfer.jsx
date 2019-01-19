/*jshint esversion: 6 */

import React from 'react';

class Transfer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shares: 0,
      price: 78,
      project: '',
      bylaw_agreement: false,
      receivingWallet: '',
      fromOption: '',
      toOption: '',
      fromDisabled: false,
      toDisabled: true
    };

    this.toggleBylawAgreement = this.toggleBylawAgreement.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    const {drizzle} = this.props;
    this.setState({tokenContract: drizzle.contracts.GNIToken});
  }

  handleSubmit(e) {

    // this.state.tokenContract.methods.transfer.cacheSend(
    //   tokenContract.methods.balaneof.cacheCall({drizzleState.accounts[0]}),
    //   tokenContract.methods.balaneof.cacheCall({drizzleState.accounts[1]}),
    //   {from: this.props.account}
    // );
  }

  update(property) {
    return (e) => {
      this.setState({ [property]: e.currentTarget.value });
    };
  }

  toggleBylawAgreement() {
    this.setState({ bylaw_agreement: !this.state.bylaw_agreement });
  }

  handleFromChange(e) {
    if(e.currentTarget.value === 'me') {
      this.setState({
        fromOption: e.currentTarget.value,
        fromDisabled: true
      });
    } else {
      this.setState({
        fromOption: e.currentTarget.value,
        fromDisabled: false
      });
    }
  }

  handleToChange(e) {
    if(e.currentTarget.value === 'me') {
      this.setState({
        toOption: e.currentTarget.value,
        toDisabled: true
      });
    } else {
      this.setState({
        toOption: e.currentTarget.value,
        toDisabled: false
      });
    }
  }

  handleProjectChange(e) {
    this.setState({ project: e.currentTarget.value });
  }

  render() {

    let {
      price,
      bylaw_agreement,
      receivingWallet,
      fromDisabled,
      toDisabled
    } = this.state;

    let value = this.state.shares === 0 ? 0 : this.state.shares * this.state.price;
    let shares = this.state.shares === 0 ? '' : this.state.shares;
    return(
      <form className="form-box">
        <div className="transfer-div">
          <p className="transfer-left">from</p>
          <div className="transfer-mid from-checkboxes">
            <div className="cb cb-1 f-cb-1">
              <input
                className="cb-option cb-option-1 f-cb-option-1"
                type="radio"
                name="from-option"
                value="me"
                onClick={this.handleFromChange}/>
              <label htmlFor="f-cb-option-1">me</label>
            </div>
            <div className="cb cb-2 f-cb-2">
              <input
                className="cb-option cb-option-2 f-cb-option-2"
                type="radio"
                name="from-option"
                value="openCoins"
                onClick={this.handleFromChange}
                defaultChecked={true}/>
              <label htmlFor="f-cb-option-2">openCoins</label>
            </div>
          </div>
          <div className="transfer-right from-dropdown">
            <select
              className="from-dropdown-list"
              disabled={fromDisabled}
              onChange={this.handleProjectChange}
              defaultValue="project dedication">
              <option value="project dedication" disabled="disabled">project dedication</option>
              <option value="fitness co-op">fitness co-op</option>
              <option value="puerto rico waterfront">puerto rico waterfront</option>
              <option value="colorado ski lodge">colorado ski lodge</option>
              <option value="thailand hostel">thailand hostel</option>
            </select>
          </div>
        </div>
        <div className="transfer-div">
          <p className="transfer-left">to</p>
          <div className="transfer-mid to-checkboxes">
            <div className="cb cb-1 t-cb-1">
              <input
                className="cb-option cb-option-1 t-cb-option-1"
                type="radio"
                name="to-option"
                value="me"
                onClick={this.handleToChange}
                defaultChecked={true} />
              <label htmlFor="t-cb-option-1">me</label>
            </div>
            <div className="cb cb-2 t-cb-2">
              <input
                className="cb-option cb-option-2 t-cb-option-2"
                type="radio"
                name="to-option"
                value="someWallet"
                onClick={this.handleToChange}/>
              <label htmlFor="t-cb-option-2">someWallet</label>
            </div>
          </div>
          <div className="transfer-right">
            <input
              type="text"
              placeholder="###############"
              value={receivingWallet}
              className="receiving-wallet-input"
              disabled={toDisabled}
              onChange={this.update('receivingWallet')}
              />
          </div>
        </div>
        <div className="price-breakdown">
          <div className="transfer-input-cont">
            <input
              type="text"
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
            value="transfer"
            className="transfer-button"
            onClick={this.handleSubmit}/>
        </div>
        <div className="blue-close-modal-button close-modal-button"
          onClick={this.props.closeModal}>&times;</div>
      </form>
    );
  }
}

export default Transfer;
