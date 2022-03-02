import React from "react";
import Modal from "react-modal";
import { LandingDescription } from "./landing_description";
import DemoOptions from "./demo_options";
import { setDemoType } from "../../actions/ui_actions";
import OWLogo from "../../images/icons/ow-logo.svg";
import "./landing.scss";

const Landing = () => {
  return (
    <Modal
      isOpen={true}
      className="landing_modal"
      transparent={true}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "#030306",
        },
      }}
    >
      <div className="landing">
        <img className="gen-logo" src={OWLogo} style={{ marginTop: 15 }} />
        <LandingDescription />
        <DemoOptions />
      </div>
    </Modal>
  );
};

export default Landing;
