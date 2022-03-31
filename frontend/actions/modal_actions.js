export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
// export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
// import * as ExpressAPI  from '../util/fetch_util/express_api_util';

// export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
// export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';

export const openModal = (projectId) => {
  return {
    type: OPEN_MODAL,
    projectId,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

// export const receiveProjectPerformanceData = project => {
//   return {
//     type: RECEIVE_PROJECT,
//     project
//   };
// };
//
// export const  fetchProjectPerformanceData  = address => {
//   return dispatch => {
//     return ExpressAPI.fetchApiData(`project_modal_data/${address}`).then(projectModuleData => {
//       return dispatch(receiveProjectPerformanceData(projectModuleData));
//     })
//   }
// }

//
// export const openLoginModal = modal => {
//   return {
//     type: OPEN_LOGIN_MODAL,
//   };
// };
//
// export const closeLoginModal = () => {
//   return {
//     type: CLOSE_LOGIN_MODAL
//   };
// };
