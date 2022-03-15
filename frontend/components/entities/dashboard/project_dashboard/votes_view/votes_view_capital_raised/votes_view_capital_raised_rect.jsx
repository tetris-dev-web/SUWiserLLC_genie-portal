import React from "react";

const VotesViewCapitalRaisedRect = (props) => {
  const [state, setState] = React.useState({
    showText: false,
  });

  const handleHover = (boolean) => {
    return () => {
      setState({ showText: boolean });
    };
  };

  const { x, y, height, fill, opacity, textToDisplay } = props;

  return (
    <g onMouseEnter={handleHover(true)} onMouseLeave={handleHover(false)}>
      <rect x={x} y={y} width="100%" height={height} fill={fill} opacity={opacity}></rect>

      {state.showText && textToDisplay()}
    </g>
  );
};

export default VotesViewCapitalRaisedRect;
// {voteBreakdownText && voteBreakdownText()}
