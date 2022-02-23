import React from "react";

const ProjectIframe = (props) => {
  const { project } = props;
  let model_link;
  if (project.model_id.search("-") == -1) {
    model_link = "https://3dwarehouse.sketchup.com/embed.html?mid=" + project.model_id;
  } else {
    model_link = "https://poly.google.com/view/" + project.model_id + "/embed";
  }

  return (
    <div className="iframe">
      <iframe
        id="iframe"
        src={`${model_link}`}
        frameBorder="0"
        allowvr="yes"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ProjectIframe;
