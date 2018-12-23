import * as APIUtil from '../../util/project_api_util';
import * as ChainUtil from '../../util/chain_util';
import { receiveProject, receiveProjectErrors, receiveProjects } from '../project_actions';


export const fetchChainProjects  = (crowdsale) => {
  return dispatch => {
    return APIUtil.fetchProjects().then(projects => {
      return ChainUtil.integrateProjectsData(crowdsale, projects);
    }).then((projectsData) => {
      return dispatch(receiveProjects(projectsData));
    });
  };
};


// export const createProject = (crowdsale, projectData, account) => {
//   return dispatch => {
//     return ChainUtil.pitchProject(crowdsale, projectData, account).then((projectData) => {
//       //the following should run on an event listener instead in case the user refreshes the page.
//       return APIUtil.createProject(projectData).then(project => {
//         return dispatch(receiveProject(project));
//       }, err => {
//         return dispatch(receiveProjectErrors(err.responseJSON));
//       });
//     });
//   };
// };

export const createProject = (crowdsale, projectData, account) => {
    return APIUtil.createProject(projectData).then(() => {
      return ChainUtil.pitchProject(crowdsale, projectData, account);
  });
};
