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
    const { className, x, y } = this.props;

    return (
      <rect className={className}
        x={x} y={y}></rect>
    );
  }
}

export default LocGraphRect;