import React, { useState } from "react";

export function CloseButton(props) {
  return (
    <div className="black-close-modal-button close-modal-button" onClick={props.closeModal}>
      &times;
    </div>
  );
}

export function Title(props) {
  return (
    <div className="ft-modal-header-cont">
      <div className="ft-modal-header bylaws-header">{props.nameOfProject}</div>
    </div>
  );
}

export function SummaryAndPlan(props) {
  const { editProject, closeModal, isInvestor, busLink, id, summary } = props;
  const [state] = useState({ id, summary });

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      const project = state;
      editProject(project)();
      closeModal();
      window.location.reload();
    }
  };

  return (
    <div className="project-description">
      <div className="project-text">
        <textarea
          onChange={() => {}}
          disabled={isInvestor}
          className="project-summary"
          value={summary}
        />
      </div>

      <div className="bus-plan-download">
        <a className="planLink" target="_blank" rel="noopener noreferrer" href={`${busLink}`}>
          <img src="frontend/images/icons/planIconTeal.png"></img>
          <span className="planText">business plan</span>
        </a>
      </div>
    </div>
  );
}

export function IframeFor3dModel(props) {
  // !props.projectClicked.model_id ? <div></div> :
  const componentToRender = (
    <div className="iframe">
      <iframe
        id="iframe"
        src={`${props.model_link}`}
        frameBorder="0"
        allowvr="yes"
        allow="vr; accelerometer; magnetometer; gyroscope;"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
      ></iframe>
    </div>
  );

  return componentToRender;
}
