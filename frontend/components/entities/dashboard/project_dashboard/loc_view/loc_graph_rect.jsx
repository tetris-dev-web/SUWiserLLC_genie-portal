import React from 'react';

class LocGraphRect extends React.Component {
  constructor() {
    super();

    this.state = {
      showText: false
    };
  }

  handleHover(boolean) {
    return () => {
      this.setState({showText: boolean});
    };
  }

  render() {
    const { className, transform, text } = this.props;
    const { showText } = this.state;

    return (
      <g className={`${className}-group`}
      transform={transform}>
        <rect className={className}
          onMouseEnter={this.handleHover(true)}
          onMouseLeave={this.handleHover(false)}></rect>
        {
          // showText &&
          <text y={-10}>{text}</text>
        }
      </g>
    );
  }
}

export default LocGraphRect;