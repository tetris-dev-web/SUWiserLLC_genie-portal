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
          attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
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

// <TileLayer
//   attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// />

export default ProjectMap;
