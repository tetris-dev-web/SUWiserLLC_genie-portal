import React from "react";
import Modal from "react-modal";
import { LandingDescription } from "./landing_description";
import DemoOptions from "./demo_options";
import { setDemoType } from "../../actions/ui_actions";
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
          backgroundColor: "#333",
        },
      }}
    >
      <div className="landing">
        <h1 className="landing_title">PROGENY DEMO</h1>
        <LandingDescription />
        <DemoOptions />
      </div>
    </Modal>
  );
};

export default Landing;
