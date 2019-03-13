export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';

export const openModal = modal => {
  return {
    type: OPEN_MODAL,
    modal
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const openLoginModal = modal => {
  return {
    type: OPEN_LOGIN_MODAL,
  };
};

export const closeLoginModal = () => {
  return {
    type: CLOSE_LOGIN_MODAL
  };
};
