import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

const Modal = ({ modal, closeModal }) => {
  if (!modal.length) return null;

  

  return (
    <div
      className="modal-background"
      onClick={closeModal}>
      <div className={`${formType}-modal-child`} onClick={e => e.stopPropagation()}>
        {component}
      <button className='modal-close' onClick={() => closeModal()}>&times;</button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);