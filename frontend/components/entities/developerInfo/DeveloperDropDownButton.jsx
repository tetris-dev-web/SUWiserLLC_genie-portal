import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './modal_style';
// import Web3 from 'web3';



class DeveloperInfoButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      openModal: false,
    };
    window.SessionOpenModal = () => {
      this.setState({openModal: true});
    };
    window.SessionOpenModal = window.SessionOpenModal.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.walletInformation = this.walletInformation.bind(this);
    // this.getBalance = this.getBalance.bind(this);
    this.getBalances = this.getBalances.bind(this);
  }

  openModal() {
    this.setState({openModal: true});
    this.props.toggle('DeveloperInfoButtonToggle');
  }

  closeModal(){
    this.setState({openModal: false});
    this.props.toggle('DeveloperInfoButtonToggle');
  }


  componentDidMount(){
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    // console.log(web3.eth.accounts);
  }
  getBalance (address) {
      return new Promise (function (resolve, reject) {
        web3.eth.getBalance(address, function (error, result) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
            }
        });
      });
    }


  getBalances(provider) {
    // var ethWeb3 = new Web3(provider);
    let arr = [];
    web3.eth.getAccounts(function (err, accounts) {
      for(var i = 0; i < accounts.length; i++) {
        var account = accounts[i];
        web3.eth.getBalance(account, function(err, balance) {
          arr.push([account, web3.fromWei(balance, 'ether')]);
        });
      }
    });
    return arr;
  }

  walletInformation(){
    //componentDidMount?

    if(window.web3 === undefined){
      return(
        <div className="warning">
          <p>This browser has no connection to the Ethereum network. </p>
          <p>Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
        </div>
      );
    }
    return (<p>hello</p>);
    // web3 = new Web3(window.web3.currentProvider);
    // // let account = web3.eth.accounts[0];
    // if (!web3.currentProvider) {
    //     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    //   }

    // else{
    //   // const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    //   return(
    //     <div className="warning">
    //     <p> ....</p>
    //     </div>
    // )
    //   // const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    //   // let arr = this.getBalances(web3);
    // }
    // // check if account is locked
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    //
    //
    //
    //
    //
    // // web3.setProvider(ganache.provider());
    //
    // // if (!web3.currentProvider) {
    // //     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    // //   }
    //
    //
    // if(web3.eth.accounts.length === 0)
    //   return(
    //     <div className="warning">
    //       <p>MetaMask is locked</p>
    //     </div>
    //   )
    //
    // let account = web3.eth.accounts[0];
    // this.getBalance(account).then((result) => {
    //        console.log('getBalance',result);
    //        // web3.utils.fromWei(result.c[0], 'ether')
    //   });
    //
    //   // web3.eth.sendTransaction({from:web3.eth.accounts[0], to: "0xda27659492402297e73663c9fd8583be7e444a2d", value:  web3.toWei('50', 'gwei')})
    //
    // return(
    //   <div className="warning">
    //     <p>we are good</p>
    //   </div>
    // )
  }

  render(){
    return (
      <div>
        <div className="strategy-button" onClick={this.openModal}>DEVELOPER INFO</div>
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          contentLabel="Wallet Modal"
          className="modal-container strategy-container">
          <div className="black-close-modal-button close-modal-button"
            onClick={this.closeModal}>&times;</div>
          <div className="ft-modal-header-cont">
            <div className="ft-modal-header">
              Wallet Info
            </div>
          </div>
          <div className="ft-modal-body strategy-body">
            <div className="ft-el-cont strategy-info">
              <h1 className="ft-el-header">Organizational Structure</h1>
              <p className="ft-el-text">
                {this.walletInformation()}
              </p>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

}

export default DeveloperInfoButton;
