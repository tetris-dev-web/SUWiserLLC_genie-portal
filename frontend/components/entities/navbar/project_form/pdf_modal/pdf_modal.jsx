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
		const { planFilePDF } = this.props;
		return (
			<div>
				<div onClick={this.openModal}>Plan</div>
				<Modal
					isOpen={this.state.openModal}
					onRequestClose={this.closeModal}
					style={ModalStyle}>
					<iframe className='pdf-upload' src={planFilePDF} />
				</Modal>
			</div>
		);
	}
}

export default PDFModal;