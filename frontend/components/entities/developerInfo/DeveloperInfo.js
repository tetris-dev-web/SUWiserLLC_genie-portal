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
    this.toggleDrop = this.toggleDrop.bind(this);
  
  }
  toggle(modalToggle){
    switch (modalToggle) {
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
  toggleDrop(){
    this.setState({ DeveloperInfoButtonToggle: !this.state.DeveloperInfoButtonToggle });
  }

  render() {
    const { DeveloperInfoButtonToggle, BylawsModalToggle, StrategyModalToggle, AboutToggle } = this.state;
    // let className = 'devinfo-button';
    // if(this.state.DeveloperInfoButtonToggle) className += ' modal-active';
    // onClick = { this.toggle('DeveloperInfoButtonToggle') }
    return (
        <div className="devinfo-container">
          <div className={`devinfo-button ${DeveloperInfoButtonToggle ? 'dropdown-active' : ''}`} onClick={this.toggleDrop}>DEVELOPER INFO
            <span className='devinfo-span'></span>
            {
              DeveloperInfoButtonToggle === true ? 
              <div>
                <div className={`devinfo-button dropdown ${BylawsModalToggle ? 'modal-active' : ''}`}>
                  <BylawsModal toggle={this.toggle} />
                </div>
                <div className={`devinfo-button dropdown ${StrategyModalToggle ? 'modal-active' : ''}`}>
                  <StrategyModal toggle={this.toggle} />
                </div>
                <div className={`devinfo-button dropdown ${AboutToggle ? 'modal-active' : ''}`}>
                  <div className="overSubButtonText">ABOUT</div>
                </div>
              </div>
              :
              null
            }
          </div>
        </div>
    );
  }

}

  export default DeveloperInfo;
