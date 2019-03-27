import React from 'react';
import './developerInfo.scss';
import  Modal  from 'react-modal';

import {Strategy, Bylaws } from './createInfoModals';

console.log("Strategy", Strategy);

const modalInfo = {
  "strategy" : <Strategy />,
  "bylaws": <Bylaws />,
  "about": <Bylaws />
}

class DevInfoDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DropdownIsOpen: false,
      InfoModalIsOpen: false,
      InfoModalComponent: ""
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown(e) {
    this.setState({
      DropdownIsOpen: !this.state.DropdownIsOpen
    })
  }

  handleClick(type) {
    this.setState({
      InfoModalIsOpen: !this.state.InfoModalIsOpen,
      InfoModalComponent: modalInfo[type]
    })
  }

  render() {

    const showSidebarOptions = (
      <ul className={` ${this.state.DropdownIsOpen? "dev-info-list" : "hidden"}`}>
        <li className="strategy ">
          <div className= "button-text bounceOnHover"
            onClick={() => this.handleClick("strategy")}>
            STRATEGY
          </div>
        </li>
        <li className="bylaws ">
          <div className="button-text bounceOnHover"
            onClick={() => this.handleClick("bylaws")}>
            BYLAWS
          </div>
        </li>
        <li className="about bounceOnHover">
          <div className="button-text bounceOnHover"
            onClick={() => this.handleClick("about")}>
            ABOUT
          </div>
        </li>
      </ul>
    );

    return(
      <div className='dev-info-container' >

        <div className={`${this.state.DropdownIsOpen?  "devinfo-dropdown" : "devinfo-up bounceOnHover"}`}>
          <div className={`"button-text dev-dropdown-button" ${this.state.DropdownIsOpen?  "opaque" : ""}`} onClick={this.toggleDropdown}>
            DEVELOPER INFO
          </div>
          {showSidebarOptions}
        </div>
        <Modal
          isOpen={this.state.InfoModalIsOpen}
          onRequestClose={this.handleClick}
          contentLabel="info modal"
          className="devinfo-selection-modal-container"
          ariaHideApp={false}>

          {this.state.InfoModalComponent}

        </Modal>
      </div>
    );
  }
}

export default DevInfoDropdown;
