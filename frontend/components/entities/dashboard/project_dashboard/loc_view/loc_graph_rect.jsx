import React from "react";

const LocGraphRect = (props) => {
  const { className, transform, text } = props;
  const [showText, setShowText] = useState(false);

  const handleHover = (boolean) => {
    return () => {
      setShowText(boolean);
    };
  };

  return (
    <g className={`${className}-group`} transform={transform}>
      <rect
        className={className}
        onMouseEnter={handleHover(true)}
        onMouseLeave={handleHover(false)}
      ></rect>
      {
        // showText &&
        <text y={-10}>{text}</text>
      }
    </g>
  );
};

export default LocGraphRect;
