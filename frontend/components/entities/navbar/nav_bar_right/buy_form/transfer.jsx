/*jshint esversion: 6 */

import { merge } from "lodash";
import React, { useEffect } from "react";

const Transfer = (props) => {
  const { account, closeModal } = props;

  const [state, setState] = React.useState({
    shares: 0,
    price: 78,
    project: "",
    bylaw_agreement: false,
    receivingWallet: "",
    fromOption: "",
    toOption: "",
    fromDisabled: false,
    toDisabled: true,
  });

  useEffect(() => {
    // const {drizzle} = props;
    // setState({...state,tokenContract: drizzle.contracts.GNIToken});
  }, []);

  const handleSubmit = (e) => {
    // state.tokenContract.methods.transfer.cacheSend(
    //   tokenContract.methods.balaneof.cacheCall({drizzleState.accounts[0]}),
    //   tokenContract.methods.balaneof.cacheCall({drizzleState.accounts[1]}),
    //   {from: account}
    // );
  };

  const update = (property) => {
    return (e) => {
      const newState = merge({}, state, { property: e.currentTarget.value });
      setState(newState);
    };
  };

  const toggleBylawAgreement = () => {
    const newState = merge({}, state, { bylaw_agreement: !state.bylaw_agreement });
    setState(newState);
  };

  const handleFromChange = (e) => {
    if (e.currentTarget.value === "me") {
      const newState = merge({}, state, {
        fromOption: e.currentTarget.value,
        fromDisabled: true,
      });
      setState(newState);
    } else {
      const newState = merge({}, state, {
        fromOption: e.currentTarget.value,
        fromDisabled: false,
      });
      setState(newState);
    }
  };

  const handleToChange = (e) => {
    if (e.currentTarget.value === "me") {
      const newState = merge({}, state, {
        toOption: e.currentTarget.value,
        toDisabled: true,
      });
      setState(newState);
    } else {
      const newState = merge({}, state, {
        toOption: e.currentTarget.value,
        toDisabled: false,
      });
      setState(newState);
    }
  };

  const handleProjectChange = (e) => {
    const newState = merge({}, state, {
      project: e.currentTarget.value,
    });
    setState(newState);
  };

  let { price, bylaw_agreement, receivingWallet, fromDisabled, toDisabled } = state;

  let value = state.shares === 0 ? 0 : state.shares * price;
  let shares = state.shares === 0 ? "" : state.shares;
  return (
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
              onClick={handleFromChange}
            />
            <label htmlFor="f-cb-option-1">me</label>
          </div>
          <div className="cb cb-2 f-cb-2">
            <input
              className="cb-option cb-option-2 f-cb-option-2"
              type="radio"
              name="from-option"
              value="openCoins"
              onClick={handleFromChange}
              defaultChecked={true}
            />
            <label htmlFor="f-cb-option-2">openCoins</label>
          </div>
        </div>
        <div className="transfer-right from-dropdown">
          <select
            className="from-dropdown-list"
            disabled={fromDisabled}
            onChange={handleProjectChange}
            defaultValue="project dedication"
          >
            <option value="project dedication" disabled="disabled">
              project dedication
            </option>
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
              onClick={handleToChange}
              defaultChecked={true}
            />
            <label htmlFor="t-cb-option-1">me</label>
          </div>
          <div className="cb cb-2 t-cb-2">
            <input
              className="cb-option cb-option-2 t-cb-option-2"
              type="radio"
              name="to-option"
              value="someWallet"
              onClick={handleToChange}
            />
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
            onChange={update("receivingWallet")}
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
            onChange={update("shares")}
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
        <input type="submit" value="transfer" className="transfer-button" onClick={handleSubmit} />
      </div>
      <div className="blue-close-modal-button close-modal-button" onClick={closeModal}>
        &times;
      </div>
    </form>
  );
};

export default Transfer;
