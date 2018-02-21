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
          className="strategy-container">
          <div className="strategy-header">Strategy</div>
          <div className="strategy-body">

            <object className="strategy-video" data="http://www.youtube.com/embed/W7qWa52k-nE"
   width="560" height="315"></object>

            <div className="strategy-info">
              <h1 id="sm-h-1">Organizational Structure</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
