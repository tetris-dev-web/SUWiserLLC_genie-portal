import { connect } from 'react-redux';
import SessionForm from '.../../session/session_form';
import { closeLoginModal } from '../../../actions/modal_actions';

const Modal = ({ web3, open, closeLoginModal }) => {
  if (!web3 && open) {
    return null;
  }

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        <div className='modal-header-container'>
          <div className='closeModal-button' onClick={closeLoginModal}><p>x</p></div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

const mapStateToProps = state => {

  return {
    open: state.ui.loginModal,
    web3: state.network.web3
  };
};

const mapDispatchToProps = state => {
  return {
    closeLoginModal: () => dispatch(closeLoginModal())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Modal);
