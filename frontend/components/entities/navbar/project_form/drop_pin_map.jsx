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

  // getAddress(latitude, longitude) {
  //   return new Promise(function (resolve, reject) {
  //     var request = new XMLHttpRequest();
  //
  //     var method = 'GET';
  //     var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyBdh7dx8oKj5iDtCAzBBCLNOEA94nf8Cl8';
  //     var async = true;
  //
  //     request.open(method, url, async);
  //     request.onreadystatechange = function () {
  //       if (request.readyState == 4) {
  //         if (request.status == 200) {
  //           var data = JSON.parse(request.responseText);
  //           var address = data.results[0].formatted_address;
  //           resolve(address);
  //         }
  //         else {
  //           reject(request.status);
  //         }
  //       }
  //     };
  //     request.send();
  //   }.bind(this));
  // }

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
      },
      error => {
        console.error(error);
      }
    );
    // let formattedAddress;
    // this.getAddress(this.state.latlng[0], this.state.latlng[1])
    // .then((data) => {
    //   this.setState({address: data});
    // }).bind(this)
    // .catch(console.error);
    // console.log(this.state.address);
  }

  render() {
    return (
      <div className='drop-pin-div'>
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
      </div>
    );
  }
}

export default DropPinMap;
