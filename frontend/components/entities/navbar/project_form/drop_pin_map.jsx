import React from 'react';
import { Map, TileLayer, Marker, Popup }  from 'react-leaflet';
import Geocode from 'react-geocode';

class DropPinMap extends React.Component {

  constructor(props) {
    super(props);
    const {lat, lng, title} = this.props;
    this.state = {
      latlng: [lat, lng],
      marker: [lat, lng],
      zoom: 14,
      title: title,
      address: '',
    };
    this.updateMarker = this.updateMarker.bind(this);
    // this.getAddress = this.getAddress.bind(this);
  }

  componentDidMount() {
  }

  updateMarker(e) {
    this.props.updateLatLng(e.latlng);
    this.setState({marker: e.latlng});
    Geocode.setApiKey('AIzaSyBdh7dx8oKj5iDtCAzBBCLNOEA94nf8Cl8');
    Geocode.fromLatLng(this.state.marker.lat, this.state.marker.lng).then(
      response => {
        console.log(response)
        const address = response.results[0].formatted_address;
        this.setState({address: address});
        console.log(this.state.address)
        this.props.updateAddress(this.state.address);
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    return (
      <Map
        center={this.state.latlng}
        zoom={this.state.zoom}
        dragging={true}
        scrollWheelZoom={false}
        onClick={this.updateMarker}
        style={{borderRadius: '0px 10px 10px 0px'}}
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

export default DropPinMap;
