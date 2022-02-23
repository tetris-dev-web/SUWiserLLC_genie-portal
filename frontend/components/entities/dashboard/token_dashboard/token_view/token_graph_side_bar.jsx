import React, { useState } from "react";

const TokenGraphSideBar = (props) => {
  const { width, x, backgroundHeight, side, onHoverOverlaySubRects, onHoverSideBarSubRects } =
    props;
  const [showSideBarSubRects, setShowSidebarSubRects] = useState(false);

  const handleHover = () => {
    setShowSidebarSubRects(!showSideBarSubRects);
  };

  const generateSubRects = () => {
    if (onHoverOverlaySubRects) {
      // console.log("overlay height", subRect.height)

      return onHoverOverlaySubRects.map((subRect, idx) => (
        <rect
          key={idx}
          className={subRect.className}
          width={width}
          height={subRect.height}
          y={subRect.y}
        ></rect>
      ));
    } else {
      return onHoverSideBarSubRects.map(
        (subRect, idx) =>
          showSideBarSubRects && (
            <React.Fragment key={idx}>
              <rect
                className={subRect.className}
                width={width}
                height={subRect.height}
                y={subRect.y}
              ></rect>
              <text y={subRect.y} x={side === "left" ? 110 : -70}>
                <tspan>{subRect.text}</tspan>
              </text>
            </React.Fragment>
          ),
      );
    }
  };

  return (
    <svg className={`token-graph-side-bars ${side}`} x={x} width={width} height={backgroundHeight}>
      <g onMouseEnter={handleHover} onMouseLeave={handleHover}>
        <rect className="token-graph-background-rect" width={width} height={backgroundHeight} />
        <g>{generateSubRects()}</g>
      </g>
    </svg>
  );
};

export default TokenGraphSideBar;
