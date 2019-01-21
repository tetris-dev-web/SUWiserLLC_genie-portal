import React from 'react';
// import Modal from 'react-modal';
import './DeveloperInfo.scss';
import BylawsModal from './bylaws_modal';
import StrategyModal from './strategy_modal';
import DeveloperInfoButton from './DeveloperDropDownButton';



class DeveloperInfo extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      DeveloperInfoButtonToggle: false,
      BylawsModalToggle: false,
      StrategyModalToggle: false,
      AboutToggle: false
    };
    this.toggle = this.toggle.bind(this);
  
  }
  toggle(modalToggle){
    switch (modalToggle) {
      case 'DeveloperInfoButtonToggle':
        this.setState({ DeveloperInfoButtonToggle: !this.state.DeveloperInfoButtonToggle });
        break;
      case 'BylawsModalToggle':
        this.setState({ BylawsModalToggle: !this.state.BylawsModalToggle });
        break;
      case 'StrategyModalToggle':
        this.setState({ StrategyModalToggle: !this.state.StrategyModalToggle });
        break;
      case 'AboutToggle':
        this.setState({ AboutToggle: !this.state.AboutToggle });
        break;
      default:
        break;
    }
    
  }

  render() {
    const { DeveloperInfoButtonToggle, BylawsModalToggle, StrategyModalToggle, AboutToggle } = this.state;
    // let className = 'devinfo-button';
    // if(this.state.DeveloperInfoButtonToggle) className += ' modal-active';
    return (
        <div className="devinfo-container">
        <div className={`devinfo-button ${DeveloperInfoButtonToggle ? 'modal-active': ''}` }>
            <DeveloperInfoButton toggle={this.toggle}/>
          </div>
        <div className={`devinfo-button ${BylawsModalToggle ? 'modal-active' : ''}`}>
          <BylawsModal toggle={this.toggle}/>
          </div>
        <div className={`devinfo-button ${StrategyModalToggle ? 'modal-active' : ''}`}>
          <StrategyModal toggle={this.toggle}/>
          </div>
        <div className={`devinfo-button ${AboutToggle ? 'modal-active' : ''}`}>
            <div className="overSubButtonText">ABOUT</div>
          </div>
        </div>
    );
  }

}

  export default DeveloperInfo;
