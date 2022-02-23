import React, { useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const ProjectMap = (props) => {
  const { projectClicked } = props;
  const project = projectClicked;
  const [state, setState] = useState({
    project: props.projectClicked,
    lat: parseFloat(project.lat),
    lng: parseFloat(project.lng),
    zoom: 14,
  });
  const position = [state.lat, state.lng];
  return (
    <div className="project-map">
      <Map center={position} zoom={state.zoom} dragging={true} scrollWheelZoom={false}>
        <TileLayer
          attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{state.project.title}</Popup>
        </Marker>
      </Map>
    </div>
  );
};

export default ProjectMap;
