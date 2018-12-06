import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './modal_style';
import ProjectMap from '../dashboard/project_dashboard/project_modules_map.jsx';

class DropPin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    
  }
}
