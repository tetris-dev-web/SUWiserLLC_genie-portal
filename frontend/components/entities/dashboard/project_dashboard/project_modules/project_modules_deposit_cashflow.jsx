import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { demoDepositCashflow } from '../../../../../actions/chain_actions/project_actions';
import { updateTransactionModal} from '../../../../../actions/ui_actions';
import './project_modules_deposit_cashflow.scss';

class DepositCashFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usdPerEth: null,
      "ETH": null,
      "USD": null
    };

    this.subtmitDeposit = this.subtmitDeposit.bind(this);
  }

  componentDidMount () {
    $.ajax({
      url: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
      method: 'get'
    }).then((response) => {
      this.setState({
        usdPerEth: response.USD
      })
    })
  }

  subtmitDeposit () {
    const { projectAddress, provider } = this.props;
    const weiAmount = provider.utils.toWei(this.state["ETH"].toString(), 'ether');
    console.log(weiAmount);
    this.props.demoDepositCashflow(projectAddress, weiAmount);
    this.props.updateTransactionModal({
      isOpen: true,
      title: "YOUR TRANSACTION HAS BEEN SENT",
      message: "It may take a few minutes for your transaction to be processed by the blockchain."
    })
  }

  updateDesposit (denomination) {
    return (e) => {
      const value = e.currentTarget.value;
      const { usdPerEth } = this.state;

      this.setState({
        "ETH": denomination === "USD" ? value / usdPerEth : value,
        "USD": denomination === "USD" ? value : usdPerEth * value
      })
    }
  }

  render () {
    return (
      <div className='deposit_form'>
        <input
        type="text"
        placeholder="USD"
        value={this.state["USD"] || ''}
        onChange={this.updateDesposit('USD')}
        className="USD-input" />
        <input
        type="text"
        placeholder="ETH"
        value={this.state["ETH"] || ''}
        onChange={this.updateDesposit('ETH')}
        className="ETH-input" />
        <h1
        className='desposit-button'
        onClick={this.subtmitDeposit}
        >
        deposit
        </h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    demoDepositCashflow: (projectAddress, weiAmount) => demoDepositCashflow(projectAddress, weiAmount),
    provider: state.network.provider
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTransactionModal: modalInfo => dispatch(updateTransactionModal(modalInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositCashFlow);
