import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class ProjectMap extends React.Component {

  render() {
    const position =[51.505,-0.09];
    return(
      <Map center={position} zoom={13} dragging={false}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default ProjectMap;
