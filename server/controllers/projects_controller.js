const { fetchProjectModuleData } = require('../chain_api/projects_chain_api');
const { formatProject } = require('../formatters/project');

const projectModuleData = async (address) => {
  const project = await fetchProjectModuleData(address);
  return formatProject(project);
}

const projectGraphData = async (address) => {
  const project = await fetchProjectGraphData(address); 
}

module.exports = {
  projectModuleData
}
