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
    console.log("testing if saving")

    const model_link = "https://poly.google.com/view/" + project.model_id + "/embed";

    return (
      <div className="iframe">
        <iframe id="iframe" src={ `${model_link}` } frameBorder="0" allowvr="yes" allow="vr; xr; accelerometer; magnetometer; gyroscope;" allowFullScreen mozallowfullscreen="true" webkitallowfullscreen="true" ></iframe>
        <iframe src="https://3dwarehouse.sketchup.com/embed.html?mid=51be9e3e-f32e-4825-a011-eac8a9132a00" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="580" height="326" allowfullscreen></iframe>

    </div>
    );
  }
}

export default ProjectIframe;
