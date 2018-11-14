import React from 'react';
import ReactDOM from 'react-dom';

class DashboardModal extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        modalIsOpen: false,
      };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
   this.setState({modalIsOpen: false});
 }

  render(){
    return (
      <React.Fragment>
        <h2>Dashboard Modal!</h2>
          <div className="black-close-modal-button close-modal-button"
            onClick={this.closeModal}>&times;</div>
          My text here. <br />
          More text. <br />
      </React.Fragment>
    );
  }
}

export default DashboardModal;
