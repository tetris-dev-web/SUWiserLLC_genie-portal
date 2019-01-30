import React from 'react';
import './DeveloperInfo.scss';
import BylawsModal from './bylaws_modal';
import StrategyModal from './strategy_modal';

class DeveloperInfo extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      DeveloperInfoButtonToggle: false,
      BylawsModalToggle: false,
      StrategyModalToggle: false,
      AboutToggle: false
    };
    // this.toggle = this.toggle.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.toggleClose = this.toggleClose.bind(this);
    this.toggleDrop = this.toggleDrop.bind(this);
  
  }
  toggleClose(modalToggle){
    switch (modalToggle) {
      case 'BylawsModalToggle':
        this.setState({ BylawsModalToggle: false, DeveloperInfoButtonToggle: false });
        break;
      case 'StrategyModalToggle':
        this.setState({ StrategyModalToggle: false, DeveloperInfoButtonToggle: false });
        break;
      case 'AboutToggle':
        this.setState({ AboutToggle: false, DeveloperInfoButtonToggle: false });
        break;
      default:
        break;
    }
  }
  toggleOpen(modalToggle){
    switch (modalToggle) {
      case 'BylawsModalToggle':
        this.setState({ BylawsModalToggle: true });
        break;
      case 'StrategyModalToggle':
        this.setState({ StrategyModalToggle: true });
        break;
      case 'AboutToggle':
        this.setState({ AboutToggle: true });
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

    let activeDropdown = DeveloperInfoButtonToggle === true ? 'active-dropdown' : '';
    let activeStrategyModal = StrategyModalToggle ? 'modal-active' : '';
    let activeBylawsModal = BylawsModalToggle ? 'modal-active' : '';

    const showSidebarOptions = DeveloperInfoButtonToggle === true ?
      <React.Fragment>
        <li className={`${activeDropdown} strategy`}>
          <div className={activeStrategyModal}><StrategyModal toggleOpen={this.toggleOpen} toggleClose={this.toggleClose} /></div>
        </li>
        <li className={`${activeDropdown} bylaws ${activeBylawsModal}`}>
          <div className={activeBylawsModal}><BylawsModal toggleOpen={this.toggleOpen} toggleClose={this.toggleClose} /></div>
        </li>
        <li className={`${activeDropdown} about`}>
          <div>ABOUT</div>
        </li>
      </React.Fragment>
      :
      <React.Fragment>
        <li>
          <div><StrategyModal toggle={this.toggle} /></div>
        </li>
        <li>
          <div><BylawsModal toggle={this.toggle} /></div>
        </li>
        <li>
          <div>ABOUT</div>
        </li>
      </React.Fragment>;

    return(
      <div className={`dev-container ${activeDropdown}`} >
        <ul>
          <li>
            <div className={activeDropdown} onClick={this.toggleDrop}>DEVELOPER INFO</div>
          </li>
          {showSidebarOptions}
        </ul>
      </div>
    );
  }

}

  export default DeveloperInfo;
