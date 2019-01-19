import React from 'react';
import Modal from 'react-modal';
import './DeveloperInfo.scss';
import BylawsModal from './bylaws_modal';
import StrategyModal from './strategy_modal';
import DeveloperInfoButton from './DeveloperDropDownButton';



class DeveloperInfo extends React.Component {
  //
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     openModal: false,
  //   };
  //
  //   };

  openModal() {
    this.setState({ openModal: true });
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    return (
        <div className="devinfo-container">
          <div className="devinfo-button">
            <DeveloperInfoButton />
          </div>
          <div className="devinfo-button">
            <BylawsModal />
          </div>
          <div className="devinfo-button">
            <StrategyModal />
          </div>
          <div className="devinfo-button">
            <div className="overSubButtonText">ABOUT</div>
          </div>
        </div>
    )
  }

}

  export default DeveloperInfo;
