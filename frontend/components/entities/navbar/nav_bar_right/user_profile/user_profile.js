import React, { useState } from "react";
import Modal from "react-modal";
import ProfileContent from "./profile_content";
import ProfileEdit from "./profile_edit";
import InvestorDashboard from "./investor_dashboard";
import "./user_profile.scss";

const UserProfile = (props) => {
  const [showProfit, setShowProfit] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showInvestorDashboard, setShowInvestorDashboard] = useState(false);

  return (
    <div className="user_profile">
      <div className="demo_user" onClick={() => setShowProfile(true)}>
        My Profile
      </div>
      <img
        className="button-img"
        src="https://s3.amazonaws.com/genie-portal-dev/static/profile.svg"
        onClick={() => setShowProfile(true)}
      />
      <div className="demo_user" onClick={() => setShowInvestorDashboard(true)}>
        Investor<br></br>Dashboard
      </div>
      <img
        className="button-img"
        src="https://s3.amazonaws.com/genie-portal-dev/static/profile.svg"
        onClick={() => setShowInvestorDashboard(true)}
      />
      <div className="demo_user" onClick={() => setShowProfit(true)}>
        DEMO USER
      </div>
      <img
        className="button-img"
        src="https://s3.amazonaws.com/genie-portal-dev/static/profile.svg"
        onClick={() => setShowProfit(true)}
      />
      <Modal
        className="user_profile_modal"
        isOpen={showProfit}
        ariaHideApp={false}
        onRequestClose={() => setShowProfit(false)}
      >
        <ProfileContent />
      </Modal>
      <Modal
        className="user_profile_modal investor_summary_modal"
        isOpen={showInvestorDashboard}
        ariaHideApp={false}
        onRequestClose={() => setShowInvestorDashboard(false)}
      >
        <InvestorDashboard />
      </Modal>
      <Modal
        className="user_profile_modal"
        isOpen={showProfile}
        ariaHideApp={false}
        onRequestClose={() => setShowProfile(false)}
      >
        <ProfileEdit />      
      </Modal>
    </div>
  );
};

export default UserProfile;
