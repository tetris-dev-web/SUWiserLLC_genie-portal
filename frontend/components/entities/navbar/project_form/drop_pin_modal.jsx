import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './map_modal_style';
import DropPinMap from './drop_pin_map';

class DropPinModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
          <div className="drop-pin-container">
            <div className='drop-pin-flex'>
              <div className='address'>
                <div>street</div>
                <div>city</div>
              </div>
              <DropPinMap
                lat={this.props.lat}
                lng={this.props.lng}
                title={this.props.title}
                updateLatLng={this.props.updateLatLng}
                updateAddress={this.props.updateAddress}
                />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DropPinModal;
