import React from 'react';

class TokenGraphSideBar extends React.Component {
  constructor() {
    super();

    this.state = {
      showSideBarSubRects: false
    };

    this.handleHover = this.handleHover.bind(this);
  }

  handleHover() {
    this.setState({showSideBarSubRects: !this.state.showSideBarSubRects});
  }

  generateSubRects() {
    const { width, onHoverOverlaySubRects, onHoverSideBarSubRects, side } = this.props;
    const { showSideBarSubRects } = this.state;
    if (onHoverOverlaySubRects) {
      // console.log("overlay height", subRect.height)
      return onHoverOverlaySubRects.map((subRect, idx) => (
        <rect key={idx}
          className={subRect.className}
          width={width}
          height={subRect.height}
          y={subRect.y}></rect>
      ));
    } else {
      return onHoverSideBarSubRects.map((subRect, idx) => (
        showSideBarSubRects && <React.Fragment key={idx}>
          <rect className={subRect.className}
            width={width}
            height={subRect.height}
            y={subRect.y}></rect>
          <text y={subRect.y}
            x={side === "left" ? 110 : -70}>
            <tspan>{subRect.text}</tspan>
          </text>
        </React.Fragment>
      ));
    }
  }

  render() {
    const { width, x, backgroundHeight, side } = this.props;

    return (
      <svg className={`token-graph-side-bars ${side}`} x={x} width={width} height={backgroundHeight}>
        <g
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}>
          <rect
            className="token-graph-background-rect"
            width={width}
            height={backgroundHeight} />
          <g>
            {this.generateSubRects()}
          </g>
        </g>
      </svg>
    );
  }
}

export default TokenGraphSideBar;
