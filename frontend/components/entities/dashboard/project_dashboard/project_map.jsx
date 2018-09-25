import React from 'react';
import { Map, TileLayer, Marker, Popup }  from 'react-leaflet';

class ProjectMap extends React.Component {

  constructor(props) {
    super(props);
    const project = this.props.projectClicked;
    this.state = {
      project: this.props.projectClicked,
      lat: parseFloat(project.latitude),
      lng: parseFloat(project.longitude),
      zoom: 14,
    };
  }


  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map
          center={position}
          zoom={this.state.zoom}
          dragging={false}
          scrollWheelZoom={false}
      >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {this.state.project.title}
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default ProjectMap;
