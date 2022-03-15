import React from "react";
import "./modal_styles.scss";

const InfoModal = (props) => {
  const { content, modalTitle, upperFigure, lowerFigure } = props;

  console.log("insideInfoModal", props);

  const generateContent = () => {
    const Section = (props) => (
      <div className="info-section">
        <h1 className="section-header">{props.header}</h1>
        <p className="section-text">{props.content}</p>
        <br />
      </div>
    );

    let sections = [];
    for (let eachSection in content) {
      console.log("sections", eachSection);
      sections.push(
        <Section key={eachSection} header={eachSection} content={content[eachSection]} />,
      );
    }
    return sections;
  };

  const Header = (props) => <div className="modal-header">{props.modalTitle}</div>;

  const Diagram = (props) => {
    console.log("diagram", props.diagram, typeof props.diagram);
    if (typeof props.diagram === "string") {
      return <object alt="diagram" className="diagram" data={props.diagram}></object>;
    } else {
      return props.diagram;
    }
  };

  return (
    <div className="InfoModal">
      <Header modalTitle={modalTitle} />
      <Diagram diagram={upperFigure} />
      {generateContent()}
      <Diagram diagram={lowerFigure} />
    </div>
  );
};
export default InfoModal;
