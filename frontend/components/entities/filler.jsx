import React from 'react';

// delete when the dashboard is implemented
class Filler extends React.Component {

  render() {

    const css = `
        .test1 {
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 1px solid black;
        }
    `;
    return(
      <div className="series content test1">
        <style>{css}</style>
        PROJECT DASHBOARD
      </div>
    );
  }
}

export default Filler;
