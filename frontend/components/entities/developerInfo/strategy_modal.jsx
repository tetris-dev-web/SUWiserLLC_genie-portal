import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './modal_style';
import './project_view.scss';
import DoomsDayDetail from './dooms_day_detail';

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

  openModal(e) {
    e.stopPropagation();
    this.setState({ openModal: true });
    this.props.toggle('StrategyModalToggle');
  }

  closeModal() {
    this.setState({ openModal: false });
    this.props.toggle('StrategyModalToggle');
  }

  render() {
    return(
      <div>
        <div className="strategy-button overSubButtonText" onClick={this.openModal}>STRATEGY</div>
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
              data="http://www.youtube.com/embed/pvG9u1tYYn4"></object>
            <div className="ft-el-cont strategy-info">
              <h1 className="ft-el-header">STRATEGY</h1>
              <p className="ft-el-text">Genus Development Partners is an integrated real estate investment, design and development company headquartered in New York City that focuses on innovative and synergistic multi-use projects in central areas of large multi-cultural cities throughout the Americas. Each project will integrate a workshare/cooperative element. Current geographical foci are New York City, Philadelphia, Bogota and Puerto Rico. Genus Development will host a portal where potential investors can analyze projects through a data-driven dashboard. Stakes in each each project may be purchased as blockchain ledgered tokens that are tradable on secondary markets.
              </p>
            </div>
          </div>
          <div className='doomsday-style'>
            <DoomsDayDetail />
          </div>
        </Modal>
      </div>
    );
  }
}

export default StrategyModal;
