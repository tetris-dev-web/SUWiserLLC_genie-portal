import React from 'react';

class LocGraphCircle extends React.Component {
  constructor() {
    super();

    this.state = {
      showText: false
    };
  }

  handleHover(boolean) {
    return () => {
      this.setState({ showText: boolean });
    };
  }

  render() {
    const { className, transform, r, fill, text } = this.props;
    const { showText } = this.state;

    return (
      <g className={`${className}-group`}
        transform={transform}
        onMouseEnter={this.handleHover(true)}
        onMouseLeave={this.handleHover(false)}>
        <circle className={`${className} outter`}
          r={r}
          fill={fill}></circle>
        <circle className={`${className} inner`}
          r="10"
          fill="white"></circle>
        {
          showText &&
          <text y={-r - 10}>{text}</text>
        }
      </g>
    );
  }
}

export default LocGraphCircle;