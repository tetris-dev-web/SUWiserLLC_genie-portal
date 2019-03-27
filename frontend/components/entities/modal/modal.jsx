import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import StrategyModal from '../developerInfo/strategy_modal/strategy_modal';
import BylawModal from '../developerInfo/bylaws_modal/bylaws_modal';
import ProjectModules from '../dashboard/project_dashboard/project_modules/project_modules';
import './modal.scss';

const mapStateToProps = state => {
  return {
    modals: state.ui.modals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

const Modal = ({ modals, closeModal }) => {
  if (!modals.length) return null;

  const modalArray = modals.map((modal, idx) => {
    let component;

    switch (modal.type) {
      case 'bylaw':
        component = <BylawModal />;
        break;
      case 'strategy':
        component = <StrategyModal />;
        break;
      case 'project_module':
        component = <ProjectModules projectId={modal.project.id}/>;
        break;
      default:
        return null;
    }

    return (
      <div key={idx}
        className="modal-background"
        onClick={closeModal}>
        <div className={`modal-child ${modal.type}-modal`} onClick={e => e.stopPropagation()}>
          {component}
          <div className='close-modal-button' onClick={() => closeModal()}>&times;</div>
        </div>
      </div>
    );
  });

  return modalArray;
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
