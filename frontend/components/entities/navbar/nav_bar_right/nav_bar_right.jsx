import React, { useState } from "react";
// import UserDropdown from '../user_dropdown/user_dropdown';
import UserProfile from "./user_profile/user_profile";
import BuyFormModal from "./buy_form/buy_form_modal";
import ProjectFormModal from "./project_form/project_form_modal";

const NavBarRight = (props) => {
  const { pathname } = props;
  const [state, setState] = useState({
    transactionModalOpen: false,
    transactionModalTitle: "",
    transactionModalMessage: "",
  });

  const updateTransactionModal = (newModalState) => {
    setState(newModalState);
  };

  return (
    <div className="navbar-right">
      <UserProfile />
      {pathname.length > 1 ? (
        pathname === "/dashboard/demoInvestor" ? (
          <BuyFormModal />
        ) : (
          <ProjectFormModal />
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NavBarRight;
