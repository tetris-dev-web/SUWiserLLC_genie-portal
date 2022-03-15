import React, { useState } from "react";
import Modal from "react-modal";
import ModalStyle from "./map_modal_style";
import DropPinMap from "./drop_pin_map";
import DropPinAddress from "./drop_pin_address";

const DropPinModal = (props) => {
  console.log("pin props:", props);
  const { lat, lng, title, updateLatLng, storeAddress } = props;
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="project-form-button drop-pin">
        <svg className="project-form-button-icons" viewBox="0 0 100 100" onClick={openModal}>
          <path d="M53,55.7a19.5,19.5,0,1,0-6,0V77h0c0,1.7,1.3,5.9,3,5.9s3-4.2,3-5.9h0ZM50,50A13.5,13.5,0,1,1,63.5,36.5,13.6,13.6,0,0,1,50,50Z" />
        </svg>
      </div>
      <Modal isOpen={isOpen} onRequestClose={closeModal} ariaHideApp={false} style={ModalStyle}>
        <div className="drop-pin-flex">
          <div className="drop-pin-container">
            <DropPinMap
              lat={isNaN(lat) ? 40.0 : lat}
              lng={isNaN(lng) ? 120.0 : lng}
              title={title}
              updateLatLng={updateLatLng}
              storeAddress={storeAddress}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DropPinModal;
