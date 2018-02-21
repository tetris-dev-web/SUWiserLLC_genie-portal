import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './modal_style';

class StrategyModal extends React.Component {

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
        <div className="strategy-button" onClick={this.openModal}>STRATEGY</div>
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          contentLabel="Strategy Modal"
          className="modal-container strategy-container">
          <div className="black-close-modal-button close-modal-button"
            onClick={this.closeModal}>&times;</div>
          <div className="ft-modal-header-cont">
            <div className="ft-modal-header">
              Strategy
            </div>
          </div>
          <div className="ft-modal-body strategy-body">
            <object className="strategy-video"
              data="http://www.youtube.com/embed/W7qWa52k-nE"></object>
            <div className="ft-el-cont strategy-info">
              <h1 className="ft-el-header">Organizational Structure</h1>
              <p className="ft-el-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam dapibus at metus vel porta. Aenean nisi erat, venenatis a nulla iaculis,
                pretium maximus nibh. Maecenas ut malesuada magna. Cras nec eleifend purus,
                in vehicula arcu. Nullam pretium nisl magna, vitae porta tortor efficitur eget.
                Integer sed nulla placerat, molestie eros ac, mattis enim. Mauris in consequat risus.
                Vestibulum eu velit est. Suspendisse ullamcorper tempus mollis.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default StrategyModal;
