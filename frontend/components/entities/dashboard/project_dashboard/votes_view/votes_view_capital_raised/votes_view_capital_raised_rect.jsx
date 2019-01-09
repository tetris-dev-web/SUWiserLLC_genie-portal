import React from 'react';

const VotesViewCapitalRaisedRect = ({x, y, height, fill, hovered, setHoveredState}) => (
    <rect x={x} y={y} width="100%" height={height} fill={fill} opacity="0.5" hovered={hovered}
      onMouseOver={setHoveredState()} onMouseLeave={setHoveredState()}> </rect>
);

export default VotesViewCapitalRaisedRect;
