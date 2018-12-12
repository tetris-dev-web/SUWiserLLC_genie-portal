import React from 'react';

function DivWithCorners(props) {
  return(
    <div className="cornered-container">
        {props.children}
        <div className="top-left-corner"></div>

        <div className="top-right-corner"></div>

        <div className="bottom-left-corner"></div>
        
        <div className="bottom-right-corner"></div>
    </div>
  );
}

export default DivWithCorners;
