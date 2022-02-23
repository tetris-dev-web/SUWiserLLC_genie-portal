import React, { useState } from "react";
import Modal from "react-modal";

import BuyForm from "./buy_form";
import ModalStyle from "./modal_style";

const BuyFormModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    console.log("OPENING MODAL");
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="modal-button-cont">
      <div
        className={isModalOpen ? "modal-button-modal-open" : "modal-button"}
        onClick={handleClick}
      >
        BUY
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClick}
        style={ModalStyle}
        contentLabel="Transfer Modal"
        className="modal-container"
      >
        <BuyForm closeModal={handleClick} />
      </Modal>
    </div>
  );
};
// account={this.props.account}
// contract={this.props.contract}

// <DrizzleConsumer props={{closeModal: this.closeModal}} component={Transfer}/>
export default BuyFormModal;
