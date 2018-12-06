import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './map_modal_style';
import DropPinMap from './drop_pin_map';

class DropPinModal extends React.Component {
  constructor(props) {
    super(props);
    const {lat, lng } = this.props
    this.state = {
      openModal: false,
      lat: lat,
      lng: lng,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.displayLatLng = this.displayLatLng.bind(this);
  }

  displayLatLng(pos) {
    this.setState({lat: pos.lat, lng: pos.lng});
  }

  openModal() {
    console.log('modal props', this.props);
    if(this.props.lat != '' && this.props.lng != '') {
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
        <div onClick={this.openModal}>Drop Pin</div>
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          >
          <div className='drop-pin-flex'>
            <div className='address'>
              <input value={this.state.lat}></input>
              <input value={this.state.lng}></input>
              <div>street</div>
              <div>city</div>
            </div>
            <div className="drop-pin-container">
              <DropPinMap
                lat={this.props.lat}
                lng={this.props.lng}
                title={this.props.title}
                updateLatLng={this.props.updateLatLng}
                updateAddress={this.props.updateAddress}
                displayLatLng={this.displayLatLng}
                />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DropPinModal;
