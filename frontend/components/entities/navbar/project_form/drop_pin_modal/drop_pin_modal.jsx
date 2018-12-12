import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './map_modal_style';
import DropPinMap from './drop_pin_map';
import DropPinAddress from './drop_pin_address';

class DropPinModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.displayLatLng = this.displayLatLng.bind(this);
    // this.updateAddress = this.updateAddress.bind(this);
  }

  // displayLatLng(pos) {
  //   this.setState({lat: pos.lat, lng: pos.lng});
  // }
  //
  // updateAddress(address){
  //   this.setState({address: address})
  // }

  openModal() {
    console.log('modal props', this.props);
    if(!isNaN(this.props.lat) && !isNaN(this.props.lng)) {
      this.setState({openModal: true});
    } else {
      this.props.dropPinClick();
    }
  }

  closeModal() {
    this.setState({openModal: false});
  }

  render() {
    return (
      <div>
        <div className="project-form-button drop-pin">
          <svg className="project-form-button-icons" viewBox="0 0 100 100" onClick={this.openModal}><path d="M53,55.7a19.5,19.5,0,1,0-6,0V77h0c0,1.7,1.3,5.9,3,5.9s3-4.2,3-5.9h0ZM50,50A13.5,13.5,0,1,1,63.5,36.5,13.6,13.6,0,0,1,50,50Z" /></svg>
        </div>
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          >

          <div className='drop-pin-flex'>
            <DropPinAddress
              lat={this.props.lat}
              lng={this.props.lng}
              updateLatLng={this.props.updateLatLng}
              city={this.props.city}
              continent={this.props.continent}
              closeModal={this.closeModal}
              />
            <div className="drop-pin-container">
              <DropPinMap
                lat={this.props.lat}
                lng={this.props.lng}
                title={this.props.title}
                updateLatLng={this.props.updateLatLng}
                storeAddress={this.props.storeAddress}
                />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DropPinModal;









// displayLatLng={this.displayLatLng}
