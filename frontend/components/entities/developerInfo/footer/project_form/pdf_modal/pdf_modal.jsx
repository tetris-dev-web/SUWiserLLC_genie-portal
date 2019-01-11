import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './modal_style';

class PDFModal extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
				openModal: false
		};

		window.SessionOpenModal = () => {
				this.setState({ openModal: true });
		};

		window.SessionOpenModal = window.SessionOpenModal.bind(this);

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	
	UNSAFE_componentWillMount() {
		Modal.setAppElement('body');
	}

	openModal() {
		this.setState({ openModal: true });
	}

	closeModal() {
		this.setState({ openModal: false });
	}

	render() {
		const { planFilePDFDataURL } = this.props;
		return (
			<div>
				<div className="project-form-button pdf">
					<svg className="project-form-button-icons" onClick={this.openModal} viewBox="-8 -8 80 80"><g><path d="M61,10H19.941A9,9,0,0,0,2,11V53a9.01,9.01,0,0,0,9,9H61a1,1,0,0,0,1-1V11A1,1,0,0,0,61,10ZM4,11a7,7,0,0,1,14,0V47.349a8.99,8.99,0,0,0-14,0ZM60,60H11a7,7,0,1,1,7-7,1,1,0,0,0,2,0V12H60Z" /><path d="M25,56H55a1,1,0,0,0,1-1V33H54v5H35v2h7v5h2V40H54V54H44V49H42v5H26V40h5V38H26V24H47a1,1,0,0,0,1-1V18h6V29h2V17a1,1,0,0,0-1-1H25a1,1,0,0,0-1,1V55A1,1,0,0,0,25,56ZM38,22H36V18h2Zm2-4h2v4H40Zm-6,4H32V18h2Zm12,0H44V18h2ZM26,18h4v4H26Z" /></g></svg>
				</div>
				<Modal
					isOpen={this.state.openModal}
					onRequestClose={this.closeModal}
					style={ModalStyle}>
					<iframe className='pdf-upload' src={planFilePDFDataURL} />
				</Modal>
			</div>
		);
	}
}

export default PDFModal;