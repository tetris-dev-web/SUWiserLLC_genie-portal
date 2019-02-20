import React from 'react';
import './developerInfo.scss';
import { connect } from 'react-redux';
import { openModal } from '../../../actions/modal_actions';

const mapDispatchToState = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal))
  };
};

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
      const modal = document.getElementsByClassName("modal-child")[0];
      if (
        this.dropdown.contains(e.target) ||
        modal && modal.contains(e.target)
      ) return;
      document.removeEventListener("click", this.toggleDropdown);
    } else {
      document.addEventListener("click", this.toggleDropdown);
    }
    
    this.setState({showDropdown: !this.state.showDropdown});
  }

  handleClick(type) {
    return (
      () => this.props.openModal({ type })
    );
  }
 
  render() {
    const { showDropdown } = this.state;
    let activeDropdown = showDropdown ? 'active-dropdown' : '';
    
    const showSidebarOptions = (
      <React.Fragment>
        <li className="strategy">
          <div className={`button-text strategy-button`}
            onClick={this.handleClick("strategy")}>STRATEGY</div>
        </li>
        <li className="bylaws">
          <div className={`button-text bylaw-button`}
            onClick={this.handleClick("bylaw")}>BYLAWS</div>
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

export default connect(null, mapDispatchToState)(DeveloperInfo);
