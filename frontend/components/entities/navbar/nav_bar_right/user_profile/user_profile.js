import React, { useState } from "react";
import Modal from "react-modal";
import ProfileContent from "./profile_content";
import "./user_profile.scss";

const UserProfile = (props) => {
  const [state, setState] = useState(false);

  const setShowProfileStatus = (status) => {
    setState(status);
  };

  return (
    <div className="user_profile">
      <div className="demo_user" onClick={() => setShowProfileStatus(true)}>
        DEMO USER
      </div>
      <img
        className="button-img"
        src="https://s3.amazonaws.com/genie-portal-dev/static/profile.svg"
        onClick={() => setShowProfileStatus(true)}
      />
      <Modal
        className="user_profile_modal"
        isOpen={state}
        ariaHideApp={false}
        onRequestClose={() => setShowProfileStatus(false)}
      >
        <ProfileContent />
      </Modal>
    </div>
  );
};

export default UserProfile;
