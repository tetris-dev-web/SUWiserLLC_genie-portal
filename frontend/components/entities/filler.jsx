import React from 'react';

// delete when the dashboard is implemented
class Filler extends React.Component {

  render() {

    const css = `
        .test1 {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `
    return(
      <div className="series content test1">
        <style>{css}</style>
        CONTENT
      </div>
    );
  }
}

export default Filler;
