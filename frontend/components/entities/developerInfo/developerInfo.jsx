import React from 'react';
import './developerInfo.scss';
import BylawsModal from './bylaws_modal/bylaws_modal';
import StrategyModal from './strategy_modal/strategy_modal';

class DeveloperInfo extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      showDropdown: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown(e) {
    const { showDropdown } = this.state;
    if (showDropdown) {
      if (
        this.dropdown.contains(e.target) ||
        this.strategyModal && this.strategyModal.contains(e.target) ||
        this.bylawsModal && this.bylawsModal.contains(e.target)
      ) return;
      document.removeEventListener("click", this.toggleDropdown);
    } else {
      document.addEventListener("click", this.toggleDropdown);
    }
    
    this.setState({showDropdown: !this.state.showDropdown});
  }

  render() {
    const { showDropdown } = this.state;
    let activeDropdown = showDropdown ? 'active-dropdown' : '';
    
    const showSidebarOptions = (
      <React.Fragment>
        <li className="strategy">
          <StrategyModal setRef={node => this.strategyModal = node}/>
        </li>
        <li className="bylaws">
          <BylawsModal setRef={node => this.bylawsModal = node}/>
        </li>
        <li className="about">
          <div className="button-text">ABOUT</div>
        </li>
      </React.Fragment>
    );

    return(
      <div className={`dev-info-container ${activeDropdown}`}>
        <div className="button-text dev-dropdown-button" onClick={this.toggleDropdown}>DEVELOPER INFO</div>
        <ul className="dev-info-list" ref={node => this.dropdown = node}>
          {showSidebarOptions}
        </ul>
      </div>
    );
  }

}

  export default DeveloperInfo;
