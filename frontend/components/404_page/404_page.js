import React from "react";

const FourOhFourPage = (props) => {
  const { title, description } = props;

  return (
    <div className="_404_prompt" style={{ display: "flex", margin: "auto" }}>
      <div className="_404_message" style={{ display: "flex", flexDirection: "column" }}>
        <h1 className="_404_title" style={{ margin: "auto", fontSize: "90px", fontFamily: "none" }}>
          {title}
        </h1>
        <p className="_404_description" style={{ fontSize: "30px", margin: "30px" }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default FourOhFourPage;
