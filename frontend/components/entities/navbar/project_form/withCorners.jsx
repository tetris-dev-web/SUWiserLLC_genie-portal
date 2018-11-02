import React from 'react';

function DivWithCorners(props) {
  return(
    <div className="cornered-container">
      <div className="cornered-div">
        {props.children}

        <div className="top-corner-div">
          <div className="top-corner"></div>
        </div>

        <div className="top-corner-div right">
          <div className="top-corner"></div>
        </div>

        <div className="bottom-corner-div">
          <div className="bottom-corner"></div>
        </div>
        <div className="bottom-corner-div right">
          <div className="bottom-corner"></div>
        </div>
      </div>


    </div>
  );
}

export default DivWithCorners;
