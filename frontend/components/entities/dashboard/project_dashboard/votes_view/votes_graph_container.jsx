import React from 'react';
import { connect } from 'react-redux';
import { fetchCapitalHistory, receiveTokenPurchase } from '../../../../../actions/chain_actions/token_actions';
import { fetchSharedProjectGraphData } from '../../../../../actions/chain_actions/project_actions';
import VotesGraph from './votes_graph';


const getArrayOfObjectsMinMax = (arrayOfObjects, key) => {
  const arrayOfValues = arrayOfObjects.map(object => object[key]);
  return [Math.min(...arrayOfValues), Math.max(...arrayOfValues)];
};


const mapStateToProps = state => {
  let pitchedProjects;
  let deployedProjects;
  let pitchedProjectsValuationMinMax;
  let allProjectsValuationMinMax;
  let lineData;
  let capitalTotal;
  let capitalDeployed;
  let capitalBeingRaised;
  let startTime;
  let endTime;

    if (Object.keys(state.chain_data.projectGraph.projects).length && Object.keys(state.chain_data.projectGraph.capitalHistory).length) {
      capitalDeployed = 0;
      const projectPropsData = Object.keys(state.chain_data.projectGraph.projects).reduce((propsData, projectTitle) => {
        if (!propsData.deployedProjects) {
          propsData.deployedProjects = [];
          propsData.pitchedProjects = [];
          propsData.totalVotes = 0;
        }

        const project = state.chain_data.projectGraph.projects[projectTitle];

        const deploymentTime = project.activationTime;
        if (deploymentTime !== 0) {
          capitalDeployed += project.capitalRequired;
          project.capital = capitalDeployed;
          propsData.deployedProjects.push(project);
        } else {
          propsData.totalVotes += project.votes;
          propsData.pitchedProjects.push(project);
        }

        return propsData;
      }, {});

      deployedProjects = projectPropsData.deployedProjects;
      let totalVotes = projectPropsData.totalVotes;

      pitchedProjects = projectPropsData.pitchedProjects.map(project => {
        project.voteShare = project.votes / totalVotes;
        return project;
      }).sort((a, b) => b.voteShare - a.voteShare);

      const { capitalHistory } = state.chain_data.projectGraph;
      lineData = capitalHistory.history
      capitalTotal = capitalHistory.capitalTotal
      startTime = capitalHistory.startTime
      endTime = capitalHistory.endTime

      pitchedProjectsValuationMinMax = getArrayOfObjectsMinMax(pitchedProjects, "valuation")
      allProjectsValuationMinMax = getArrayOfObjectsMinMax(Object.values(state.chain_data.projectGraph.projects), "valuation")
      startTime = Math.min(startTime, deployedProjects[0].activationTime)
      endTime = Math.max(endTime, deployedProjects[deployedProjects.length - 1].activationTime)
      capitalBeingRaised = capitalTotal - capitalDeployed
    }

    return {
      crowdsaleInstance: state.network.crowdsaleInstance,
      projectContract: state.network.projectContract,
      projectFactoryInstance: state.network.projectFactoryInstance,
      web3: state.network.web3,
      projectsLoaded: Object.keys(state.chain_data.projectGraph.projects).length,
      pitchedProjects: pitchedProjects,
      deployedProjects: deployedProjects,
      pitchedProjectsValuationMinMax: pitchedProjectsValuationMinMax,
      allProjectsValuationMinMax: allProjectsValuationMinMax,
      lineData: lineData,
      capitalTotal: capitalTotal,
      capitalDeployed: capitalDeployed,
      capitalBeingRaised: capitalBeingRaised,
      startTime: startTime,
      endTime: endTime
    };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSharedProjectGraphData: () => dispatch(fetchSharedProjectGraphData()),
    fetchCapitalHistory: (crowdsaleInstance) => dispatch(fetchCapitalHistory(crowdsaleInstance)),
    receiveTokenPurchase: (tokenPurchase) => dispatch(receiveTokenPurchase(tokenPurchase))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VotesGraph);
