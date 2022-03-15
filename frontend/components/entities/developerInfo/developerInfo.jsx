import React, { useState } from "react";
import "./developerInfo.scss";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../../actions/modal_actions";

const mapPropsToState = (state) => {
  return {
    modals: state.ui.modals,
  };
};

const mapDispatchToState = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
  };
};

const DeveloperInfo = (props) => {
  const { modals, openModal, closeModal } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  let dropdown;

  const toggleDropdown = (e) => {
    if (showDropdown) {
      const modal = document.getElementsByClassName("modal-child")[0];
      if (dropdown.contains(e.target) || (modal && modal.contains(e.target))) return;
      document.removeEventListener("click", toggleDropdown);
    } else {
      document.addEventListener("click", toggleDropdown);
    }

    setShowDropdown(!showDropdown);
  };

  const handleClick = (type) => {
    return () => {
      if (modals.length) closeModal();
      openModal({ type });
    };
  };

  let activeDropdown = showDropdown ? "active-dropdown" : "";

  const showSidebarOptions = (
    <React.Fragment>
      <li className="strategy">
        <div
          className={`button-text strategy-button ${
            modals[0] && modals[0].type === "strategy" ? "selected" : ""
          }`}
          onClick={handleClick("strategy")}
        >
          STRATEGY
        </div>
      </li>
      <li className="bylaws">
        <div
          className={`button-text bylaw-button ${
            modals[0] && modals[0].type === "bylaw" ? "selected" : ""
          }`}
          onClick={handleClick("bylaw")}
        >
          BYLAWS
        </div>
      </li>
      <li className="about">
        <div className="button-text">ABOUT</div>
      </li>
    </React.Fragment>
  );

  return (
    <div className={`dev-info-container ${activeDropdown}`}>
      <div className="button-text dev-dropdown-button" onClick={toggleDropdown}>
        DEVELOPER INFO
      </div>
      <ul className="dev-info-list" ref={(node) => (dropdown = node)}>
        {showSidebarOptions}
      </ul>
    </div>
  );
};

export default connect(mapPropsToState, mapDispatchToState)(DeveloperInfo);
