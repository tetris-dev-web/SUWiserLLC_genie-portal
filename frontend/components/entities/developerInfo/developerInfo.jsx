import React from 'react';
import './developerInfo.scss';
import { connect } from 'react-redux';
import { 
  openModal,
  closeModal
 } from '../../../actions/modal_actions';

const mapPropsToState = state => {
  return {
    modals: state.ui.modals
  };
};

const mapDispatchToState = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
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
    const { modals, openModal, closeModal } = this.props;
    return (
      () => {
        if (modals.length) closeModal();
        openModal({ type });
      }
    );
  }
 
  render() {
    const { modals } = this.props;
    const { showDropdown } = this.state;
    let activeDropdown = showDropdown ? 'active-dropdown' : '';
    
    const showSidebarOptions = (
      <React.Fragment>
        <li className="strategy">
          <div className={`button-text strategy-button ${modals[0] && modals[0].type === "strategy" ? "selected" : ""}`}
            onClick={this.handleClick("strategy")}>STRATEGY</div>
        </li>
        <li className="bylaws">
          <div className={`button-text bylaw-button ${modals[0] && modals[0].type === "bylaw" ? "selected" : ""}`}
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

export default connect(mapPropsToState, mapDispatchToState)(DeveloperInfo);
