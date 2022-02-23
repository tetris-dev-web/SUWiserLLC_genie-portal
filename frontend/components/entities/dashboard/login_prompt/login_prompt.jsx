import React from "react";
import "./login_prompt.scss";

const LoginPrompt = () => (
  <div className="login-prompt">
    <div className="login-text">Please login with MetaMask</div>
    <a href="https://metamask.io/" target="_blank" className="metaMask-Button">
      Download MetaMask
    </a>
  </div>
);
export default LoginPrompt;
