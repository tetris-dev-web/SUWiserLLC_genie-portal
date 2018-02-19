import React from 'react';
import BylawsModal from './bylaws_modal';
import StrategyModal from './strategy_modal';

class Footer extends React.Component {

  render() {
    return(
      <footer className="series footer footer-container">
        <div className="footer-button footer-left">
          <BylawsModal/>
        </div>
        <div className="footer-button footer-mid">
          <StrategyModal/>
        </div>
        <div className="footer-button footer-right">
          <div>ABOUT</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
