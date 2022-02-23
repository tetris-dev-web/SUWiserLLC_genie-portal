import React from "react";
import "./developerInfo.scss";
import Modal from "react-modal";

import { Strategy, Bylaws } from "./createInfoModals";
import { merge } from "lodash";

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
    const newInfoModal = merge({}, infoModal, {
      InfoModalIsOpen: !InfoModalIsOpen,
      InfoModalComponent: modalInfo[type],
    });
    setInfoModal(newInfoModal);
  };

  const showSidebarOptions = (
    <ul className={` ${DropdownIsOpen ? "dev-info-list" : "hidden"}`}>
      <li className="strategy ">
        <div className="button-text bounceOnHover" onClick={() => this.handleClick("strategy")}>
          STRATEGY
        </div>
      </li>
      <li className="bylaws ">
        <div className="button-text bounceOnHover" onClick={() => this.handleClick("bylaws")}>
          BYLAWS
        </div>
      </li>
      <li className="about bounceOnHover">
        <div className="button-text bounceOnHover" onClick={() => this.handleClick("about")}>
          ABOUT
        </div>
      </li>
    </ul>
  );

  return (
    <div className="dev-info-container">
      <div className={`${DropdownIsOpen ? "devinfo-dropdown" : "devinfo-up bounceOnHover"}`}>
        <div
          className={`"button-text dev-dropdown-button" ${dropdownIsOpen ? "opaque" : ""}`}
          onClick={toggleDropdown}
        >
          DEVELOPER INFO
        </div>
        {showSidebarOptions}
      </div>
      <Modal
        isOpen={infoModal.InfoModalIsOpen}
        onRequestClose={handleClick}
        contentLabel="info modal"
        className="devinfo-selection-modal-container"
        ariaHideApp={false}
      >
        {infoModal.InfoModalComponent}
      </Modal>
    </div>
  );
};

export default DevInfoDropdown;
