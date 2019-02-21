import React from 'react';
import Modal from 'react-modal';
import CashFlowInputSheet from './cashflow_input_sheet';
import CashFlowGraph from '../../../dashboard/project_dashboard/project_cashflow_graph.jsx';
import ModalStyle from './modal_style';

class CashFlowModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false
    };

    window.SessionOpenModal = () => {
      this.setState({openModal: true});
    };

    window.SessionOpenModal = window.SessionOpenModal.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // solves 'Warning: react-modal: App element is not defined'
  UNSAFE_componentWillMount() {
    Modal.setAppElement('body');
  }

  componentWillUnmount(){
  }

  openModal() {
    this.setState({openModal: true});
    console.log();
  }

  closeModal(e) {
    // console.log("this is: ", this);
    // const { cashflow } = this.cashflowInputSheet.state.cashflow
    // console.log("refs are: ", this.refs);
    // console.log("Cashflow from inputsheet is: ", cashflow);
    // console.log("E is: ", e);
    // this.props.updateCashflow(cashflow)(e);
    this.setState({openModal: false});
    this.props.receiveCashflowData();
  }

  render() {
    return (
      <div>
        <div className="project-form-button cashflow">
          <svg className="project-form-button-icons" onClick={this.openModal} viewBox="-40 219.5 640 800"><g><path d="M306.7,722.9l-227.7-1c-3.9,0-7-3.2-7-7c0-3.9,3.1-7,7-7c0,0,0,0,0,0l227.7,1c63.1,0,120.3-34.9,149.2-91.1   c1.8-3.4,6-4.8,9.4-3s4.8,6,3,9.4C437,685.1,375.1,722.9,306.7,722.9z" /><path d="M475.9,591.7c-0.6,0-1.2-0.1-1.7-0.2c-3.7-1-6-4.8-5-8.5c3.5-13.5,5.2-27.5,5.2-41.7c0-3.9,3.1-7,7-7   s7,3.1,7,7c0,15.3-1.9,30.5-5.7,45.1C481.8,589.6,479,591.7,475.9,591.7z" /><path d="M300.8,656.8c-4.9,0-9.9-0.3-14.8-0.9c-24.6-3.1-47.9-14.6-65.8-32.4s-29.3-41.2-32.4-65.8   c-4.1-32.7,5.9-65.6,27.5-90.1C237,443,268.1,429,300.8,429c4.9,0,9.9,0.3,14.8,0.9c24.6,3.1,47.9,14.6,65.8,32.4   c17.8,17.8,29.3,41.2,32.4,65.8c4.1,32.7-5.9,65.6-27.5,90.1C364.6,642.7,333.5,656.8,300.8,656.8z M300.8,443   c-28.7,0-56,12.3-75,33.9c-19.2,21.8-27.8,49.9-24.1,79.1c5.6,44.3,41.8,80.5,86.1,86.1c4.3,0.5,8.7,0.8,13,0.8   c28.7,0,56-12.3,75-33.9c19.2-21.8,27.8-49.9,24.1-79.1c-5.6-44.3-41.8-80.5-86.1-86.1C309.5,443.2,305.1,443,300.8,443z" /><path d="M257.7,647.5c-57.7,0-104.7-47-104.7-104.7s47-104.7,104.7-104.7c3.9,0,7,3.1,7,7s-3.1,7-7,7   c-50,0-90.7,40.7-90.7,90.7c0,50,40.7,90.7,90.7,90.7c3.9,0,7,3.1,7,7S261.5,647.5,257.7,647.5z" /><path d="M260.4,593.5c-1.8,0-3.6-0.7-4.9-2c-11.9-11.9-18.5-27.7-18.5-44.6c0-16.8,6.6-32.7,18.5-44.6   c2.7-2.7,7.2-2.7,9.9,0c2.7,2.7,2.7,7.2,0,9.9c-9.3,9.3-14.4,21.6-14.4,34.7c0,13.1,5.1,25.4,14.4,34.7c2.7,2.7,2.7,7.2,0,9.9   C264,592.8,262.2,593.5,260.4,593.5z" /><path d="M133.5,776.4c-1.8,0-3.6-0.7-4.9-2l-54.5-54.5c-2.7-2.7-2.7-7.2,0-9.9l52.4-52.4c2.7-2.7,7.2-2.7,9.9,0   c2.7,2.7,2.7,7.2,0,9.9l-47.5,47.5l49.5,49.5c2.7,2.7,2.7,7.2,0,9.9C137.1,775.7,135.3,776.4,133.5,776.4z" /><path d="M96.7,467.3c-1.1,0-2.2-0.2-3.2-0.8c-3.4-1.8-4.8-6-3-9.4c31.3-60.9,93.2-98.7,161.6-98.7l227.7,1   c3.9,0,7,3.2,7,7c0,3.9-3.2,7-7,7l-227.7-1c-63.1,0-120.3,34.9-149.2,91.1C101.7,465.9,99.3,467.3,96.7,467.3z" /><path d="M427.4,425.8c-1.8,0-3.6-0.7-5-2.1c-2.7-2.7-2.7-7.2,0-9.9l47.5-47.5l-49.5-49.5c-2.7-2.7-2.7-7.2,0-9.9   c2.7-2.7,7.2-2.7,9.9,0l54.5,54.5c1.3,1.3,2,3.1,2,4.9s-0.7,3.6-2.1,4.9l-52.4,52.4C431,425.1,429.2,425.8,427.4,425.8z" /></g></svg>
        </div>
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          contentLabel="Manage Modal"
          className="modal-container">
          <CashFlowInputSheet
            closeModal={this.closeModal}
            cashflow={this.props.cashflow}
            quarter={this.props.quarter}
            updateCashflow={this.props.updateCashflow}
            ref={(cashflowInputSheet) => {this.cashflowInputSheet = cashflowInputSheet;}}
            updateActuals={this.props.updateActuals}
            updateCashflowValue={this.props.updateCashflowValue}
            />
        </Modal>
      </div>
    );
  }
}
// <CashFlowGraph />

export default CashFlowModal;
