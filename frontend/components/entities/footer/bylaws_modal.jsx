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
          className="modal-container">
          <div className="black-close-modal-button close-modal-button"
            onClick={this.closeModal}>&times;</div>
          <div className="ft-modal-header-cont">
            <div className="ft-modal-header bylaws-header">
              Bylaws
            </div>
          </div>
          <div className="ft-modal-body bylaws-body">
            <div className="ft-el-cont">
              <h1 className="ft-el-header">Organizational Structure</h1>
              <div className="ft-el-info">
                <p className="ft-el-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam dapibus at metus vel porta. Aenean nisi erat, venenatis a nulla iaculis,
                  pretium maximus nibh. Maecenas ut malesuada magna. Cras nec eleifend purus,
                  in vehicula arcu. Nullam pretium nisl magna, vitae porta tortor efficitur eget.
                  Integer sed nulla placerat, molestie eros ac, mattis enim. Mauris in consequat risus.
                  Vestibulum eu velit est. Suspendisse ullamcorper tempus mollis.
                  Fusce non egestas arcu. Morbi et urna risus. Nulla a volutpat risus.</p>
                <img className="ft-el-img" src="http://res.cloudinary.com/genus-development/image/upload/v1503949307/Genie%20Portal/Bylaws/square_eocr66.svg"></img>
              </div>
            </div>
            <div className="ft-el-cont">
              <h1 className="ft-el-header">Decision Making</h1>
              <div className="ft-el-info">
                <p className="ft-el-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam dapibus at metus vel porta. Aenean nisi erat, venenatis a nulla iaculis,
                  pretium maximus nibh. Maecenas ut malesuada magna. Cras nec eleifend purus,
                  in vehicula arcu. Nullam pretium nisl magna, vitae porta tortor efficitur eget.
                  Integer sed nulla placerat, molestie eros ac, mattis enim. Mauris in consequat risus.
                  Vestibulum eu velit est. Suspendisse ullamcorper tempus mollis.
                  Fusce non egestas arcu. Morbi et urna risus. Nulla a volutpat risus.</p>
                <img className="ft-el-img" src="http://res.cloudinary.com/genus-development/image/upload/v1503949307/Genie%20Portal/Bylaws/people_dxn1lj.svg"></img>
              </div>
            </div>
            <div className="ft-el-cont">
              <h1 className="ft-el-header">Fees and Compensation</h1>
              <div className="ft-el-info">
                <p className="ft-el-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam dapibus at metus vel porta. Aenean nisi erat, venenatis a nulla iaculis,
                  pretium maximus nibh. Maecenas ut malesuada magna. Cras nec eleifend purus,
                  in vehicula arcu. Nullam pretium nisl magna, vitae porta tortor efficitur eget.
                  Integer sed nulla placerat, molestie eros ac, mattis enim. Mauris in consequat risus.
                  Vestibulum eu velit est. Suspendisse ullamcorper tempus mollis.
                  Fusce non egestas arcu. Morbi et urna risus. Nulla a volutpat risus.</p>
                <img className="ft-el-img" src="http://res.cloudinary.com/genus-development/image/upload/v1503949307/Genie%20Portal/Bylaws/wheel_micggb.svg"></img>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default BylawsModal;
