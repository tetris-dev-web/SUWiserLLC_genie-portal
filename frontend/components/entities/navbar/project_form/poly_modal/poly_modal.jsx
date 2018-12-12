import React from 'react'
import ModalStyle from './modal_style';
import Modal from 'react-modal'

class PolyModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      openModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);



  }

  openModal() {
    this.setState({openModal: true});
  }

  closeModal() {
    this.setState({openModal: false});
  }

  render() {

    let model_link;
    if(this.props.modelId.search('-') != -1) {
      model_link = "https://3dwarehouse.sketchup.com/embed.html?mid=" + this.props.modelId;
    } else {
      model_link = "https://poly.google.com/view/" + this.props.modelId + "/embed";
    }

    return(
      <div>
        <div className="project-form-button model-id" onClick={this.openModal}>
          <svg className="project-form-button-icons" viewBox="-8 -8 160 160"><g><g><rect x="127.026" y="103.44" transform="matrix(0.8661 0.4999 -0.4999 0.8661 69.9909 -49.9074)" width="2.251" height="4.499" /><path d="M122.188,104.845l-3.863-2.23l2.25-3.896l3.863,2.23L122.188,104.845z M114.462,100.383l-3.863-2.23    l2.25-3.896l3.863,2.23L114.462,100.383z M106.734,95.921l-3.864-2.23l2.25-3.896l3.864,2.23L106.734,95.921z M99.007,91.459    l-3.863-2.23l2.25-3.896l3.863,2.23L99.007,91.459z M91.28,86.997l-3.864-2.23l2.25-3.896l3.864,2.23L91.28,86.997z     M83.552,82.535l-3.863-2.23l2.25-3.896l3.863,2.23L83.552,82.535z" /><polygon points="75.825,78.073 75.001,77.598 74.177,78.073 71.927,74.177 75.001,72.402 78.075,74.177   " /><path d="M27.812,104.843l-2.25-3.896l3.863-2.231l2.251,3.896L27.812,104.843z M35.539,100.381l-2.25-3.896    l3.864-2.23l2.25,3.896L35.539,100.381z M43.267,95.919l-2.25-3.896l3.863-2.23l2.25,3.896L43.267,95.919z M50.995,91.458    l-2.251-3.896l3.864-2.231l2.25,3.896L50.995,91.458z M58.722,86.996l-2.25-3.896l3.864-2.23l2.25,3.896L58.722,86.996z     M66.45,82.534l-2.25-3.896l3.863-2.23l2.25,3.896L66.45,82.534z" /><rect x="19.599" y="104.562" transform="matrix(0.5001 0.866 -0.866 0.5001 102.4474 33.9166)" width="4.499" height="2.251" /></g><g><rect x="72.751" y="72.75" width="4.5" height="2.25" /><path d="M77.251,68.288h-4.5v-4.462h4.5V68.288z M77.251,59.365h-4.5v-4.462h4.5V59.365z M77.251,50.442h-4.5    V45.98h4.5V50.442z M77.251,41.519h-4.5v-4.461h4.5V41.519z M77.251,32.596h-4.5v-4.462h4.5V32.596z M77.251,23.673h-4.5v-4.462    h4.5V23.673z" /><rect x="72.751" y="12.5" width="4.5" height="2.25" /></g><g><path d="M75.001,140.098l-56.377-32.549V42.451L75.001,9.902l56.375,32.551v65.098L75.001,140.098z     M23.124,104.951l51.877,29.951l51.875-29.949V45.051L75.001,15.098L23.124,45.049V104.951z" /><polygon points="75.001,77.598 19.749,45.698 21.999,41.802 75.001,72.402 128.001,41.804 130.251,45.7   " /><rect x="72.751" y="75" width="4.5" height="62.5" /></g></g></svg>
        </div>
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          >
          <div className="iframe">
            <iframe id="iframe" src={ `${model_link}` } frameBorder="0" allowvr="yes" allowFullScreen className="iframe" style={{width: "100%", height: "100%"}}></iframe>
          </div>
        </Modal>
    </div>
    )
  }
}

export default PolyModal;
