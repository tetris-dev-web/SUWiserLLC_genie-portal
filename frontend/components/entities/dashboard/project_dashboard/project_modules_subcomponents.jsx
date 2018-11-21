import React from 'react';

export function CloseButton (props){
  return <div className="black-close-modal-button close-modal-button"
    onClick={props.closeModal}>&times;</div>
}


export function Title (props){
  return (
    <div className="ft-modal-header-cont">
      <div className="ft-modal-header bylaws-header">
        {props.nameOfProject}
      </div>
    </div>)
}


export function SummaryAndPlan (props){
  //need to make data persist

  // handleKeyPress(e) {
  //   alert('PRESSED'); //if enter key pressed, save to database
  // }
  return (
    <div className="project-description">

      <div className="project-text">
        <div  onKeyPress={null}
              contentEditable={!props.isInvestor}
              className="project-summary"
              suppressContentEditableWarning={true}>

              {props.summary}

        </div>
      </div>

      <div className="bus-plan-download">
        <a  target="_blank"
            rel="noopener noreferrer"
            href={ `${props.bus_plan_link}` }>
          <i className="fas fa-file-contract">
            <span>business plan</span>
          </i>
        </a>
      </div>

    </div>
  )
}


export function IframeFor3dModel (props) {
  const componentToRender= !props.projectClicked.model_id ? <div></div> :
      <div className="iframe">
        <iframe id="iframe" src={ `${props.model_link}` }
                frameBorder="0"
                allowvr="yes"
                allow="vr; accelerometer; magnetometer; gyroscope;"
                allowFullScreen mozallowfullscreen="true"
                webkitallowfullscreen="true" >
        </iframe>
      </div>

  return componentToRender
}
