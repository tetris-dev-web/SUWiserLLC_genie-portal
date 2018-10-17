import React from 'react';

class ProjectIframe extends React.Component {
  constructor(props) {
    super(props);
    const project = this.props.project;
  }

  componentDidMount() {
    // var head = $("#iframe").contents().find("head");
    // var css = '<style type="text/css">' +
    // 'a img{visibility:hidden}; ' +
    // '</style>';
    //
    // $(head).append(css);

    console.log('mounted');
  }

  render() {
    let model_link;
    if(project.model_id.search('-') == -1) {
      model_link = "https://3dwarehouse.sketchup.com/embed.html?mid=" + project.model_id;
    } else {
      url = "https://poly.google.com/view/" + project.model_id + "/embed";
    }

    return (
      <div className="iframe">
        <iframe id="iframe" src={ `${model_link}` } frameBorder="0" allowvr="yes" allow="vr; xr; accelerometer; magnetometer; gyroscope;" allowFullScreen mozallowfullscreen="true" webkitallowfullscreen="true" ></iframe>
      </div>
    );
  }
}

export default ProjectIframe;
