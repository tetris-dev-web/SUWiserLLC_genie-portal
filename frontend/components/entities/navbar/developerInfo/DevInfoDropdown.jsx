import React, { useState } from "react";
import "./developerInfo.scss";
import Modal from "react-modal";

import { Strategy, Bylaws } from "./createInfoModals";

console.log("Strategy", Strategy);

const modalInfo = {
  strategy: <Strategy />,
  bylaws: <Bylaws />,
  about: <Bylaws />,
};

const DevInfoDropdown = (props) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [infoModal, setInfoModal] = useState({
    InfoModalIsOpen: false,
    InfoModalComponent: "",
  });

  const toggleDropdown = (e) => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  const handleClick = (type) => {
    setInfoModal({
      InfoModalIsOpen: !InfoModalIsOpen,
      InfoModalComponent: modalInfo[type],
    });
  };

  const showSidebarOptions = (
    <ul className={` ${dropdownIsOpen ? "dev-info-list" : "hidden"}`}>
      <li className="strategy ">
        <div className="button-text bounceOnHover" onClick={() => handleClick("strategy")}>
          STRATEGY
        </div>
      </li>
      <li className="bylaws ">
        <div className="button-text bounceOnHover" onClick={() => handleClick("bylaws")}>
          BYLAWS
        </div>
      </li>
      <li className="about bounceOnHover">
        <div className="button-text bounceOnHover" onClick={() => handleClick("about")}>
          OFFER CIRCULAR
        </div>
      </li>
    </ul>
  );

  const { InfoModalComponent, InfoModalIsOpen } = infoModal;
  return (
    <div className="dev-info-container">
      <div className={`${dropdownIsOpen ? "devinfo-dropdown" : "devinfo-up bounceOnHover"}`}>
        <div
          className={`"button-text dev-dropdown-button" ${dropdownIsOpen ? "opaque" : ""}`}
          onClick={toggleDropdown}
        >
          DEVELOPER INFO
        </div>
        {showSidebarOptions}
      </div>
      <Modal
        isOpen={InfoModalIsOpen}
        onRequestClose={handleClick}
        contentLabel="info modal"
        className="devinfo-selection-modal-container"
        ariaHideApp={false}
      >
        {InfoModalComponent}
      </Modal>
    </div>
  );
};

export default DevInfoDropdown;
