import React from 'react';

class LocGraphCircle extends React.Component {
  constructor() {
    super();

    this.state = {
      showText: false
    };
  }

  render() {
    const { className, transform, r, fill } = this.props;

    return (
      <g className={`${className}-group`}
        transform={transform}>
        <circle className={`${className} outter`}
          r={r}
          fill={fill}></circle>
        <circle className={`${className} inner`}
          r="10"
          fill="white"></circle>
      </g>
    );
  }
}

export default LocGraphCircle;