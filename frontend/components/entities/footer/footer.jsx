import React from 'react';
import BylawsModal from './bylaws_modal';
import StrategyModal from './strategy_modal';
import WalletModal from './wallet_modal';

class Footer extends React.Component {

  render() {
    return(
      <footer className="series footer footer-container">
        <div className="footer-button">
          <BylawsModal/>
        </div>
        <div className="footer-button">
          <StrategyModal/>
        </div>
        <div className="footer-button">
          <div>ABOUT</div>
        </div>
        <div className="footer-button">
          <WalletModal/>
        </div>
      </footer>
    );
  }
}

export default Footer;
