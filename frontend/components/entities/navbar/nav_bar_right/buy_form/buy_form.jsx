import React, { useState } from "react";
import "./transfer.scss";
import { connect } from "react-redux";
import {
  buyTokens,
  buyTokensWithDemoInvestor,
} from "../../../../../actions/chain_actions/token_actions";
import { updateTransactionModal } from "../../../../../actions/ui_actions";

const mapStateToProps = (state) => {
  return {
    account: state.network.account,
    crowdsale: state.network.crowdsaleInstance,
    inactiveTokenInstace: state.network.inactiveTokenInstace,
  };
};

const mapDipsatchToProps = (dispatch) => {
  return {
    buyTokens: (crowdsale, account, wei) => buyTokens(crowdsale, account, wei),
    buyTokensWithDemoInvestor: (wei) => buyTokensWithDemoInvestor(wei),
    updateTransactionModal: (modalInfo) => dispatch(updateTransactionModal(modalInfo)),
  };
};

const BuyForm = (props) => {
  const { buyTokensWithDemoInvestor, closeModal } = props;

  const price = 78;

  const [state, setState] = useState({
    shares: 0,
    value: 0,
  });
  const [bylawAgreement, setByLawAgreement] = useState(false);

  const update = (field) => {
    return (e) => {
      setState({
        [field]: e.currentTarget.value,
        value: e.currentTarget.value * price,
      });
    };
  };

  const toggleBylawAgreement = () => {
    setByLawAgreement(!bylawAgreement);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let title;
    let message;

    if (state.shares <= 80) {
      title = "YOUR TRANSACTION HAS BEEN SENT";
      message = "It may take a few minutes for your transaction to be processed by the blockchain.";
      buyTokensWithDemoInvestor(state.shares);
      closeModal();
    } else {
      title = "TRANSACTION REJECTED";
      message =
        "For this demo, we limit token purchases to 80 wei. Please try again with a smaller wei amount.";
    }

    updateTransactionModal({
      isOpen: true,
      title,
      message,
    });
  };

  // const closeTransactionModal = () => {
  //   setState({
  //     transactionModalOpen: false
  //   })
  // }

  return (
    <form className="form-box">
      <div className="price-breakdown">
        <div className="transfer-input-cont">
          <input
            type="number"
            placeholder="#| of shares"
            value={state.shares}
            className="transfer-input"
            onChange={update("shares")}
          />
        </div>
        <div className="transfer-price">$|{price}</div>
        <div className="transfer-value">$|{state.value}</div>
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
          checked={bylawAgreement}
          onChange={toggleBylawAgreement}
        />
        <p className="t-checkbox-text">
          I certify that I have read and agreed to{" "}
          <a href="#" className="link">
            the bylaws
          </a>
          .
        </p>
      </div>
      <div className="transfer-button-cont">
        <input type="submit" value="buy" className="transfer-button" onClick={handleSubmit} />
      </div>
      <div className="blue-close-modal-button close-modal-button" onClick={closeModal}>
        &times;
      </div>
    </form>
  );
};

export default connect(mapStateToProps, mapDipsatchToProps)(BuyForm);
