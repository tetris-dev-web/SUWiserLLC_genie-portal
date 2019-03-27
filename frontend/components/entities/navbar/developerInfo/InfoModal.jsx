import React from 'react';
import './modal_styles.scss';

class InfoModal extends React.Component {

  constructor(props) {
    super(props);
    console.log("insideInfoModal", this.props);
    this.generateContent = this.generateContent.bind(this);
  }

  generateContent() {
    const Section = (props) => (
      <div className="info-section">
        <h1 className="section-header">{props.header}</h1>
        <p className="section-text">
          {props.content}
        </p>
        <br/>
      </div>
    )

    const {content} = this.props

    let sections = [];
    for(let eachSection in content){
      console.log("sections", eachSection);
        sections.push( < Section
                        key={eachSection}
                        header={eachSection}
                        content={content[eachSection]}
                         /> )
    }
    return sections;
  }
  render() {
    const Header = (props) => (
      <div className="modal-header">
        {props.modalTitle}
      </div>
    )
    const Diagram = (props) => {
      console.log("diagram", props.diagram, typeof props.diagram);
      if(typeof props.diagram === "string"){
        return (<object alt="diagram"
                        className="diagram"
                        data={props.diagram}>
                </object>)
      }else{
        return props.diagram
      }
    }
    return(
      <div className="InfoModal">
          <Header modalTitle={this.props.modalTitle} />
          <Diagram diagram={this.props.upperFigure} />
          {this.generateContent()}
          <Diagram diagram={this.props.lowerFigure} />
      </div>
    );
  }
}
export default InfoModal;
