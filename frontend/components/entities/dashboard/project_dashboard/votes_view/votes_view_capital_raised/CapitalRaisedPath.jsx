import React from "react";
// import QuestionIcon from '../../../../../../images/icons/question.svg'

const CapitalRaisedPath = ({ d, opacity, transform }) => {
  const PathPointsArray = d.split(",");
  const lastPoint = PathPointsArray.slice(-1);
  const secondTolastPoint = PathPointsArray.slice(-2);
  const lastxFactor = secondTolastPoint[0].split("L")[1];
  console.log("CapitalRaisedPath.PROP[d]=", d);

  const QuestionIcon = (props) => (
    <svg
      x={parseInt(props.x) - parseInt(props.width) / 2}
      y={parseInt(props.y) - parseInt(props.height) / 2}
      width={props.width}
      height={props.height}
      viewBox="275.04 19.04 409.92 409.92"
    >
      <circle fill="#FFFFFF" cx="483.62" cy="224" r="138" />
      <path
        className="questionIcon"
        fill="#61ABA9"
        d="M480,19.04c-113.017,0-204.96,91.943-204.96,204.96c0,113.017,91.943,204.96,204.96,204.96
						c113.017,0,204.96-91.943,204.96-204.96C684.96,110.983,593.017,19.04,480,19.04z M479.812,341.972
						c-13.095,0-23.708-10.613-23.708-23.708c0-13.096,10.613-23.708,23.708-23.708c13.096,0,23.708,10.612,23.708,23.708
						C503.52,331.358,492.907,341.972,479.812,341.972z M530.74,222.898c-13.476,10.031-27.879,18.18-30.696,36.651v11.917h-42.287
						v-14.094c1.873-27.265,14.717-39.473,27.247-49.186c12.217-9.704,22.866-16.903,22.866-33.829c0-19.111-10.018-28.192-26.616-28.192
						c-22.547,0-31.946,18.48-32.269,40.723h-46.046c0.945-44.791,30.388-77.37,76.115-77.37c59.203,0,78.006,36.337,78.006,60.444
						C557.061,200.354,544.217,212.571,530.74,222.898z"
      />
    </svg>
  );

  return (
    <g transform={transform}>
      <path className="CapitalRaisedPath" d={d} opacity={opacity}></path>
      <QuestionIcon x={lastxFactor} y={lastPoint} width="30px" height="30px" />
    </g>
  );
};

export default CapitalRaisedPath;
