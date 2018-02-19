import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './modal_style';

class BylawsModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
    };

    window.SessionOpenModal = () => {
      this.setState({openModal: true});
    };

    window.SessionOpenModal = window.SessionOpenModal.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ openModal: true });
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    return(
      <div>
        <div className="bylaw-button" onClick={this.openModal}>BYLAWS</div>
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          contentLabel="Bylaws Modal"
          className="bylaws-container">
          <div className="bylaws-header">Bylaws</div>
          <div className="bylaws-body">
            <div id="blm-el-1">
              <h1 id="blm-h-1">Organizational Structure</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam dapibus at metus vel porta. Aenean nisi erat, venenatis a nulla iaculis,
                pretium maximus nibh. Maecenas ut malesuada magna. Cras nec eleifend purus,
                in vehicula arcu. Nullam pretium nisl magna, vitae porta tortor efficitur eget.
                Integer sed nulla placerat, molestie eros ac, mattis enim. Mauris in consequat risus.
                Vestibulum eu velit est. Suspendisse ullamcorper tempus mollis.
                Fusce non egestas arcu. Morbi et urna risus. Nulla a volutpat risus.</p>
            </div>
            <img id="blm-el-2" src="http://res.cloudinary.com/genus-development/image/upload/v1503949307/Genie%20Portal/Bylaws/square_eocr66.svg"></img>
            <div id="blm-el-3">
              <h1 id="blm-h-2">Decision Making</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam dapibus at metus vel porta. Aenean nisi erat, venenatis a nulla iaculis,
                pretium maximus nibh. Maecenas ut malesuada magna. Cras nec eleifend purus,
                in vehicula arcu. Nullam pretium nisl magna, vitae porta tortor efficitur eget.
                Integer sed nulla placerat, molestie eros ac, mattis enim. Mauris in consequat risus.
                Vestibulum eu velit est. Suspendisse ullamcorper tempus mollis.
                Fusce non egestas arcu. Morbi et urna risus. Nulla a volutpat risus.</p>
            </div>
            <img id="blm-el-4" src="http://res.cloudinary.com/genus-development/image/upload/v1503949307/Genie%20Portal/Bylaws/people_dxn1lj.svg"></img>
            <div id="blm-el-5">
              <h1 id="blm-h-3">Fees and Compensation</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam dapibus at metus vel porta. Aenean nisi erat, venenatis a nulla iaculis,
                pretium maximus nibh. Maecenas ut malesuada magna. Cras nec eleifend purus,
                in vehicula arcu. Nullam pretium nisl magna, vitae porta tortor efficitur eget.
                Integer sed nulla placerat, molestie eros ac, mattis enim. Mauris in consequat risus.
                Vestibulum eu velit est. Suspendisse ullamcorper tempus mollis.
                Fusce non egestas arcu. Morbi et urna risus. Nulla a volutpat risus.</p>
            </div>
            <img id="blm-el-6" src="http://res.cloudinary.com/genus-development/image/upload/v1503949307/Genie%20Portal/Bylaws/wheel_micggb.svg"></img>
          </div>
        </Modal>
      </div>
    );
  }
}

export default BylawsModal;
