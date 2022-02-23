import React, { useEffect } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import { demoDepositCashflow } from "../../../../../actions/chain_actions/project_actions";
import { updateTransactionModal } from "../../../../../actions/ui_actions";
import "./project_modules_deposit_cashflow.scss";

const DepositCashFlow = (props) => {
  const { demoDepositCashflow, updateTransactionModal, projectAddress, provider } = props;

  const [state, setState] = useState({
    usdPerEth: null,
    ETH: null,
    USD: null,
  });

  useEffect(() => {
    $.ajax({
      url: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
      method: "get",
    }).then((response) => {
      this.setState({
        usdPerEth: response.USD,
      });
    });
  }, []);

  const subtmitDeposit = () => {
    const weiAmount = provider.utils.toWei(state["ETH"].toString(), "ether");
    console.log(weiAmount);
    demoDepositCashflow(projectAddress, weiAmount);
    updateTransactionModal({
      isOpen: true,
      title: "YOUR TRANSACTION HAS BEEN SENT",
      message: "It may take a few minutes for your transaction to be processed by the blockchain.",
    });
  };

  updateDesposit = (denomination) => {
    return (e) => {
      const value = e.currentTarget.value;
      const { usdPerEth } = state;

      this.setState({
        ETH: denomination === "USD" ? value / usdPerEth : value,
        USD: denomination === "USD" ? value : usdPerEth * value,
      });
    };
  };

  return (
    <div className="deposit_form">
      <input
        type="text"
        placeholder="USD"
        value={state["USD"] || ""}
        onChange={updateDesposit("USD")}
        className="USD-input"
      />
      <input
        type="text"
        placeholder="ETH"
        value={state["ETH"] || ""}
        onChange={updateDesposit("ETH")}
        className="ETH-input"
      />
      <h1 className="desposit-button" onClick={subtmitDeposit}>
        deposit
      </h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    demoDepositCashflow: (projectAddress, weiAmount) =>
      demoDepositCashflow(projectAddress, weiAmount),
    provider: state.network.provider,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTransactionModal: (modalInfo) => dispatch(updateTransactionModal(modalInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositCashFlow);
