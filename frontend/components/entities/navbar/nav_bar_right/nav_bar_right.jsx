import React from 'react';
// import UserDropdown from '../user_dropdown/user_dropdown';
import UserProfile from './user_profile/user_profile';
import BuyFormModal from './buy_form/buy_form_modal';
import ProjectFormModal from './project_form/project_form_modal';

class NavBarRight extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      transactionModalOpen: false,
      transactionModalTitle: '',
      transactionModalMessage: ''
    }
    this.updateTransactionModal = this.updateTransactionModal.bind(this);
  }

  updateTransactionModal (newModalState) {
    this.setState(newModalState);
  }

  render () {
    const { pathname } = this.props;

    return (
      <div className="navbar-right">
        <UserProfile />
        {
          pathname.length  > 1 ?
          pathname === '/dashboard/demoInvestor' ? <BuyFormModal/> :
          <ProjectFormModal />
          :
          <div></div>
        }
      </div>
    );
  }
}

export default NavBarRight;
