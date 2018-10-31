import React from 'react';
import { Map, TileLayer, Marker, Popup }  from 'react-leaflet';

class DropPinMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latlng: [40.836678, -73.943083],
      marker: [40.836678, -73.943083],
      zoom: 14,
      title: 'Test'
    };
    this.updateMarker = this.updateMarker.bind(this);
  }

  updateMarker(e) {
    this.setState({marker: e.latlng});
  }

  render() {
    return (
      <Map
          center={this.state.latlng}
          zoom={this.state.zoom}
          dragging={true}
          scrollWheelZoom={false}
          onClick={this.updateMarker}
      >
        <TileLayer
          attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
      <Marker position={this.state.marker}>
          <Popup>
            {this.state.title}
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

export default DropPinMap;
